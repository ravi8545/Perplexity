import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        default: 'New Chat',
        trim: true
    },
    hasPdf: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

const ChatModel = mongoose.model('ChatModel', chatSchema);

export default ChatModel;
