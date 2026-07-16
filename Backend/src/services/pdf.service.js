import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { PDFParse } = require("pdf-parse");
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import pdfIndex from "../config/pinecone.js";
import imagekit from "../config/imagekit.js";

// Mistral embedding model
const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey: process.env.MISTRAL_API_KEY,
});

/**
 * Upload PDF buffer to ImageKit
 * @param {Buffer} fileBuffer - PDF file buffer
 * @param {string} fileName - Original filename
 * @returns {Promise<{url: string, fileId: string}>}
 */
export async function uploadPdfToImageKit(fileBuffer, fileName) {
  try {
    const result = await imagekit.upload({
      file: fileBuffer,
      fileName: fileName,
      folder: "/pdfs/",
    });

    return {
      url: result.url,
      fileId: result.fileId,
    };
  } catch (error) {
    console.error("ImageKit upload error:", error.message);
    throw new Error(`ImageKit upload failed: ${error.message}`);
  }
}

/**
 * Download PDF from URL, parse text, chunk it, embed, and store in Pinecone
 * @param {Buffer} pdfBuffer - PDF file buffer
 * @param {string} chatId - Chat ID to use as Pinecone namespace
 * @returns {Promise<{chunkCount: number}>}
 */
export async function processPdfAndStore(pdfBuffer, chatId) {
  // 1. Parse PDF text
  console.log("Step 1: Parsing PDF...");
  let text;
  try {
    const parser = new PDFParse({ data: pdfBuffer });
    const data = await parser.getText();
    text = data.text;
  } catch (err) {
    console.error("PDF parse error:", err.message);
    throw new Error(`Failed to parse PDF: ${err.message}`);
  }

  if (!text || text.trim().length === 0) {
    throw new Error("PDF has no readable text content");
  }
  console.log(`PDF parsed: ${text.length} characters`);

  // 2. Split text into chunks
  console.log("Step 2: Splitting into chunks...");
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 50,
  });
  const chunks = await splitter.splitText(text);
  console.log(`Created ${chunks.length} chunks`);

  // 3. Create embeddings for each chunk
  console.log("Step 3: Creating embeddings...");
  let vectors;
  try {
    vectors = await Promise.all(
      chunks.map(async (chunk, i) => {
        const vector = await embeddings.embedQuery(chunk);
        return {
          id: `${chatId}-chunk-${i}`,
          values: vector,
          metadata: {
            text: chunk,
            chatId: chatId,
            chunkIndex: i,
          },
        };
      })
    );
  } catch (err) {
    console.error("Embedding error:", err.message);
    throw new Error(`Failed to create embeddings: ${err.message}`);
  }
  console.log(`Created ${vectors.length} vectors`);

  // 4. Upsert to Pinecone (batch in groups of 100)
  console.log("Step 4: Upserting to Pinecone...");
  try {
    const namespace = pdfIndex.namespace(chatId);
    const batchSize = 100;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await namespace.upsert({
        records: batch.map((v) => ({
          id: v.id,
          values: v.values,
          metadata: v.metadata,
        })),
      });
    }
  } catch (err) {
    console.error("Pinecone upsert error:", err.message);
    throw new Error(`Failed to store in Pinecone: ${err.message}`);
  }

  console.log(
    `PDF processed: ${chunks.length} chunks stored in Pinecone namespace "${chatId}"`
  );

  return { chunkCount: chunks.length };
}

/**
 * Search Pinecone for relevant PDF chunks given a query
 * @param {string} query - User's question
 * @param {string} chatId - Chat ID (Pinecone namespace)
 * @returns {Promise<string>} - Concatenated relevant text chunks
 */
export async function searchPdfContext(query, chatId) {
  // 1. Embed the query
  const queryVector = await embeddings.embedQuery(query);

  // 2. Search Pinecone
  const namespace = pdfIndex.namespace(chatId);
  const results = await namespace.query({
    topK: 3,
    vector: queryVector,
    includeMetadata: true,
  });

  // 3. Extract and join matching texts
  if (!results.matches || results.matches.length === 0) {
    return "";
  }

  const contextChunks = results.matches
    .filter((match) => match.score > 0.3) // Only include reasonably relevant matches
    .map((match) => match.metadata.text);

  return contextChunks.join("\n\n---\n\n");
}
