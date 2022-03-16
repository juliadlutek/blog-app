import React from 'react';
import Navbar from '../Navbar';
import {useEffect, useState} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import heart1 from '../../images/heart1.png'
import heart2 from '../../images/heart2.png'
import edit from '../../images/edit.png'
import del from '../../images/delete.png'
import Comments from '../comments/Comments'
import Cookies from 'js-cookie'
import { deletePost } from '../../ducks/posts/operations';
import CommentCreate from '../comments/CommentCreate';
import { likePost, dislikePost } from '../../ducks/likes/operations';


const PostDetails = ({posts, users, deletePost, likes, likePost, dislikePost}) => {



    const { id } = useParams()
    const thisPost = posts.find(post => post.id === id)
    const author = users.find(user => user.id === thisPost.author)
    const [thisLikes, setThisLikes] = useState(likes.find(like => like.post === id))
    const [likesAmount, setLikesAmount] = useState(thisLikes.users.length)

    const history = useHistory()
    const [isLiked, setIsLiked] = useState(false)
    const userId = Cookies.get("userId")
    const [isItMyPost, setIsItMyPost] = useState(false)

    useEffect(() => {
        const user = Cookies.get("userName")
        user ? console.log() : history.push("/login")
        const postAuthor = users.find(user => user.id === thisPost.author)
        if (postAuthor.username === user) {
            setIsItMyPost(true)
        }
        const thisLikes = likes.find(like => like.post === id)
        if (thisLikes.users.includes(userId)) {
            setIsLiked(true)
        }
    }, [history])
    

  return (
  <div>
      <Navbar/>
      <div className="details">
          <img src={thisPost.image} alt="" />
          <div className="info">
              {isItMyPost ? 
                (<div className="icons">
                <Link to={`/edit-post/${thisPost.id}`}>
                    <img className="small-icon" src={edit} alt=""/>  
                </Link>
                  <img className="small-icon" onClick={() => {
                      if (window.confirm(`Are you sure you want to delete post '${thisPost.title}'?`)) {
                        deletePost(thisPost) 
                        history.push("/")
                    }
                    }}
                   src={del} alt="" />
                </div>) 
              : 
              (<p></p>)}
                <h3>{thisPost.title}</h3>
                <div  className="info2">
                    <p>{author.username}, {thisPost.date}</p>
                    <div>
                        <p>{likesAmount}</p>
                        {isLiked ? (
                            <img className="icon" onClick={() => {
                                dislikePost({post: id, user: userId})
                                setLikesAmount(likesAmount - 1)
                                setIsLiked(false)
                            }} src={heart2} alt="" />
                        ) : (
                            <img className="icon" onClick={() => {
                                likePost({post: id, user: userId})
                                setLikesAmount(likesAmount + 1)
                                setIsLiked(true)
                            }} src={heart1} alt="" />
                        )}
                    </div>
                </div>
                <p>{thisPost.content}</p>
          </div>
      </div>
      <div className="comments">
        <CommentCreate thisPost={thisPost}/>
        <Comments thisPost={thisPost}/>
      </div>
  </div>
  );
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    users: state.users,
    likes: state.likes
})


const mapDispatchToProps = {
    deletePost,
    likePost,
    dislikePost
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
