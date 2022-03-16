import { 
    LIKE_ADD,
    LIKE_DELETE,
    LIKE_DELETE_ALL,
    LIKE,
    DISLIKE
} from "./types";


export const addLikeAction = (payload) => ({
    type: LIKE_ADD,
    payload
})

export const deleteLikeAction = (payload) => ({
    type: LIKE_DELETE,
    payload
})

export const likePostAction = (payload) => ({
    type: LIKE,
    payload
})

export const dislikePostAction = (payload) => ({
    type: DISLIKE,
    payload
})

export const deleteAllLikesAction = (payload) => ({
    type: LIKE_DELETE_ALL,
    payload
})