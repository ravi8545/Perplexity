import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: [],
        currentChatId: null,
        messages: [],
        isLoading: false,
        isSending: false,
        isPdfUploading: false,
        error: null
    },
    reducers: {

        setChats: (state, action) => {
            state.chats = action.payload;
        },

        addChat: (state, action) => {
            state.chats.unshift(action.payload);
        },

        deleteChat: (state, action) => {
            const chatId = action.payload;
            state.chats = state.chats.filter(chat => chat._id !== chatId);
            if (state.currentChatId === chatId) {
                state.currentChatId = null;
                state.messages = [];
            }
        },

        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
        },

        setMessages: (state, action) => {
            state.messages = action.payload;
        },

        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },

        clearMessages: (state) => {
            state.messages = [];
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setSending: (state, action) => {
            state.isSending = action.payload;
        },

        setPdfUploading: (state, action) => {
            state.isPdfUploading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setChats,
    addChat,
    deleteChat,
    setCurrentChatId,
    setMessages,
    addMessage,
    clearMessages,
    setLoading,
    setSending,
    setPdfUploading,
    setError
} = chatSlice.actions;

export default chatSlice.reducer;
