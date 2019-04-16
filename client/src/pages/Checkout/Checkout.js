import React, { Component } from 'react';
//import {GridLoader} from "react-spinners";
import { dataClear} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import { checkout} from '../../actions/actionCreator';
import styles from './Checkout.module.sass';
import {Container, Alert, Row, Col} from 'react-bootstrap';
import InputMask from 'react-input-mask';
import {cardSchema} from "../../utils/validation";


class  nameContest extends Component {

    constructor(props) {
        super(props);

        this.state= {
            cardNumber: '',
            date: '',
            code: '',
        }
    }

    componentDidMount() {
        if (!this.props.contestFormData) {
            this.redirect('/')
        }
    }

    checkout = () => {
        let data = this.props.contestFormData;
        data.set('cardNumber', this.state.cardNumber);
        this.props.checkoutSubmit({
            data,
            token: this.token,
        });
    };

    redirect = (route) => {
        this.props.history.push({
            pathname: route,
        });
    };

    handlePrevClick = () => {
        this.props.history.goBack();
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            [`${name}Error`]: null
        });
    };

    getErrorsFromValidationError = (validationError) => {
        const FIRST_ERROR = 0;
        return validationError.inner.reduce((errors, error) => {
            return {
                ...errors,
                [`${error.path}Error`]: error.errors[FIRST_ERROR],
            }
        }, {})
    };

    onClickNext = async () => {
        try {
            const valid = await cardSchema.validate(this.state, { abortEarly: false });
            if (valid) {
                this.checkout();
            }
        } catch (e) {
            const errObj = this.getErrorsFromValidationError(e);
            this.setState(errObj);
        }
    };


    render() {
        const {success, isFetching, error} = this.props;
        const {cardNumberError, dateError, codeError} = this.state;

        return (
            <Container>
                {success && this.redirect('/dashboard')}
                <Row  className={styles.payment}>
                    <Col md={6} className={styles.paymentContainer}>

                        <div className={styles.paymentContest}>
                            <div className={styles.paymentInput}>
                                <span className={styles.title}>Card Number</span>
                                <InputMask placeholder="Card Number"
                                           name="cardNumber"
                                           mask="9999 9999 9999 9999" maskChar={null}
                                           onChange={(e) => this.handleInputChange(e)}
                                />
                                {cardNumberError && <div className={styles.error}>{cardNumberError}</div>}

                            </div>
                            <div className={styles.paymentDateSecCode}>

                                <div className={styles.paymentInput}>
                                    <span className={styles.title}>* Expires</span>
                                    <InputMask placeholder="MM / YY"
                                               name="date"
                                               mask="99/9999" maskChar=' '
                                               onChange={(e) => this.handleInputChange(e)}
                                    />
                                    {dateError && <div className={styles.error}>{dateError}</div>}


                                </div>

                                <div className={styles.paymentInput}>
                                    <span className={styles.title}>* Security Code</span>
                                    <InputMask placeholder="cvc"
                                               name="code"
                                               mask="999" maskChar=' '
                                               onChange={(e) => this.handleInputChange(e)}
                                    />
                                    {codeError && <div className={styles.error}>{codeError}</div>}

                                </div>

                            </div>
                            <div className={styles.total}>
                                <span>Total:</span>
                                <div className={styles.price}>
                                    <span>$</span>
                                    <span>100.00</span>
                                </div>
                            </div>
                            <div>
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={this.handlePrevClick}
                                        className={[styles.paymentBtn, styles.paymentBtnBack].join(' ')}>
                                    Back
                                </button>
                                <button onClick={this.onClickNext}
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
    const {contestFormData} = state.testReducer;
    const {success, error, isFetching} = state.testReducer;
    return { contestFormData, success, error, isFetching }
};

const mapDispatchToProps =(dispatch) => ({
    dataClear: () => dispatch(dataClear()),
    checkoutSubmit: (data) => dispatch(checkout(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(nameContest);



