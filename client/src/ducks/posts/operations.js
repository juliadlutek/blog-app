import {addPostAction, deletePostAction, editPostAction} from './actions'
import {addLikeAction, deleteLikeAction} from '../likes/actions'
import {deleteCommentPostAction} from '../comments/actions';
import axios from "axios";


const url = 'http://localhost:5000/posts';
const likeUrl = 'http://localhost:5000/likes'

export const getPostsAPI = async () => await axios.get(url);
export const postPostAPI = async (post) => await axios.post(url, post);
export const deletePostAPI = async (post) => await axios.delete(`${url}/${post.id}`);
export const editPostAPI = async (post) => await axios.put(url, post);
export const postLikeAPI = async (post) => await axios.post(likeUrl, post);
export const deleteLikeAPI = async (post) => await axios.delete(`${likeUrl}/${post.id}`);

 
export const getAllPosts = () =>
    async (dispatch) => {
        const { data } = await getPostsAPI()
        await data.map(post => dispatch(addPostAction(post)))
    } 
 
export const addPost = (post) =>
    async (dispatch) => {
        const { data } = await postPostAPI(post)
        await dispatch(addPostAction(data))
        const like = await postLikeAPI({post: data._id})
        await dispatch(addLikeAction(like.data))
} 

export const deletePost = (post) =>
    async (dispatch) => {
        await deletePostAPI(post)
        await deleteLikeAPI(post)
        await dispatch(deletePostAction(post))
        await dispatch(deleteCommentPostAction(post))
        await dispatch(deleteLikeAction(post))
} 


export const editPost = (post) =>
    async (dispatch) => {
        await editPostAPI(post)
        await dispatch(editPostAction(post))
} 

