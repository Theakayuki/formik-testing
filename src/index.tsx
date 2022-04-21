import './styles.css';

import * as Yup from 'yup';

import { Form, Formik, useField } from 'formik';

import ReactDOM from 'react-dom';

const MyTextInput = ({ label, ...props }: any) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className={meta.error && meta.touched ? 'error' : ''} {...field} {...props} />
            {meta.error && meta.touched && <div className='error'>{meta.error}</div>}
        </>
    );
};

const MyCheckbox = ({ children, ...props }: any) => {
    // We need to tell useField what type of input this is
    // since React treats radios and checkboxes differently
    // than inputs/select/textarea.
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className='checkbox-input'>
                <input type='checkbox' {...field} {...props} />
                {children}
            </label>
            {meta.error && meta.touched ? <div className='error'>{meta.error}</div> : null}
        </div>
    );
};

const MySelect = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.error && meta.touched ? <div className='error'>{meta.error}</div> : null}
        </div>
    );
};

const SignupForm = () => {
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                acceptedTerms: false,
                jobType: '',
            }}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                lastName: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
                acceptedTerms: Yup.boolean().oneOf(
                    [true],
                    'Accept terms and conditions is required',
                ),
                jobType: Yup.string()
                    .oneOf(
                        ['designer', 'development', 'product', 'other'],
                        'Must select a valid job type',
                    )
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <MyTextInput
                        name='firstName'
                        type='text'
                        label='First Name'
                        placeholder='John'
                    />
                    <MyTextInput name='lastName' type='text' label='Last Name' placeholder='Doe' />
                    <MyTextInput
                        name='email'
                        type='email'
                        label='Email Address'
                        placeholder='John@example.com'
                    />
                    <MySelect name='jobType' label='Job Type'>
                        <option value=''>Select a job type</option>
                        <option value='designer'>Designer</option>
                        <option value='development'>Developer</option>
                        <option value='product'>Product Manager</option>
                        <option value='other'>Other</option>
                    </MySelect>
                    <MyCheckbox name='acceptedTerms' label='I accept the terms and conditions'>
                        I accept the terms and conditions
                    </MyCheckbox>
                    <br />
                    <button type='submit' disabled={isSubmitting}>
                        Submit
                    </button>
                    <button type='reset'>Reset</button>
                </Form>
            )}
        </Formik>
    );
};

function App() {
    return <SignupForm />;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
