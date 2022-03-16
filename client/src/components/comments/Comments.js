import React from 'react';
import {connect} from 'react-redux'; 
import Cookies from 'js-cookie'
import del from '../../images/delete.png'
import edit from '../../images/edit.png'
import {deleteComment, editComment} from '../../ducks/comments/operations'
import {useState} from 'react'
import CommentForm from './CommentForm';


const Comments = ({thisPost, comments, users, deleteComment, editComment}) => {
  const thisComments = comments.filter(comment => comment.post === thisPost.id)
  const userName = Cookies.get("userName")
  const thisUser = users.find(user => user.username === userName)
  const [isEdited, setIsEdited] = useState("")

  return (
    <div>
        {thisComments.length !== 0 ? 
        (<div>
          <h3>Comments</h3>
          {thisComments.map(comment => (
            <div key={comment.id}>
              {isEdited === comment.id ? (
                <div>
                    <CommentForm
                    title={"Edit comment"}
                    onSubmit={(values) => {
                        editComment(values)
                        setIsEdited("")
                    } }
                    initialValues={{
                        id: comment.id,
                        content: comment.content,
                        author: comment.id,
                        post: thisPost.id
                    }}
                />
                </div>
              ) : (
                <div key={comment.id} 
                className='comment'
                >
                  {comment.author === thisUser.id ? 
                  (<div className="icons">
                    <img onClick={() => setIsEdited(comment.id)} src={edit} className="small-icon" alt="" />
                    <img onClick={() => {
                      deleteComment(comment)
                    }} src={del} className="small-icon" alt="" />
                  </div>) : 
                  (<></>)}
                  <p className="author">
                  </p>
                  <p>{comment.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>) 
        : (<h3>Any comments to display...</h3>)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
      comments: state.comments,
      users: state.users
  }
}


const mapDispatchToProps = {
  deleteComment,
  editComment
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments);
