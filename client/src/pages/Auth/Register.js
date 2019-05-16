import React, { Component } from 'react';
import '../../App.css';
import connect from "react-redux/es/connect/connect";
import {Formik} from "formik";
import {register} from "../../actions/actionCreator";
import style from "./Register.module.scss";
import Logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import RegisterForm from "../../components/RegisterForm/RegisterForm";


class  Register extends Component {

    componentDidMount() {
        if (this.props.user) {
            this.props.history.push({
                pathname: '/',
            })
        }
    }

    registerSuccess =  () => {
        this.props.history.push({
            pathname: '/',
        })
    };

    render() {
        const {error, register, user} = this.props;
        return (
            <div className={style.container}>
                <Container>
                    <Row className={style.container__header}>
                        <Link to={"/"}>
                            <img src={Logo} alt={"Logo"}/>
                        </Link>
                        <Link to={"/login"} className={style.link}>Login</Link>
                    </Row>
                    <Row>
                        <Col md={{ span: 6, offset: 3}} className={style.container__subcontainer}>
                            <div className={style.container__subcontainer}>
                                <p className={style.container__info}>CREATE AN ACCOUNT</p>
                                <p className={style.container__subinfo}>We always keep your name and email address private.</p>
                                <RegisterForm
                                    onSubmit={ data => register(data) }
                                    backendErr={error}
                                />
                                {user && this.registerSuccess()}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps =(state) => {
    let {error, user} = state.authReducer;
    return {error, user}
};

const mapDispatchToProps =(dispatch) => ({
    register: (data) => dispatch(register(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);


