import React, { Component } from 'react';
import { dataClear} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import { checkout} from '../../actions/actionCreator';
import styles from './Checkout.module.sass';
import {Container, Alert, Row, Col} from 'react-bootstrap';
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { submit } from 'redux-form'

class  nameContest extends Component {

    componentDidMount() {
        if (!this.props.contestFormData) {
            this.redirect('/');
        }
    }

    checkout = (form) => {
        let data = this.props.contestFormData;
        console.log( data.getAll('nameFile') );

        data.set('cardNumber', form.cardNumber);
        this.props.checkoutSubmit({
            data,
        });
    };

    redirect = () => {
        this.props.history.push({
            pathname: '/dashboard',
        });
        this.props.dataClear();
    };

    render() {
        const {success, error, formCheckout, history} = this.props;
        return (
            <Container>
                {success && this.redirect()}
                <Row  className={styles.payment}>
                    <Col md={6} className={styles.paymentContainer}>

                        <div className={styles.paymentContest}>
                            <CheckoutForm
                                onSubmit={this.checkout}
                            />
                            <div className={styles.total}>
                                <span>Total:</span>
                                <div className={styles.price}>
                                    <span>$</span>
                                    <span>100.00</span>
                                </div>
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={() => history.goBack()}
                                        className={[styles.paymentBtn, styles.paymentBtnBack].join(' ')}>
                                    Back
                                </button>
                                <button onClick={() => formCheckout()}
                                        className={styles.paymentBtn}>
                                    Pay Now
                                </button>
                            </div>
                            {error && <Alert variant="danger">{this.props.error}</Alert> }
                        </div>
                    </Col>
                    <Col md={6} className={styles.paymentContainer}>

                            <div className={styles.orderSummary}>
                            <span className={styles.title}>Order Summary</span>
                            <div className={styles.total}>
                                <span>Total:</span>
                                <span className={styles.price}><small>$</small>100.00</span>
                                <span>USD</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}


const mapStateToProps =(state) => {
    const {success, error, isFetching, contestFormData} = state.contestCreateReducer;
    return { contestFormData, success, error, isFetching }
};

const mapDispatchToProps =(dispatch) => ({
    dataClear: () => dispatch(dataClear()),
    formCheckout: () => dispatch(submit('checkout')),
    checkoutSubmit: (data) => dispatch(checkout(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(nameContest);



