import React from 'react';
import connect from "react-redux/es/connect/connect";
import {GridLoader} from "react-spinners";
import { Field, reduxForm } from 'redux-form'
import {InputProfileCardEdit, } from "../Inputs/InputProfileEdit";
import styles from "../../pages/Checkout/Checkout.module.sass";

const validate = (values) =>  {
    let errors = {};
    if (!values.cardNumber) {
        errors.cardNumber = 'Required!';
    } else if (values.cardNumber.length<19) {
        errors.cardNumber = 'Too short card number!';
    }

    if (!values.code) {
        errors.code = 'Required!';
    } else if (values.code.trim().length<3) {
        errors.code = 'Too short code number!';
    }

    if (!values.date) {
        errors.date = 'Required!';
    }  else if (values.date.trim().length<7) {
        errors.date = 'Too short date!';
    }

    return errors;
};

const CheckoutForm = (props) => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit} >

            <div className={styles.paymentInput}>
                <span className={styles.title}>Card Number</span>
                <Field type={"text"}
                       placeholder={"Card Number"}
                       name={"cardNumber"}
                       mask={"9999 9999 9999 9999"} maskChar={null}
                       component={InputProfileCardEdit}
                />
            </div>
            <div className={styles.paymentDateSecCode}>
                <div className={styles.paymentInput}>
                    <span className={styles.title}>* Expires</span>
                    <Field type={"text"}
                           placeholder={"MM / YY"}
                           name={"date"}
                           mask={"99/9999"} maskChar={' '}
                           component={InputProfileCardEdit}
                    />
                </div>
                <div className={styles.paymentInput}>
                    <span className={styles.title}>* Security Code</span>
                    <Field type={"text"}
                           placeholder={"cvc"}
                           name={"code"}
                           mask={"999"} maskChar={' '}
                           component={InputProfileCardEdit}
                    />
                </div>
            </div>
        </form>
    )
};


const mapStateToProps = (state) =>{
    const {user } = state.authReducer;
    return { user };
};

export default connect(mapStateToProps, null)( reduxForm({
    form: 'checkout',
    validate
})(CheckoutForm));


