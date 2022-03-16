import Post from '../models/posts.js'
import User from '../models/users.js'
import Comment from '../models/comments.js'


export const getAllPosts = async (req, res) => {
    try {
        const result = await Post.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getPost = async (req, res) => {
    const _id = req.params.id
    try {
        const result = await Post.findOne({ _id })
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    } 
}
 
export const createPost = async (req, res) => {  
    try {
        const body = req.body
        const username = req.body.author
        const user = await User.findOne({username})
        const author = user._id
        const result = await Post.create({...body, author})
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    } 
}


export const deletePost = async (req, res) => {
    try {
        const _id = req.params.id
        const result = await Post.findByIdAndDelete(_id)
        await Comment.deleteMany({ post: _id})
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const editPost = async (req, res) => {
    const post = req.body
    try {
        const result = await Post.findByIdAndUpdate({_id: post.id}, post)
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getPostByPattern = async (req, res) => {
    const pattern = req.body.pattern
    try {
        const result = await Post.find({title: { $regex: pattern}})
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    } 
}

