import Comment from '../models/comments.js'



export const getAllComments = async (req, res) => {
    try {
        const result = await Comment.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getComment = async (req, res) => {
    const _id = req.params.id
    try {
        const result = await Comment.findOne({_id})
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    } 
}
 
export const createComment = async (req, res) => {  
    const body = req.body
    const post = req.body.post
    const author = req.body.author
    const result = await Comment.create(body)
    try {
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    } 
}


export const deleteComment = async (req, res) => {
    try {
        const _id = req.params.id
        const result = await Comment.findByIdAndDelete(_id)
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const editComment = async (req, res) => {
    const comment = req.body
    try {
        const result = await Comment.findByIdAndUpdate({_id: comment.id}, comment)
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
