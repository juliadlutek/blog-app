import PostForm from './PostForm'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {addPost} from '../../ducks/posts/operations'
import Cookies from 'js-cookie'
import {useEffect} from 'react'
import Navbar from '../Navbar'
import {mqttPublish} from '../../mqtt/mqtt.js'; 
 

const PostCreate = ({addPost}) => {

    const record = {topic:"default",qos: 1,};
    const publish = (payload) => {mqttPublish({...record,...payload})};

    const history = useHistory()
    const userName = Cookies.get("userName")
    const date = new Date()

    useEffect(() => {
        const user = Cookies.get("userName")
        user ? console.log() : history.push("/login")
    }, [history])

    const handleSubmit=(values)=>{
            addPost(values)
            publish({"topic":"posts/add","payload":JSON.stringify({from: userName, post: values.title})})
            history.push('/my-posts')      
    }

    return (
        <>
            <Navbar/>
            <PostForm
                title="Create new post!"
                onSubmit={(values) => handleSubmit(values)}
                initialValues={{
                    title: '',
                    content: '',
                    image: '',
                    hearts: 0,
                    date: date.toISOString().split('T')[0],
                    author: userName
                }}
            />
        </>
    )
}

const mapDispatchToProps = {
    addPost
}

export default connect(null, mapDispatchToProps)(PostCreate)