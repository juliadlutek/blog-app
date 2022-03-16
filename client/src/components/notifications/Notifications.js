import React from 'react';
import Navbar from '../Navbar';
import {useEffect} from 'react';
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom'



const Notifications = ({data}) => {

  const history = useHistory()

  useEffect(() => {
    const user = Cookies.get("userName")
    user ? console.log() : history.push("/login")
}, [history])

  return (
  <div>
      <Navbar/>
      <div className="chat">
      <h3>Check what other users are doing!</h3>
      <div className="chat-window">
        <div className="messages">
           {data.length !== 0 ? 
           data.map((msg, index) => (
             <div 
             key={index} 
             className="message"
             >
               {msg}
             </div>
             ))
          :
          (<p>Any notifications to display...</p>)
          }
        </div>
        </div>
        </div>
  </div>
  )
};

export default Notifications;
