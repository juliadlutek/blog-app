import { 
    POST_ADD,
    POST_EDIT,
    POST_DELETE,
    POST_DELETE_USER,
    POST_DELETE_ALL
} from "./types";


export const addPostAction = (payload) => ({
    type: POST_ADD,
    payload
})

export const deletePostAction = (payload) => ({
    type: POST_DELETE,
    payload
})

export const editPostAction = (payload) => ({
    type: POST_EDIT,
    payload
})


export const deletePostUserAction = (payload) => ({
    type: POST_DELETE_USER,
    payload
})

export const deleteAllPostsAction = (payload) => ({
    type: POST_DELETE_ALL,
    payload
})