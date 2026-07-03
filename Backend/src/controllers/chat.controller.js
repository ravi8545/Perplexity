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
        chat: chatId || chat._id,
        role: 'ai',
        content: result

    })

    res.status(201).json({
        aiMessage,
        title,
        chat

    });

    console.log(messages)




}

export async function getChats(req, res) {
    const user = req.user

    const chats = await ChatModel.find({ user: user.id });

    res.status(200).json({
        message: "Chats retrived successfully",
        chats
    })

}

export async function getMessages(req, res) {
    const { chatId } = req.params;

    const chat = await ChatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    })

    res.status(200).json({
        message: "Messages retrived successfully",
        messages
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