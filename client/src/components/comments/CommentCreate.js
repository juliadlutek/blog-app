import CommentForm from './CommentForm'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {addComment} from '../../ducks/comments/operations'
import Cookies from 'js-cookie'
import {useEffect} from 'react'
import {mqttPublish} from '../../mqtt/mqtt.js';
 

const CommentCreate = ({addComment, users, thisPost}) => {
 
    const record = {topic:"default",qos: 1,};
    const publish = (payload) => {mqttPublish({...record,...payload})};

    const history = useHistory()
    const userName = Cookies.get("userName")
    const thisUser = users.find(user => user.username === userName)

    const handleSubmit=(values)=>{
        addComment(values)
        publish({"topic":"comments/add","payload":JSON.stringify({from: userName, post: thisPost.title})})
}

    useEffect(() => {
        const user = Cookies.get("userName")
        user ? console.log() : history.push("/login")
    }, [history])
 
    return (
            <CommentForm
                title="Add comment!"
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
                initialValues={{
                    content: '',
                    author: thisUser.id,
                    post: thisPost.id
                }}
            />
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = {
    addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCreate)