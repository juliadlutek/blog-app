import Navbar from "../Navbar"
import {connect} from 'react-redux'; 
import Cookies from 'js-cookie'
import post from '../../images/post.png'
import user from '../../images/user.png'
import loupe from '../../images/loupe.png'
import refresh from '../../images/refresh.png'
import {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Formik, Form, Field} from 'formik'
import * as Yup from "yup"
import axios from "axios";



const Dashboard = ({posts, users}) => {

    const [postList, setPostList] = useState(posts)

    const [userName, setUserName] = useState("")
    const history = useHistory()
    const [view, setView] = useState("posts")

    useEffect(() => {
        const user = Cookies.get("userName")
        user ? 
        setUserName(user) : 
        history.push("/login")

    }, [history, userName])

    const handleSearch = async (values) => {
        const {data} = await axios.post(`http://localhost:5000/posts/search`, values);
        setPostList(data)
    }

    return (
        <>
            <Navbar/>
            <div className="dashboard">
            <h3>Hello {userName}, let's check what's new on Blog App!</h3>
            <div className="buttons">
                <img className="icon" src={post} alt="" />
                <button className="button" onClick={() => setView("posts")}>
                    Posts
                </button>
                <img className="icon" src={user} alt="" />
                <button className="button" onClick={() => setView("users")}>
                    Users
                </button>
            </div>
            <div className="searching">
                    <p>Search for post: </p>
                    <Formik
                        initialValues={{pattern: ""}}
                        validationSchema={
                            Yup.object().shape({
                            pattern: Yup
                                .string()
                                .required()
                        })}
                        onSubmit={
                            values => handleSearch(values)
                        }
                        enableReinitialize={true}>
                        <Form className="search">
                            <Field name="pattern" placeholder="" />
                            <button className="btn"type="submit">
                                <img src={loupe} alt="" />
                            </button>
                        </Form>
                </Formik>
                <img className="refresh" src={refresh} alt="" onClick={() => setPostList(posts)} />
            </div>
            {view === "posts" ? (
                <div className="postList">
                    {postList && users ? 
                    postList.map((post, index) =>
                        <Link to={`/posts/${post.id}`} className="post" key={index}>
                            <img src={post.image} alt="" />
                            <div className="info">
                                <p className='title'>{post.title}</p>
                                <p>{post.date}</p>
                            </div> 
                        </Link>
                    )
                    : 
                    (
                        <p>Any posts to display...</p>
                    )}
                </div>

            ) : 
            (
                <div className="userList">
                    {users ? (
                        users.map(user => 
                            <div className="user" key={user.id}>
                                <p>{user.username}</p>
                            </div>
                        )
                    ) : <p>Any users to display...</p>}
                </div>
            )}
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


export default connect(mapStateToProps, null)(Dashboard)
