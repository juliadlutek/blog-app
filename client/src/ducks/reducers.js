import { postReducer } from "./posts/reducer";
import { userReducer } from "./users/reducer";
import { commentReducer } from "./comments/reducer";
import { likeReducer } from "./likes/reducer";
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    posts: postReducer,
    users: userReducer,
    comments: commentReducer,
    likes: likeReducer
  })