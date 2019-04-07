import React, { Component } from 'react';
import '../../App.css';
//import {GridLoader} from "react-spinners";
import {getUserProfile} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import {Formik} from "formik";
import * as Yup from "yup";
import {register} from "../../actions/actionCreator";
import style from "./Register.module.scss";
import Logo from "../../images/logo.png";
import {Link} from "react-router-dom";


class  Register extends Component {


    constructor(props) {
        super(props);
        this.state= {
            role: 0,
            permission: 'false',
        }
    }

    componentDidMount() {
        if (this.props.user) {
            this.props.history.push({
                pathname: '/',
            })
        }
    }

    registerUser = (data) => {
        console.log(this.state.role)

        data.role = this.state.role
        console.log(data)
        this.props.register(data);
    };

    registerSuccess =  () => {
        this.props.history.push({
            pathname: '/',
        })
    };

    handleChange = (event) => {
        this.setState({role: parseInt(event.target.value)});
        console.log(this.state.role)

    };

    handlePermissionChange = () => {
        this.setState({permission: !this.state.permission});
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

                <div>
                    <input
                        id="name"
                        placeholder="Enter your name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.name && touched.name ? 'text-input error' : 'text-input'
                        }
                    />
                    <input
                        id="lastName"
                        placeholder="Enter your lastname"
                        type="text"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                        }
                    />
                    <div>
                        {errors.name &&
                        touched.name && <span className="input-feedback">{errors.name}</span>}

                        {errors.lastName &&
                        touched.lastName && <span className="input-feedback">{errors.lastName}</span>}
                    </div>



                </div>
                <div>
                    <input
                        id="displayName"
                        placeholder="Enter your display name"
                        type="text"
                        value={values.displayName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.displayName && touched.displayName ? 'text-input error' : 'text-input'
                        }
                    />

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
                    {errors.displayName &&
                    touched.displayName && <div className="input-feedback">{errors.displayName}</div>}

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

                    <input
                        id="passwordConfirm"
                        placeholder="Confirm your password"
                        type="password"
                        value={values.passwordConfirm}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.passwordConfirm && touched.passwordConfirm ? 'text-input error' : 'text-input'
                        }
                    />
                    {errors.password &&
                    touched.password && <div className="input-feedback">{errors.password}</div>}

                    {errors.passwordConfirm &&
                    touched.passwordConfirm && <div className="input-feedback">{errors.passwordConfirm}</div>}
                </div>

                <div>

                    <input onChange={this.handleChange}
                           type="radio"
                           value="0"
                           checked={this.state.role===0}/>
                    <div >
                        <p>Join As a Buyer</p>
                        <span>I am looking for a Name, Logo or Tagline for my business, brand or product.</span>
                    </div>


                    <input onChange={this.handleChange}
                           type="radio"
                           value="1"
                           checked={this.state.role===1}/>
                    <div >
                        <p>Join As a Creative</p>
                        <span>I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.</span>
                    </div>

                    <input type="checkbox"
                           onChange={this.handlePermissionChange}
                           name={"permission"}
                           value={this.state.permission}
                    />
                    <label>Allow Squadhelp to send marketing/promotional offers from time to time</label>

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
                    Submit
                </button>

                {backendErr && <div className="input-feedback">{backendErr}</div>}
                {user && this.registerSuccess()}
            </form>
        );
    };


    render() {
        return (
            <div className={style.container}>
                <div className={style.container__header}>
                    <Link to={"/"}>
                        <img src={Logo} alt={"Logo"}/>
                    </Link>
                    <Link to={"/login"} className={style.link}>Login</Link>
                </div>
                <div className={style.container__subcontainer}>
                    <p className={style.container__info}>CREATE AN ACCOUNT</p>
                    <p className={style.container__subinfo}>We always keep your name and email address private.</p>
                    <Formik
                        initialValues={{ email: '', password: '', passwordConfirm: '', name: '', displayName: '', lastName: "" ,
                            permission: 'false'}}
                        onSubmit={(values, { setSubmitting }) => {
                            alert(JSON.stringify(values, null, 2));
                            console.log(values)
                            setSubmitting(false);
                            this.registerUser(values);
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                .required('Required'),
                            lastName: Yup.string()
                                .required('Required'),
                            email: Yup.string()
                                .required('Required')
                                .email('Input valid email'),
                            password: Yup.string()
                                .required('Required')
                                .max(40, 'Password is too short - should be 6 chars minimum.')
                                .min(6, 'Password is too short - should be 6 chars minimum.'),
                            passwordConfirm: Yup.string()
                                .required('Required')
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
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
                                this.props.user,
                            )
                        )}
                    </Formik>
                </div>
            </div>


        );
    }
}

const mapStateToProps =(state) => {
    let {isFetching, error, user} = state.authReducer;
    return {isFetching, error, user}
};

const mapDispatchToProps =(dispatch) => ({
    register: (data) => dispatch(register(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);


