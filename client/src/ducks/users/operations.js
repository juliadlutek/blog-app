import {addUserAction, deleteUserAction} from './actions'
import axios from "axios";
import {deletePostUserAction} from '../posts/actions'
import {deleteCommentUserAction, deleteCommentPostAction} from '../comments/actions'


const url = 'http://localhost:5000/users';

export const getUsersAPI = async () => await axios.get(url);
export const deleteUserAPI = async (user) => await axios.delete(`${url}/${user.id}`);

 
export const getAllUsers = () =>
    async (dispatch) => {
        const { data } = await getUsersAPI()
        await data.map(user => dispatch(addUserAction(user)))
    } 

export const deleteUser = (user) =>
async (dispatch) => {
    const { data } = await deleteUserAPI(user)
    await  dispatch(deleteUserAction(user))
    await dispatch(deletePostUserAction(user))
    await dispatch(deleteCommentUserAction(user))
    user.posts.map(async post => {
        await dispatch(deleteCommentPostAction({id: post}))
    })
} 
 
