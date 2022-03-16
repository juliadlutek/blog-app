import React from 'react';
import Navbar from '../Navbar'
import mqtt from 'mqtt/dist/mqtt';
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {connect} from 'react-redux';
import {Form, Formik, Field} from "formik"
import * as Yup from "yup"
import {client, mqttPublish, connectStatus} from '../../mqtt/mqtt.js';
import {useHistory} from 'react-router-dom'

const Chat = ({users}) => {

  const history = useHistory()

  useEffect(() => {
    const user = Cookies.get("userName")
    user ? console.log() : history.push("/login")
}, [history])

  const username = Cookies.get("userName")
  const [messages, setMessages] = useState([])
  const [connStatus,setConnStatus] = useState(connectStatus)

  const record = {topic:"default",qos: 1,};
  const publish = (payload) => {mqttPublish({...record,...payload})};

  const handleSubmit=(values)=>{
    publish({"topic":"chat","payload":JSON.stringify({...values})})    
}

  
useEffect(() => {
  let isMounted = true 
  if (client) {
    client.on('message', (topic, message) => {
        switch (topic){
              case "chat":
                  const msg = JSON.parse(message)
                  setMessages(messages => [...messages, msg])
                      break;
              default:
                  break;
        }
    });
  }
}, [client]);



  return (
  <>
    <Navbar/>
    <div className="chat">
      <h3>Chat with other users!</h3>
      <div className="chat-window">
        <div className="messages">
           {messages.length !== 0 ? 
           messages.map((msg, index) => (
             <div 
             key={index} 
             className="message"
             style={{ backgroundColor: msg.author === username ? 'lightgrey': ''}}>
               <p className="author">{msg.author}</p>
               <p>{msg.message}</p>
             </div>
             ))
          :
          (<p>Any messages to display...</p>)
          }
        </div>
       
        <Formik
                  initialValues={{message: "", author: username}}
                  validationSchema={
                    Yup.object().shape({
                    message: Yup
                        .string()
                        .required()
                })}
                  onSubmit={
                    values => handleSubmit(values)
                }
                  enableReinitialize={true}>
                  <Form className="form">
                      <Field className="message-field" name="message" placeholder="" />
                      <button type="submit">
                          Send
                      </button>
                  </Form>
          </Formik>
      </div>


    </div>
  </>);
};

const mapStateToProps = (state) => {
  return {
      users: state.users
  }
}

export default connect(mapStateToProps, null)(Chat);
