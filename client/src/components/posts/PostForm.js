import {Form, Formik, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
  

const PostSchema = Yup.object().shape({
    title: Yup.string("Title must be a string!")
        .required('Title is required!'),
    content: Yup.string("Content must be a string!")
        .required('Content is required!'),
    image: Yup.string("Image url must be a string!")
        .required('Image is required!')
})

const PostForm = ({title, onSubmit, initialValues}) => {
    const renderError = (message) => <p className="errorMessage">{message}</p>;
    return (
        <div className='formComponent'>
            <Formik
                initialValues={initialValues}
                validationSchema={PostSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}>
                <Form className="form">
                    <h3>{title}</h3>
                    <p>Title</p>
                    <Field className='field' name="title" placeholder="" />
                    <ErrorMessage name="title" render={renderError} />
                    <p>Content</p>
                    <Field className='field' name="content" placeholder="" />
                    <ErrorMessage name="content" render={renderError} />
                    <p>Image</p>
                    <Field className='field' name="image" placeholder="" />
                    <ErrorMessage name="image" render={renderError} />
                    <button type="submit">
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default PostForm