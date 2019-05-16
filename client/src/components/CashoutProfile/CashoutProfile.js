import style from "../../pages/UserProfile/UserProfile.module.scss";
import ModalSubmit from "../ModalSubmit/ModalSubmit";
import React, {useState} from "react";
import {creativeCheckout} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import styles from "../../pages/Checkout/Checkout.module.sass";
import CashoutProfileForm from "../../components/CashoutProfileForm/CashoutProfileForm";
import { Field, reduxForm, reset } from 'redux-form'


const CashoutProfile = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [formData, setFormData] = useState(null);
    const {user, creativeCheckout, editError} = props;

    const modalConfirm = (data) => {
        setFormData(data);
        setModalShow(true);
    };

    const checkoutSubmit = () => {
        const {checkoutAmount, cardNumber} = formData;
        creativeCheckout({
            checkoutAmount,
            cardNumber,
            id: user.id,
        });
        setFormData(null);
        setModalShow(false);
    };

    return (
        <div className={style.brief}>
            <div className={style.brief__wide}>
                <div>
                    <h5>Your balance</h5>
                    <div>{user.account} $</div>
                </div>
            </div>
            <div className={styles.paymentContest}>
                <CashoutProfileForm
                    onSubmit={modalConfirm}
                />
            </div>
            {editError && <div className={styles.error}>{editError}</div>}

            <ModalSubmit
                show={modalShow}
                closeModal={()=>setModalShow(false)}
                submit={checkoutSubmit}
            />
        </div>
    );
};


const mapStateToProps = (state) =>{
    const {user, editError} = state.authReducer;
    return { user, editError };
};

const mapDispatchToProps = (dispatch) => ({
    creativeCheckout: (data) => dispatch(creativeCheckout(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CashoutProfile);
