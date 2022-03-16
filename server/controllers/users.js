import bcrypt from 'bcryptjs';
import User from '../models/users.js'
import Post from '../models/posts.js'
import Comment from '../models/comments.js'

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) res.status(404).json({ message: "User doesn't exist"})
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) res.status(404).json({ message: "Password is incorrect"})

        res.status(200).json({result: existingUser})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const register = async (req, res) => {
    try {
        const {username, email, password, confirmPassword} = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) res.status(404).json({ message: "User with this email already exist"})
        if (password !== confirmPassword) res.status(400).json({ message: "Passwords don't match" })
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({username, email, password: hashedPassword})
    
        res.status(200).json({result})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }



}

export const getAllUsers = async (req, res) => {
    try {
        const result = await User.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUser = async (req, res) => {
    const _id = req.params.id
    try {
        const result = await User.findOne({_id})
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }  
}

export const editUser = async (req, res) => {
    try {
        const {_id, newPassword, password, confirmPassword} = req.body;
        if (newPassword !== confirmPassword) res.status(400).json({ message: "Passwords don't match" })
        const newPasswordHashed = await bcrypt.hash(newPassword, 12)
        const result = await User.findOneAndUpdate({_id}, {password: newPasswordHashed})
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export const deleteUser = async (req, res) => {
    try {
        const _id = req.params.id
        const result = await User.findByIdAndDelete(_id)
        const user = User.find({_id})
        await Post.deleteMany({author: _id})
        await Comment.deleteMany({author: _id})
        await Comment.deleteMany({post: {$in: user.posts}})
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}



