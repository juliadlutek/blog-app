import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    content: { 
        type: String, 
        required: true, 
    },
    post: {
        type: mongoose.ObjectId, 
        ref: "Post",
    },
    author: {
        type: mongoose.ObjectId, 
        ref: "User",
    }
})


export default mongoose.model("Comment", commentSchema);