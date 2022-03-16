import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import "./styles/App.css"
import LandingPage from './components/LandingPage'
import Dashboard from './components/posts/Dashboard';
import MyPosts from './components/posts/MyPosts';
import PostCreate from './components/posts/PostCreate';
import { useEffect, useState } from 'react';
import {connect} from 'react-redux'; 
import { getAllPosts } from './ducks/posts/operations'
import { getAllLikes } from './ducks/likes/operations'
import { getAllUsers } from './ducks/users/operations'
import { getAllComments } from './ducks/comments/operations'
import MyProfile from './components/MyProfile';
import PostDetails from './components/posts/PostDetails';
import PostEdit from './components/posts/PostEdit';
import Cookies from 'js-cookie'
import {deleteAllPostsAction} from './ducks/posts/actions'
import {deleteAllLikesAction} from './ducks/likes/actions'
import {deleteAllCommentsAction} from './ducks/comments/actions'


function App({posts, getAllPosts, users, getAllUsers, comments, getAllComments, likes, getAllLikes, deleteAllPostsAction, deleteAllLikesAction, deleteAllCommentsAction}) {

  const userName = Cookies.get("userName")

  useEffect(() => {
    if (posts.length === 0) {
      getAllPosts()
    }
    if (users.length === 0) {
      getAllUsers()
    }
    if (comments.length === 0) {
      getAllComments()
    }
    if (likes.length === 0) {
      getAllLikes()
    }
  }, []) 



  return (
    <Router>
      <Switch>
        <Route path="/login" component={LandingPage}/>
        <Route  exact path="/" component={Dashboard}/>
        <Route  path="/my-posts" component={MyPosts}/>
        <Route  path="/my-profile" component={MyProfile}/>
        <Route  path="/create-post" component={PostCreate}/>
        <Route  path="/posts/:id" component={PostDetails}/>
        <Route  path="/edit-post/:id" component={PostEdit}/>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
      posts: state.posts,
      users: state.users,
      comments: state.comments,
      likes: state.likes
  }
}

const mapDispatchToProps = {
  getAllPosts,
  getAllUsers,
  getAllComments,
  getAllLikes,
  deleteAllPostsAction,
  deleteAllLikesAction,
  deleteAllCommentsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

