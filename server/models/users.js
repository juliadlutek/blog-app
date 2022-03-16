import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { 
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w)*(\.\w{2,3})+$/
    },
    password: { 
        type: String, 
        required: true 
    }
})


export default mongoose.model("User", userSchema);