import { 
    USER_ADD,
    USER_DELETE
} from "./types";


export const addUserAction = (payload) => ({
    type: USER_ADD,
    payload
})

export const deleteUserAction = (payload) => ({
    type: USER_DELETE,
    payload
})

