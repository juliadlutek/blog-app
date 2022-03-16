import React from 'react';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import {connect} from 'react-redux'; 
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import PasswordForm from './login/PasswordForm';
import axios from "axios"
import {deleteUser} from '../ducks/users/operations'

const MyProfile = ({users, deleteUser}) => {

    const userName = Cookies.get("userName")
    const history = useHistory()
    const thisUser = users.find(user => user.username === userName)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        const user = Cookies.get("userName")
        user ? console.log() : history.push("/login")
    }, [history])

    const handleSubmit = async (values) => {
        try {
            const req = await axios.put('http://localhost:5000/users', values)
            const in15minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
            Cookies.set('userName', req.data.username, {expires: in15minutes})
            setEditing(false)
        } catch (error) {
            console.log(error.message)
        }
}

  return (
      <>
        <Navbar/>
        {thisUser ? (

            <div className="formComponent">
            <div className="form">
                <h3>My profile</h3>
                <p>Username: {thisUser.username}</p>
                <p>Email: {thisUser.email}</p>
                {editing ? 
                (
                    <>
                        <h3>Change Password:</h3>
                        <PasswordForm initialValues={{_id: thisUser.id, password: '', newPassword: '', confirmPassword: ''}} onSubmit={handleSubmit}/>
                    </>
                ) : 
                (
                <div>
                    <button onClick={() => setEditing(true)}>
                        Change Password
                    </button>
                    <button onClick={() => {
                        deleteUser(thisUser)
                        Cookies.remove("userName")
                        history.push("/login")
                    }
                    }>Delete account</button>
                    <button onClick={() => {
                        Cookies.remove("userName")
                        history.push("/login")
                    }}>Log out</button>
                </div>
                
                )}
            </div>
        </div>
      ) : (<p>Loading...</p>)}
      </>
  )
};

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = {
    deleteUser
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
