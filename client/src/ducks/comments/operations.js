import {addCommentAction, deleteCommentAction, editCommentAction} from './actions'
import axios from "axios";

const url = 'http://localhost:5000/comments';

export const getCommentsAPI = async () => await axios.get(url);
export const postCommentAPI = async (comment) => await axios.post(url, comment);
export const deleteCommentAPI = async (comment) => await axios.delete(`${url}/${comment.id}`);
export const editCommentAPI = async (comment) => await axios.put(url, comment);

 
export const getAllComments = () =>
    async (dispatch) => {
        const { data } = await getCommentsAPI()
        await data.map(comment => dispatch(addCommentAction(comment)))
    } 

export const addComment = (comment) =>
async (dispatch) => {
    const { data } = await postCommentAPI(comment)
    await dispatch(addCommentAction(data))
} 

export const deleteComment = (comment) =>
    async (dispatch) => {
        await deleteCommentAPI(comment)
        await dispatch(deleteCommentAction(comment))
} 

export const editComment = (comment) =>
    async (dispatch) => {
        await editCommentAPI(comment)
        await dispatch(editCommentAction(comment))
} 

 
