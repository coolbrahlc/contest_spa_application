import React from 'react';
import connect from "react-redux/es/connect/connect";
import style from "../../pages/UserProfile/UserProfile.module.scss";
import {GridLoader} from "react-spinners";
import { Field, reduxForm, reset } from 'redux-form'
import {InputProfileEdit} from "../Inputs/InputProfileEdit";
import {InputProfileCardEdit} from "../Inputs/InputProfileEdit";

const validate = values => {
    const errors = {};
    if (!values.cardNumber) {
        errors.cardNumber = 'Required!';
    } else if (values.cardNumber.length<19) {
        errors.cardNumber = 'Too short card number!';
    }
    if (values.checkoutAmount<=0) {
        errors.checkoutAmount = 'Must be positive';
    }
    if (!values.checkoutAmount) {
        errors.checkoutAmount = 'Required!';
    }
    return errors;
};

const CashoutProfileForm = (props) => {

    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit} >
            <div className={style.newInput}>
                <span className={style.title}>Amount</span>

                <Field type={"number"}
                       placeholder={"Amount"}
                       name={"checkoutAmount"}
                       component={InputProfileEdit}
                />
            </div>
            <div className={style.newInput}>
                <span className={style.title}>Card Number</span>
                <Field type={"text"}
                       placeholder={"Card Number"}
                       name={"cardNumber"}
                       mask={"9999 9999 9999 9999"} maskChar={null}
                       component={InputProfileCardEdit}
                />
            </div>
            <button className={"btn btn-primary"}>Cashout</button>
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
    form: 'cashoutProfile',
    validate
})(CashoutProfileForm));


