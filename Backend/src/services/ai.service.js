import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage, AIMessage} from "@langchain/core/messages";
import {ChatMistralAI} from "@langchain/mistralai";


const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
    model:"mistral-small-latest",
    apiKey:process.env.MISTRAL_API_KEY
})



export async function generateResponse(messages){
   const formattedMessages = [
       new SystemMessage("You are a helpful AI assistant. You have access to the conversation history provided in this sequence. Use it to answer questions about past messages, context, or follow-ups."),
       ...messages.map(msg=>{
           if(msg.role=="user"){
               return new HumanMessage(msg.content)
           }else if(msg.role=="ai"){
               return new AIMessage(msg.content)
           }
       })
   ];
   const response = await geminiModel.invoke(formattedMessages);
   return response.text;
}

export async function generateChatTitle(message) {
    const response = await mistralModel.invoke([
        new SystemMessage(`
You are an AI assistant that generates short, descriptive titles for chat conversations.
The user will provide the first message of a conversation. Generate a clear and relevant title that summarizes the main topic in **2–4 words**.
Guidelines:
- Keep the title concise and engaging.
- Capture the core intent or subject of the conversation.
- Use title case when appropriate.
- Do not include quotation marks or punctuation unless necessary.
- Avoid generic titles such as "Chat", "Conversation", "New Chat", or empty titles.
- Return only the title and nothing else.
        `),
        new HumanMessage(
            `Generate a title for a chat conversation based on the following first message ${message}`
        )
    ]);

    return response.text;
}