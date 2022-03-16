import mongoose from 'mongoose';

const likeSchema = mongoose.Schema({
    post: {
        type: mongoose.ObjectId, 
        ref: "Post",
    },
    users: [{
        type: mongoose.ObjectId, 
        ref: "User",
    }]
})


export default mongoose.model("Like", likeSchema);