import logo from '../images/logo.png'
import profile from '../images/profile.png'
import explore from '../images/explore.png'
import pen from '../images/pen.png'
import {Link, useHistory} from 'react-router-dom'


const Navbar = () => {

    const history = useHistory()

    return (
        <div className="navbar">
            <div className="title">
                <img src={logo} alt="" />
                <p>BLOG APP</p>
            </div>
            <div className="links">
                <Link to='/' className='link'>
                    <img src={explore} alt="" />
                </Link>
                <Link to='/my-posts' className='link'>
                    <img src={pen} alt="" />
                </Link>
                <Link to='/my-profile' className='link'>
                    <img src={profile} alt="" />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
