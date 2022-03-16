import {Form, Formik, Field, ErrorMessage} from "formik"
import * as Yup from "yup" 
import axios from "axios"
import { useHistory } from "react-router-dom"
import Cookies from 'js-cookie'


const PasswordSchema = Yup.object().shape({
    newPassword: Yup
    .string()
    .required("New password is required!")
    .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be at least 8 characters long and contains uppercase, lowercase, number and special character!"
        ),
    confirmPassword: Yup
    .string()
    .required("Password confirmation is required!"),
    password: Yup
    .string()
    .required("Old password confirmation is required!")
    })
    
    const PasswordForm = ({initialValues, onSubmit}) => {
        
        const renderError = (message) => <p className="errorMessage">{message}</p>;
        const history = useHistory()

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={PasswordSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}>
            <Form className='edit-form'>
                <p>New Password</p>
                <Field type="password" className='field' name="newPassword" placeholder="" />
                <ErrorMessage name="newPassword" render={renderError} />
                <p>Confirm new password</p>
                <Field type="password" className='field' name="confirmPassword" placeholder="" />
                <ErrorMessage name="confirmPassword" render={renderError} />
                <p>Old Password</p>
                <Field type="password" className='field' name="password" placeholder="" />
                <ErrorMessage name="password" render={renderError} />
                <button type="submit">
                    Submit
                </button>
            </Form>
        </Formik>
    )
}

export default PasswordForm