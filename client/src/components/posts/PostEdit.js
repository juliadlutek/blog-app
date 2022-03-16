import PostForm from './PostForm'
import { connect } from 'react-redux'
import { editPost } from '../../ducks/posts/operations'
import { useHistory, useParams } from "react-router-dom";
import Navbar from '../Navbar'
import Cookies from 'js-cookie'
import {useEffect} from 'react'

const PostEdit = ({posts, editPost}) => {


    const userName = Cookies.get("userName")
    let history = useHistory()
    let { id } = useParams()
    const thisPost = posts.find( post => post.id === id)
    
    useEffect(() => {
        const user = Cookies.get("userName")
        user ? 
        console.log() : 
        history.push("/login")

    }, [history, userName])


    const handleSubmit=(values)=>{
        editPost(values)
        history.push('/my-posts')      
}

    return (
        <>
            <Navbar/>
            <PostForm
                title={`Edit post ${thisPost.title}:`}
                onSubmit={(values) => {
                    handleSubmit(values)
                } }
                initialValues={{
                    id: thisPost.id,
                    title: thisPost.title,
                    content: thisPost.content,
                    image: thisPost.image,
                    hearts: thisPost.hearts,
                    date: thisPost.date,
                    author: thisPost.author
                }}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
        posts: state.posts
    })

const mapDispatchToProps = {
    editPost
}


export default connect(mapStateToProps, mapDispatchToProps)(PostEdit)