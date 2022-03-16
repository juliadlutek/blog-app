import { 
    USER_ADD,
    USER_DELETE
} from "./types";


export const userReducer = (state = [], action) => {
    switch (action.type) {
        case USER_ADD:
            return [...state,
                 {
                    id: action.payload._id,
                    username: action.payload.username,
                    email: action.payload.email,
                }
        ]
        case USER_DELETE:
            return state.filter(el => el.id !== action.payload.id)
            
        default:
            return state
    }
} 