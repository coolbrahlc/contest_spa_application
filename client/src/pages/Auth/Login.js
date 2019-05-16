import React, { Component } from 'react';
import '../../App.css';
import {login} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import { Formik } from 'formik';
import style from "./Login.module.scss";
import Logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from "../../components/LoginForm/LoginForm";

class  Login extends Component {

    componentDidMount() {
        if (this.props.user) {
            this.props.history.push({
                pathname: '/',
            })
        }
    }

    loginUser = (values) => {
        this.props.login(values);
    };

    loginSuccess =  () => {
        this.props.history.push({
            pathname: '/',
        })
    };

    render() {
        return(
            <div className={style.container}>
                <Container>
                    <Row className={style.container__header}>
                        <Link to={"/"}>
                            <img src={Logo} alt={"Logo"}/>
                        </Link>
                        <Link to={"/register"} className={style.link}>Register</Link>
                    </Row>
                    <Row>
                        <Col md={{ span: 6, offset: 3}} className={style.container__subcontainer}>
                            <p className={style.container__info}>
                                LOGIN TO YOUR ACCOUNT
                            </p>
                            <div>
                                <LoginForm
                                    onSubmit={this.loginUser}
                                    backendErr={this.props.error}
                                />
                                {this.props.user && this.loginSuccess()}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps =(state) => {
    let {isFetching, error, user} = state.authReducer;
    return {isFetching, error, user}
};

const mapDispatchToProps =(dispatch) => ({
    login: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);


