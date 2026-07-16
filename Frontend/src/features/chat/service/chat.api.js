import axios from "axios"


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});


export const sendMessage = async({ message, chatId, pdfFile }) => {
    // If PDF is attached, use FormData (multipart)
    if (pdfFile) {
        const formData = new FormData()
        formData.append('message', message)
        if (chatId) formData.append('chatId', chatId)
        formData.append('pdf', pdfFile)
        
        const response = await api.post("/api/chats/message", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    }

    // Normal JSON request (no PDF)
    const response = await api.post("/api/chats/message", { message, chatId })
    return response.data
}

export const getChats = async () => {
    const response = await api.get("/api/chats")
    return response.data
}

export const getMessage = async (chatId) => {
    const response = await api.get(`/api/chats/${chatId}/messages`)
    return response.data
}

export const deleteChat = async (chatId) => {
    const response = await api.delete(`/api/chats/delete/${chatId}`)
    return response.data
}
