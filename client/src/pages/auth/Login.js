import React, { Component } from 'react';
import '../../App.css';
//import {GridLoader} from "react-spinners";
import {login} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import { Formik, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';


class  Login extends Component {

    componentDidMount() {

        if (this.props.user) {
            this.props.history.push({
                pathname: '/',
            })
        }
    }

    loginUser = (values) => {
        this.props.login(values);
    };

    loginSuccess =  () => {
        this.props.history.push({
            pathname: '/',
        })
    };

    Form = (values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            backendErr,
            user) => {
        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" style={{ display: 'block' }}>
                    Email
                </label>
                <div>
                    <input
                        id="email"
                        placeholder="Enter your email"
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.email && touched.email ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.email &&
                    touched.email && <div className="input-feedback">{errors.email}</div>}
                </div>
                <div>
                    <input
                        id="password"
                        placeholder="Enter your password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.password && touched.password ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.password &&
                    touched.password && <div className="input-feedback">{errors.password}</div>}
                </div>

                <button
                    type="button"
                    className="outline"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                >
                    Reset
                </button>
                <button type="submit" disabled={isSubmitting}>
                    Login
                </button>


                {backendErr && <div className="input-feedback">{backendErr}</div>}
                {user && this.loginSuccess()}

            </form>
        );
    };

    render() {
        return(
            <Formik
                initialValues={{ email: '', password: ''}}
                onSubmit={(values, { setSubmitting }) => {
                    //alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    this.loginUser(values)
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .required('Required')
                        .email('Input valid email'),
                    password: Yup.string()
                        .required('Required')
                        .min(6, 'Password is too short - should be 6 chars minimum.')
                        .max(40, 'Password is too short - should be 6 chars minimum.'),

                })}
            >
                {({
                      values,
                      touched,
                      errors,
                      dirty,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      handleReset,
                  }) => (
                    this.Form(
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                        this.props.error,
                        this.props.user
                    )
                )}
            </Formik>
            )
    }
}

const mapStateToProps =(state) => {
    let {isFetching, error, user} = state.authReducer;
    return {isFetching, error, user}
};

const mapDispatchToProps =(dispatch) => ({
    login: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);


