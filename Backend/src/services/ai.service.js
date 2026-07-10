import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { createAgent } from "langchain";
import * as z from "zod";

import { searchInternet } from "./internet.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "SearchInternet",
  description: `
Search the internet using Tavily.

Use this tool whenever the user asks about:
- latest news
- current events
- today's information
- real-time information
- recent updates
- weather
- sports
- stock market
- internet search
The query field is REQUIRED.
`,
  schema: z.object({
    query: z.string().describe("The search query."),
    topic: z.enum(["general", "news"]).optional(),
    timeRange: z
      .enum(["day", "week", "month", "year"])
      .optional(),
  }),
});
const agent = createAgent({
  model: geminiModel,
  tools: [searchInternetTool],
});

export async function generateResponse(messages) {
  const formattedMessages = [
    new SystemMessage(`
You are a helpful AI assistant.

You have access to the SearchInternet tool.

Whenever the user asks about:
- latest news
- current events
- today's date
- today's time
- weather
- sports
- stock prices
- internet search
- recent information

ALWAYS use the SearchInternet tool first.

Never answer these questions from memory.

Use previous conversation whenever necessary.
`),

    ...messages
      .map((msg) => {
        if (!msg || !msg.role || !msg.content) {
          return null;
        }

        switch (msg.role) {
          case "user":
            return new HumanMessage(msg.content);

          case "ai":
          case "assistant":
          case "model":
            return new AIMessage(msg.content);

          case "system":
            return new SystemMessage(msg.content);

          default:
            return null;
        }
      })
      .filter(Boolean),
  ];

  console.log("Formatted Messages:");
  console.log(formattedMessages);

  const response = await agent.invoke({
    messages: formattedMessages,
  });

  console.log("Agent Response:");
  console.log(response);

  if (response.messages && response.messages.length > 0) {
    const lastMessage = response.messages[response.messages.length - 1];

    return (
      lastMessage.text ||
      lastMessage.content ||
      "Sorry, I couldn't generate a response."
    );
  }

  return "Sorry, I couldn't generate a response.";
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`
You are an AI assistant that generates short, descriptive titles.

Rules:
- 2-4 words
- Title case
- No quotes
- No punctuation
- Return only the title.
    `),

    new HumanMessage(
      `Generate a title for this conversation:\n\n${message}`
    ),
  ]);

  return response.text || response.content;
}