import { 
    LIKE_ADD,
    LIKE_DELETE,
    LIKE_DELETE_ALL,
    LIKE,
    DISLIKE
} from "./types";

const initialState = []

export const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE_ADD:
            return [...state,
                 {
                    id: action.payload._id,
                    post: action.payload.post,
                    users: action.payload.users
                }
        ]
        case LIKE_DELETE: 
            return state.filter(el => el.post !== action.payload.id)
        case LIKE:
            return state.map((el) => {
                if (el.post === action.payload.post) return {...el, users: [...el.users, action.payload.user]}
                else return el
            })
        case DISLIKE: 
            return state.map((el) => {
                if (el.post === action.payload.post) return {...el, users: el.users.filter(user => user !== action.payload.user)}
                else return el
            })
        case LIKE_DELETE_ALL: 
            return []
        default:
            return state
    }
} 