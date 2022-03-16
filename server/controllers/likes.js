import Like from '../models/likes.js'


export const getAllLikes = async (req, res) => {
    try {
        const result = await Like.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
 
export const createLike = async (req, res) => {  
    try {
        const post = req.body.post
        const result = await Like.create({post, users: []})
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    } 
}


export const deleteLike = async (req, res) => {
    try {
        const post = req.params.id
        const result = await Like.deleteOne({post})
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const like = async (req, res) => {
    const {post, user} = req.body
    try {
        const result = await Like.updateOne({post}, { $push: { users: user } })
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const dislike = async (req, res) => {
    const {post, user} = req.body
    try {
        const result = await Like.updateOne({post}, { $pull: { users: user } })
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}