import { 
    COMMENT_ADD,
    COMMENT_DELETE,
    COMMENT_EDIT,
    COMMENT_DELETE_POST,
    COMMENT_DELETE_USER,
    COMMENT_DELETE_ALL
} from "./types";


export const addCommentAction = (payload) => ({
    type: COMMENT_ADD,
    payload
})

export const deleteCommentAction = (payload) => ({
    type: COMMENT_DELETE,
    payload
})

export const editCommentAction = (payload) => ({
    type: COMMENT_EDIT,
    payload
})

export const deleteCommentPostAction = (payload) => ({
    type: COMMENT_DELETE_POST,
    payload
})


export const deleteCommentUserAction = (payload) => ({
    type: COMMENT_DELETE_USER,
    payload
})

export const deleteAllCommentsAction = (payload) => ({
    type: COMMENT_DELETE_ALL,
    payload
})
