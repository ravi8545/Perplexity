import { useDispatch, useSelector } from "react-redux";
import { initializeSocketConnection } from "../service/chat.socket";
import { getChats, sendMessage, getMessage, deleteChat as deleteChatApi } from "../service/chat.api";
import {
    setChats,
    addChat,
    deleteChat as deleteChatAction,
    setCurrentChatId,
    setMessages,
    addMessage,
    clearMessages,
    setLoading,
    setSending,
    setError
} from "../chat.slice";


export function useChat() {
    const dispatch = useDispatch();
    const { chats, currentChatId, messages, isLoading, isSending } = useSelector((state) => state.chat);

    async function handleLoadChats() {
        try {
            dispatch(setLoading(true));
            const data = await getChats();
            dispatch(setChats(data.chats || []));
        } catch (error) {
            console.error("Failed to load chats:", error);
            dispatch(setError(error.response?.data?.message || "Failed to load chats"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleSendMessage({ message, chatId }) {
        try {
            dispatch(setSending(true));
            dispatch(setError(null));

            // Optimistically add user message to UI
            dispatch(addMessage({ content: message, role: "user", _id: "temp_" + Date.now() }));

            const data = await sendMessage({ message, chatId });
            const { chat, aiMessage, title } = data;

            if (!chatId && chat) {
                // New chat was created by backend
                dispatch(addChat(chat));
                dispatch(setCurrentChatId(chat._id));
            }

            // Add AI response to messages
            dispatch(addMessage(aiMessage));

            return { success: true, chat, aiMessage };
        } catch (error) {
            console.error("Failed to send message:", error);
            dispatch(setError(error.response?.data?.message || "Failed to send message"));
            return { success: false };
        } finally {
            dispatch(setSending(false));
        }
    }

    async function handleSelectChat(chatId) {
        try {
            dispatch(setCurrentChatId(chatId));
            dispatch(setLoading(true));
            dispatch(clearMessages());

            const data = await getMessage(chatId);
            dispatch(setMessages(data.messages || []));
        } catch (error) {
            console.error("Failed to load messages:", error);
            dispatch(setError(error.response?.data?.message || "Failed to load messages"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    function handleNewChat() {
        dispatch(setCurrentChatId(null));
        dispatch(clearMessages());
    }

    async function handleDeleteChat(chatId) {
        try {
            await deleteChatApi(chatId);
            dispatch(deleteChatAction(chatId));
        } catch (error) {
            console.error("Failed to delete chat:", error);
            dispatch(setError(error.response?.data?.message || "Failed to delete chat"));
        }
    }

    function handleDownloadChat(chatId) {
        const chat = chats.find(c => c._id === chatId);
        const chatTitle = chat?.title || "chat";

        let textContent = `Chat: ${chatTitle}\n`;
        textContent += `${"=".repeat(50)}\n\n`;

        messages.forEach((msg) => {
            const role = msg.role === "user" ? "You" : "AI";
            textContent += `${role}:\n${msg.content}\n\n`;
        });

        const blob = new Blob([textContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${chatTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    return {
        // State
        chats,
        currentChatId,
        messages,
        isLoading,
        isSending,
        // Actions
        initializeSocketConnection,
        handleLoadChats,
        handleSendMessage,
        handleSelectChat,
        handleNewChat,
        handleDeleteChat,
        handleDownloadChat,
    };
}
