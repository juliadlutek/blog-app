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
import Chat from './components/chat/Chat';
import {client, connectStatus, mqttConnect, mqttDisconnect, mqttSub} from './mqtt/mqtt.js';
import Notifications from './components/notifications/Notifications';
import Cookies from 'js-cookie'
import {deleteAllPostsAction} from './ducks/posts/actions'
import {deleteAllLikesAction} from './ducks/likes/actions'
import {deleteAllCommentsAction} from './ducks/comments/actions'


function App({posts, getAllPosts, users, getAllUsers, comments, getAllComments, likes, getAllLikes, deleteAllPostsAction, deleteAllLikesAction, deleteAllCommentsAction}) {

  const userName = Cookies.get("userName")
  const [connStatus,setConnStatus] = useState(connectStatus)
  const [notifications, setNotifications] = useState([])
  
  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnStatus('Connected');
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
          switch (topic){
              case "posts/add":
                  const postAdd = JSON.parse(message)
                  if (postAdd.from !== userName) {
                    deleteAllPostsAction()
                    getAllPosts()
                    const postNotification = `${postAdd.from} added new post "${postAdd.post}"`
                    setNotifications(notifications => [...notifications, postNotification])
                  }
                  break;
              case "posts/delete":
                const postDelete = JSON.parse(message)
                if (postDelete.from !== userName) {
                  deleteAllPostsAction()
                  getAllPosts()
                  const postNotification = `${postDelete.from} deleted post "${postDelete.post}"`
                  setNotifications(notifications => [...notifications, postNotification])
                }
                break;
              case "posts/edit":
                const postEdit = JSON.parse(message)
                if (postEdit.from !== userName) {
                  deleteAllPostsAction()
                  getAllPosts()
                  const postNotification = `${postEdit.from} edited post "${postEdit.post}"`
                  setNotifications(notifications => [...notifications, postNotification])
                }
                break;
                case "likes":
                  const like = JSON.parse(message)
                  deleteAllLikesAction()
                  getAllLikes()
                  if (like.for === userName) {
                    const postNotification = `${like.from} liked your post! :)`
                    setNotifications(notifications => [...notifications, postNotification])
                  }
                  break;
                case "dislikes":
                  const dislike = JSON.parse(message)
                  deleteAllLikesAction()
                  getAllLikes()
                  if (dislike.for === userName) {
                    const postNotification = `${dislike.from} disliked your post! :(`
                    setNotifications(notifications => [...notifications, postNotification])
                  }
                  break;
                case "comments/add":
                  const commentAdd = JSON.parse(message)
                  if (commentAdd.from !== userName) {
                    deleteAllCommentsAction()
                    getAllComments()
                    const postNotification = `${commentAdd.from} commented post "${commentAdd.post}"`
                    setNotifications(notifications => [...notifications, postNotification])
                  }
                  break;
                case "comments/edit":
                  const commentEdit = JSON.parse(message)
                  if (commentEdit.from !== userName) {
                    deleteAllCommentsAction()
                    getAllComments()
                    const postNotification = `${commentEdit.from} edited comment to post "${commentEdit.post}"`
                    setNotifications(notifications => [...notifications, postNotification])
                  }
                  break;
                case "comments/delete":
                  const commentDelete = JSON.parse(message)
                  if (commentDelete.from !== userName) {
                    deleteAllCommentsAction()
                    getAllComments()
                    const postNotification = `${commentDelete.from} deleted comment to post "${commentDelete.post}"`
                    setNotifications(notifications => [...notifications, postNotification])
                  }
                  break;
                
                default:
                    break;
          }
      });
    }
}, [client]);

const record = {topic:"default",qos: 1,};

const connect = () => {
  mqttConnect(`ws://broker.emqx.io:8083/mqtt`)
};

const subscribe = (topic)=>{
  mqttSub({...record,"topic":topic})
};

const disconnect = () => {
  mqttDisconnect()
};

useEffect(()=>{
    disconnect();
    connect()
},[])

useEffect(()=>{
if(connStatus==="Connected"){
subscribe("chat");
subscribe("likes");
subscribe("dislikes");
subscribe("posts/add");
subscribe("posts/delete");
subscribe("posts/edit");
subscribe("comments/add");
subscribe("comments/delete");
subscribe("comments/edit");
}
},[connStatus])



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
        <Route path="/chat" component={Chat}/>
        <Route path="/notifications" component={() => <Notifications data={notifications}/>}/>
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

