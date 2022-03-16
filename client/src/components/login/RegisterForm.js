import {Form, Formik, Field, ErrorMessage} from "formik"
import * as Yup from "yup" 
import axios from "axios"
import { useHistory } from "react-router-dom"
import Cookies from 'js-cookie'


const RegisterSchema = Yup.object().shape({
    username: Yup
    .string()
    .required("Username is required!")
    .min(6, "Username should be at least 6 characters long!"),
    email: Yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
    password: Yup
    .string()
    .required("Password is required!")
    .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be at least 8 characters long and contains uppercase, lowercase, number and special character!"
        ),
        confirmPassword: Yup
        .string()
        .required("Password confirmation is required!")
    })
    
    const RegisterForm = () => {
        
        const renderError = (message) => <p className="errorMessage">{message}</p>;
        const history = useHistory()
        
        const handleSubmit = async (values) => {
            try {
                const req = await axios.post('http://localhost:5000/users/register', values)
                const in15minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
                Cookies.set('userName', req.data.result.username, {expires: in15minutes})
                Cookies.set('userId', req.data.result._id, {expires: in15minutes})
                history.push("/")
            } catch (error) {
                console.log(error.message)
            }
    }

    return (
        <Formik
            initialValues={{username: '', email: '', password: ''}}
            validationSchema={RegisterSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
            <Form className='form'>
                <p>Username</p>
                <Field className='field' name="username" placeholder="" />
                <ErrorMessage name="username" render={renderError} />
                <p>Email</p>
                <Field className='field' name="email" placeholder="" />
                <ErrorMessage name="email" render={renderError} />
                <p>Password</p>
                <Field type="password" className='field' name="password" placeholder="" />
                <ErrorMessage name="password" render={renderError} />
                <p>Confirm password</p>
                <Field type="password" className='field' name="confirmPassword" placeholder="" />
                <ErrorMessage name="confirmPassword" render={renderError} />
                <button type="submit">
                    Submit
                </button>
            </Form>
        </Formik>
    )
}

export default RegisterForm
