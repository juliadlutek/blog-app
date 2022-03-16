import logo from '../images/logo.png'
import {useState} from 'react'
import LoginForm from './login/LoginForm'
import RegisterForm from './login/RegisterForm'

const LandingPage = () => {

    const [currentForm, setCurrentForm] = useState('login')

    return (
        <div className="landingPage">
            <div className="content">
                <div className="title">
                    <img src={logo} alt="" />
                    <p>BLOG APP</p>
                </div>
                <p className="slogan">Share your thoughts with the world!</p>
                {currentForm === 'login' ? <LoginForm/> : <RegisterForm/>}
                {currentForm === 'login' ? (
                    <div className='changeForm'>
                        <p>New with us?</p>
                        <p onClick={() => setCurrentForm('register')}>Register</p>
                    </div>
                ) : (
                    <div className='changeForm'>
                        <p>Already have an account?</p>
                        <p onClick={() => setCurrentForm('login')}>Log in</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LandingPage

