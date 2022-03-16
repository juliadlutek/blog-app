import {Form, Formik, Field, ErrorMessage} from "formik"
import * as Yup from "yup" 
import axios from "axios"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import Cookies from 'js-cookie'

const LoginSchema = Yup.object().shape({
    email: Yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
    password: Yup
    .string()
    .required("Password is required!")
})

const LoginForm = () => {

    const [loggingError, setLoggingError] = useState("")

    const renderError = (message) => <p className="errorMessage">{message}</p>;
    const history = useHistory()
        
    const handleSubmit = async (values) => {
        try {
            const req = await axios.post('http://localhost:5000/users/login', values)
            const in15minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
            Cookies.set('userName', req.data.result.username, {expires: in15minutes})
            Cookies.set('userId', req.data.result._id, {expires: in15minutes})
            history.push("/")
        } catch (error) {
            setLoggingError(error.message)
        }
    }

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
            <Form className='form'>
                <p>Email</p>
                <Field className='field' name="email" placeholder="" />
                <ErrorMessage name="email" render={renderError} />
                <p>Password</p>
                <Field type="password" className='field' name="password" placeholder="" />
                <ErrorMessage name="password" render={renderError} />
                {loggingError ? (<p className="errorMessage">Invalid email or password</p>) : (<p></p>)}
                <button type="submit">
                    Submit
                </button>
            </Form>
        </Formik>
    )
}

export default LoginForm
