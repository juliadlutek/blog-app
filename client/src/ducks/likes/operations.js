import {addLikeAction, likePostAction, dislikePostAction} from './actions'
import axios from "axios";

const url = 'http://localhost:5000/likes';

export const getLikesAPI = async () => await axios.get(url);
export const likePostAPI = async (like) => await axios.put(`${url}/like`, like);
export const dislikePostAPI = async (like) => await axios.put(`${url}/dislike`, like);



export const getAllLikes = () =>
    async (dispatch) => {
        const { data } = await getLikesAPI()
        await data.map(comment => dispatch(addLikeAction(comment)))
    } 

export const likePost = (like) =>
async (dispatch) => {
    await likePostAPI(like)
    await dispatch(likePostAction(like))
} 

export const dislikePost = (like) =>
async (dispatch) => {
    await dislikePostAPI(like)
    await dispatch(dislikePostAction(like))
} 