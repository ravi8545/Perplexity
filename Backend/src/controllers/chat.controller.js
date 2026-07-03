import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import ChatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";


export async function sendMessage(req, res) {
    const { message } = req.body;
    const chatId = req.body.chatId || req.body.chat;

    let title = null, chat = null;

    if (!chatId) {
        title = await generateChatTitle(message);
        chat = await ChatModel.create({
            user: req.user.id,
            title
        })
    }

    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        role: 'user',
        content: message
    })

    const messages = await messageModel.find({
        chat: chatId || chat._id
    }).sort({ createdAt: 1 });

    const result = await generateResponse(messages);

    const aiMessage = await messageModel.create({
        chat:chatId || chat._id,
        role:'ai',
        content:result

    })

    res.status(201).json({
        aiMessage,
        title,
        chat

    });

    console.log(messages)




}