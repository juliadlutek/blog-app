import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    content: { 
        type: String, 
        required: true, 
    },
    image: { 
        type: String, 
        required: true
    },
    date: { type: String },
    author: {
        type: mongoose.ObjectId, 
        ref: "User",
    }
})


export default mongoose.model("Post", postSchema);