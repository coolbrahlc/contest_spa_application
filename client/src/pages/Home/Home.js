import React, {Component} from "react";
import {Link} from "react-router-dom";
import style from "./Home.module.scss";
import { connect } from "react-redux";
import { Container, Row, Col, Navbar, Nav, Dropdown } from 'react-bootstrap';
import {logout, auth} from "../../actions/actionCreator";
import Header from "../../components/Header/Header";

class Home extends Component{

    render() {
        return(
            <div>            <Header {...this.props}/>
            222222222222
            </div>


        );
    }
}

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    return {user};
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    auth: () => dispatch(auth())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
