import { Form, Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

type EmployeeFormProps = {
    initialValues: {
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        role: string;
    };
    onSubmit: (values: any) => void;
};

const validationSchema = Yup.object({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Phone number is required'),
    role: Yup.string().required('Role is required'),
});

function EmployeeForm({ initialValues, onSubmit }: EmployeeFormProps) {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
            <Form>
                <div>
                    <label>First Name:</label>
                    <Field name="firstname" />
                    <div style={{ color: 'red' }}><ErrorMessage name="firstname" /></div>
                </div>

                <div>
                    <label>Last Name:</label>
                    <Field name="lastname" />
                    <div style={{ color: 'red' }}><ErrorMessage name="lastname" /></div>
                </div>

                <div>
                    <label>Email:</label>
                    <Field name="email" />
                    <div style={{ color: 'red' }}><ErrorMessage name="email" /></div>
                </div>

                <div>
                    <label>Phone:</label>
                    <Field name="phone" />
                    <div style={{ color: 'red' }}><ErrorMessage name="phone" /></div>
                </div>

                <div>
                    <label>Role:</label>
                    <Field name="role" />
                    <div style={{ color: 'red' }}><ErrorMessage name="role" /></div>
                </div>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
}

export default EmployeeForm;