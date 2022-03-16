import Navbar from "../Navbar"
import {connect} from 'react-redux'; 
import Cookies from 'js-cookie' 
import pen from '../../images/pen.png'
import { Link } from 'react-router-dom'
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import del from '../../images/delete.png'
import { deletePost } from '../../ducks/posts/operations';
import edit from '../../images/edit.png'
import {mqttPublish} from '../../mqtt/mqtt.js';

const MyPosts = ({posts, users, deletePost}) => {

    const record = {topic:"default",qos: 1,};
    const publish = (payload) => {mqttPublish({...record,...payload})};

    const userName = Cookies.get("userName")
    const history = useHistory()
    const thisUser = users.find(user => user.username === userName)

    useEffect(() => {
        const user = Cookies.get("userName")
        user ? console.log() : history.push("/login")
    }, [history])

    return (
        <>
            <Navbar/>
            <div className="dashboard">
            <h3>{userName}'s posts</h3>
            <div className="buttons">
                <img className="icon" src={pen} alt="" />
                <Link className="button" to="/create-post">
                    Create new post!
                </Link>
            </div>
            <div className="postList">
                {
                posts && thisUser
                 ? 
                posts
                .filter(post => post.author === thisUser.id)
                .map(post => (
                    <div key={post.id} className="postContainer">
                        <div className="icons">
                            <Link to={`/edit-post/${post.id}`}>
                                <img className="small-icon" src={edit} alt=""/>  
                            </Link>
                            <img onClick={() => {
                                if (window.confirm(`Are you sure you want to delete post '${post.title}'?`)) {
                                    publish({"topic":"posts/delete","payload":JSON.stringify({from: userName, post: post.title})})
                                    deletePost(post) 
                                }
                            }} src={del} className="small-icon" alt="" />    
                        </div>
                        <Link to={`/posts/${post.id}`} className="post" >
                            <img src={post.image} alt="" />
                            <div className="info">
                                <p className='title'>{post.title}</p>
                                <p>{thisUser.username}, {post.date}</p>
                            </div> 
                        </Link>
                    </div>
                ))
                : (
                    <p>Any posts to display...</p>
                )}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        users: state.users
    }
}


const mapDispatchToProps = {
    deletePost
}


export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)
