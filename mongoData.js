import mongoose from 'mongoose';

const iMessageSchema = mongoose.Schema({
    chatname: String,
    conversation: {
        message: String,
        timestamp: String,
        user: String,
        userImage: String,
    }
})

export default mongoose.model('chats', iMessageSchema)