import React from 'react';
import connect from "react-redux/es/connect/connect";
import style from "../../pages/Auth/Register.module.scss";
import {GridLoader} from "react-spinners";
import { Field, reduxForm } from 'redux-form'
import {InputAuth} from "../Inputs/InputProfileEdit";
import {maxLength15, minLength6, required, passwordsMatch, email} from "../../utils/validation";


const RegisterForm = (props) => {
    const {handleSubmit, backendErr} = props;
    return (
        <form onSubmit={handleSubmit} >
            <div className={style.formContainer}>
                <div className={style.formContainer__row}>
                    <div>
                        <Field type={"text"}
                               placeholder={"Enter your name"}
                               name={"name"}
                               classes={{
                                   inputDefault: style.inputDefault,
                                   warning: style.inputDanger,
                                   formError: style.formError
                               }}
                               component={InputAuth}
                               validate={[required, maxLength15, minLength6]}
                        />
                    </div>
                    <div>
                        <Field type={"text"}
                               placeholder={"Enter your lastname"}
                               name={"lastName"}
                               classes={{
                                   inputDefault: style.inputDefault,
                                   warning: style.inputDanger,
                                   formError: style.formError
                               }}
                               component={InputAuth}
                               validate={[required, maxLength15, minLength6]}
                        />
                    </div>
                </div>
                <div className={style.formContainer__row}>
                    <div>
                        <Field type={"text"}
                               placeholder={"Enter your display name"}
                               name={"displayName"}
                               classes={{
                                   inputDefault: style.inputDefault,
                                   warning: style.inputDanger,
                                   formError: style.formError
                               }}
                               component={InputAuth}
                               validate={[required, maxLength15, minLength6]}
                        />
                    </div>
                    <div>
                        <Field type={"text"}
                               placeholder={"Enter your email"}
                               name={"email"}
                               classes={{
                                   inputDefault: style.inputDefault,
                                   warning: style.inputDanger,
                                   formError: style.formError
                               }}
                               component={InputAuth}
                               validate={[required, maxLength15, minLength6, email]}
                        />
                    </div>
                </div >
                <div className={style.formContainer__row}>
                    <div>
                        <Field type={"password"}
                               placeholder={"Enter your password"}
                               name={"password"}
                               classes={{
                                   inputDefault: style.inputDefault,
                                   warning: style.inputDanger,
                                   formError: style.formError
                               }}
                               component={InputAuth}
                               validate={[required, maxLength15, minLength6]}
                        />
                    </div>
                    <div>
                        <Field type={"password"}
                               placeholder={"Confirm your password"}
                               name={"passwordConfirm"}
                               classes={{
                                   inputDefault: style.inputDefault,
                                   warning: style.inputDanger,
                                   formError: style.formError
                               }}
                               component={InputAuth}
                               validate={[required, maxLength15, minLength6, passwordsMatch]}
                        />
                    </div>
                </div>
                {backendErr && <div className={style.formError}>{backendErr}</div>}

                <div className={style.formRadiobar}>
                    <Field name="role" component={"input"} type="radio" value="0"/>
                    <div className={style.formRadiobar__item}>
                        <p>Join As a Buyer</p>
                        <span>I am looking for a Name, Logo or Tagline for my business, brand or product.</span>
                    </div>
                </div>

                <div className={style.formRadiobar}>
                    <Field name="role" component={"input"} type="radio" value="1"/>
                    <div className={style.formRadiobar__item}>
                        <p>Join As a Creative</p>
                        <span>I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.</span>
                    </div>
                </div>
                <div className={style.formPermissions}>
                    <Field name="employed" id="permission" component={"input"} type="checkbox"/>
                    <label>Allow Squadhelp to send marketing/promotional offers from time to time</label>
                </div>
                <div className={style.inputButton} >
                    <button
                        type="submit">
                        REGISTER
                    </button>
                </div>
            </div>
        </form>
    )
};

export default connect(null, null)( reduxForm({
    form: 'RegisterForm',
})(RegisterForm));


