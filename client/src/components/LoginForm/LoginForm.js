import React from 'react';
import connect from "react-redux/es/connect/connect";
import style from "../../pages/Auth/Login.module.scss";
import {GridLoader} from "react-spinners";
import { Field, reduxForm } from 'redux-form'
import {InputAuth} from "../Inputs/InputProfileEdit";
import {maxLength15, minLength6, required, email} from "../../utils/validation";


const LoginForm = (props) => {
    const {handleSubmit, backendErr} = props;
    return (
        <form onSubmit={handleSubmit} >
            <div>
                <Field type={"text"}
                       placeholder={"Enter your email"}
                       name={"email"}
                       classes={{
                           inputDefault: style.inputDefault,
                           warning: style.inputDanger,
                           formError: style.error
                       }}
                       component={InputAuth}
                       validate={[required, email]}
                />
            </div>
            <div>
                <Field type={"password"}
                       placeholder={"Enter your password"}
                       name={"password"}
                       classes={{
                           inputDefault: style.inputDefault,
                           warning: style.inputDanger,
                           formError: style.error
                       }}
                       component={InputAuth}
                       validate={[required, maxLength15, minLength6]}
                />
            </div>
            <div className={style.inputButton} >
            <button
                type="submit">
                LOGIN
            </button>
            <div>
                {backendErr && <div className={style.error}>{backendErr}</div>}
            </div>
            </div>
        </form>
    )
};

export default connect(null, null)( reduxForm({
    form: 'LoginForm',
})(LoginForm));


