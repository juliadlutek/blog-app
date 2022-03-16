import { 
    POST_ADD,
    POST_DELETE,
    POST_EDIT,
    POST_DELETE_USER,
    POST_DELETE_ALL
} from "./types";

const initialState = []

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ADD:
            return [...state,
                 {
                    id: action.payload._id,
                    title: action.payload.title,
                    content: action.payload.content,
                    image: action.payload.image,
                    date: action.payload.date,
                    author: action.payload.author
            }
        ]
        case POST_DELETE:
            return state.filter(el => el.id !== action.payload.id)
        case POST_EDIT:
            return state.map((el) => {
                if (el.id === action.payload.id) return {...action.payload}
                else return el
            })
        case POST_DELETE_USER:
            return state.filter(el => el.author !== action.payload.id)
        case POST_DELETE_ALL:
            return []
        default:
            return state
    }
} 