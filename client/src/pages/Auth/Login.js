import React, { Component } from 'react';
import '../../App.css';
//import {GridLoader} from "react-spinners";
import {login} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import { Formik, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import style from "./Login.module.scss";
import Logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import Input from "../../components/Input/Input";

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
            <div className={style.container}>
                <div className={style.container__header}>
                    <Link to={"/"}>
                        <img src={Logo} alt={"Logo"}/>
                    </Link>
                    <Link to={"/register"} className={style.link}>Register</Link>
                </div>
                <div className={style.container__subcontainer}>
                    <p className={style.container__info}>
                        LOGIN TO YOUR ACCOUNT
                    </p>
                    <div className={style.container}>
                    <form onSubmit={handleSubmit}>

                        <div className = {errors.email && touched.email ? style.inputDanger: style.inputDefault}>
                            <input
                                id="email"
                                placeholder="Enter your email"
                                type="text"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email &&
                            touched.email && <div className={style.error}>{errors.email}</div>}
                        </div>
                        <div className = {errors.password && touched.password ? style.inputDanger: style.inputDefault}>
                            <input
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password &&
                            touched.password && <div className={style.error}>{errors.password}</div>}
                        </div>

                        <div className={style.inputButton} >
                            <button
                                type="submit" disabled={isSubmitting}>
                                LOGIN
                            </button>
                        </div>
                        {backendErr && <div className={style.error}>{backendErr}</div>}
                        {user && this.loginSuccess()}
                    </form>
                    </div>
                </div>
            </div>

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
                        .max(40, 'Password is too long - should be 40 chars max.'),

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


