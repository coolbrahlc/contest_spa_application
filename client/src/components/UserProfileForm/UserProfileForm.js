import React from 'react';
import connect from "react-redux/es/connect/connect";
import style from "../../pages/UserProfile/UserProfile.module.scss";
import {GridLoader} from "react-spinners";
import { Field, reduxForm } from 'redux-form'
import {InputProfileEdit} from "../Inputs/InputProfileEdit";
import {InputImgField} from "../../components/InputFileField/InputFileField";
import {maxLength15, required, email} from "../../utils/validation";


const UserProfileForm = (props) => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit} >
            <div className={style.newInput}>
                <span className={style.title}>Full name</span>
                <Field type={"text"}
                       placeholder={"Full name"}
                       name={"fullName"}
                       component={InputProfileEdit}
                       validate={[required, maxLength15]}
                />
            </div>
            <div className={style.newInput}>
                <span className={style.title}>Email</span>
                <Field type={"text"}
                       placeholder={"Email"}
                       name={"email"}
                       component={InputProfileEdit}
                       validate={[required, email]}
                />
            </div>
            <div className={"mb-3"}>
                <div className={style.titleFile}>Profile picture</div>
                <Field type={"file"}
                       placeholder={"Profile picture"}
                       name={"profilePic"}
                       component={InputImgField}
                />
            </div>
            <button className={"btn btn-primary"}>Edit</button>
        </form>
    )
};


const mapStateToProps = (state) =>{
    const {user, } = state.authReducer;
    const initialValues= {
        fullName: user.full_name,
        email: user.email,
    };
    return { initialValues };
};

export default connect(mapStateToProps, null)( reduxForm({
    form: 'userProfile',
})(UserProfileForm));


