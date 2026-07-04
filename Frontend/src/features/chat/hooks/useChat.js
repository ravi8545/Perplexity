import { initializeSocketConnection } from "../service/chat.socket";
import { getChats, sendMessage, getMessage, deleteChat } from "../service/chat.api";
import { useDispatch } from "react-redux";
import { setChats, setCurrentChatId, setLoading, setError, createNewChat, addNewMessage } from "../chat.slice";



export function useChat() {
    const dispatch = useDispatch();

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true));
        const data = await sendMessage({ message, chatId })
        const { chat, aiMessage } = data

        dispatch(setChats((prev) => {
            return {
                ...prev,
                [chat.id]: {
                    ...chat,
                    message: [{ content: message, role: "user" }, aiMessage]
                }
            }
        }))
        dispatch(setCurrentChatId(chat._id))
    }





    return {
        initializeSocketConnection,
        handleSendMessage
    };
}
