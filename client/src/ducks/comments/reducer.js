import { 
    COMMENT_ADD,
    COMMENT_DELETE,
    COMMENT_EDIT,
    COMMENT_DELETE_POST,
    COMMENT_DELETE_USER,
    COMMENT_DELETE_ALL
} from "./types";

const initialState = []

export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMMENT_ADD:
            return [...state,
                 {
                    id: action.payload._id,
                    content: action.payload.content,
                    post: action.payload.post,
                    author: action.payload.author
                }
        ]
        case COMMENT_DELETE: 
            return state.filter(el => el.id !== action.payload.id)
        case COMMENT_EDIT:
            return state.map((el) => {
                if (el.id === action.payload.id) return {...action.payload}
                else return el
            })
        case COMMENT_DELETE_POST: 
            return state.filter(el => el.post !== action.payload.id)
        case COMMENT_DELETE_USER: 
            return state.filter(el => el.user !== action.payload.id)
        case COMMENT_DELETE_ALL: 
            return []
        default:
            return state
    }
} 