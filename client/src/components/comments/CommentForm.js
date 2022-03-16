import {Form, Formik, Field} from "formik"
import * as Yup from "yup"


const CommentSchema = Yup.object().shape({
    content: Yup
        .string()
        .required()
})

const CommentForm = ({title, onSubmit, initialValues}) => {
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={CommentSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}>
                <Form className="form">
                    <h3>{title}</h3>
                    <Field className="comment-field" name="content" placeholder="" />
                    <button type="submit">
                        Add
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default CommentForm