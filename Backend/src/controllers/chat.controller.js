import {
  generateResponse,
  generateChatTitle,
} from "../services/ai.service.js";
import {
  uploadPdfToImageKit,
  processPdfAndStore,
  searchPdfContext,
} from "../services/pdf.service.js";
import ChatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    const chatId = req.body.chatId || req.body.chat;
    const pdfFile = req.file; // multer puts the file here

    let title = null,
      chat = null;
    let pdfUrl = null,
      pdfName = null;

    // Determine the active chatId (existing or new)
    if (!chatId) {
      title = await generateChatTitle(message);
      chat = await ChatModel.create({
        user: req.user.id,
        title,
      });
    }

    const activeChatId = chatId || chat._id.toString();

    // ── Handle PDF Upload & Embedding ──
    if (pdfFile) {
      console.log(`Processing PDF: ${pdfFile.originalname} (${pdfFile.size} bytes)`);

      // 1. Upload to ImageKit
      const uploadResult = await uploadPdfToImageKit(
        pdfFile.buffer,
        pdfFile.originalname
      );
      pdfUrl = uploadResult.url;
      pdfName = pdfFile.originalname;

      // 2. Parse, chunk, embed & store in Pinecone
      await processPdfAndStore(pdfFile.buffer, activeChatId);

      // 3. Mark chat as having PDF
      await ChatModel.findByIdAndUpdate(activeChatId, { hasPdf: true });

      console.log(`PDF uploaded to ImageKit: ${pdfUrl}`);
      console.log(`Embeddings stored in Pinecone namespace: ${activeChatId}`);
    }

    // ── Save user message ──
    const userMessage = await messageModel.create({
      chat: activeChatId,
      role: "user",
      content: message,
      pdfUrl: pdfUrl,
      pdfName: pdfName,
    });

    // ── Fetch conversation history ──
    const messages = await messageModel
      .find({ chat: activeChatId })
      .sort({ createdAt: 1 });

    // ── Check if chat has PDF → search for relevant context ──
    let pdfContext = "";
    const currentChat =
      chat || (await ChatModel.findById(activeChatId));
    if (currentChat && currentChat.hasPdf) {
      pdfContext = await searchPdfContext(message, activeChatId);
      if (pdfContext) {
        console.log(`Found PDF context for query (${pdfContext.length} chars)`);
      }
    }

    // ── Generate AI response ──
    const result = await generateResponse(messages, pdfContext);

    const aiMessage = await messageModel.create({
      chat: activeChatId,
      role: "ai",
      content: result,
    });

    res.status(201).json({
      aiMessage,
      title,
      chat,
    });
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({
      message: error.message || "Failed to send message",
    });
  }
}

export async function getChats(req, res) {
  const user = req.user;

  const chats = await ChatModel.find({ user: user.id });

  res.status(200).json({
    message: "Chats retrived successfully",
    chats,
  });
}

export async function getMessages(req, res) {
  const { chatId } = req.params;

  const chat = await ChatModel.findOne({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  const messages = await messageModel.find({
    chat: chatId,
  });

  res.status(200).json({
    message: "Messages retrived successfully",
    messages,
  });
}

export async function deleteChat(req, res) {
  try {
    const { chatId } = req.params;

    const chat = await ChatModel.findOne({
      _id: chatId,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    await messageModel.deleteMany({
      chat: chatId,
    });

    await ChatModel.findByIdAndDelete(chatId);

    return res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
