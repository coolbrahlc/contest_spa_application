import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { getCustomerContests, getFilteredContests} from '../../actions/actionCreator';
//import {ROLE} from "../../constants/constants";
import CustomerDashboard from "../../components/CustomerDashboard/CustomerDashobard";
//import CreativeDashboard from "../../components/CreativeDashboard/CreativeDashboard";
import { Container, Row } from 'react-bootstrap';


class  Dashboard extends Component {


    render() {
        const {user} = this.props;
        if(user) {
            return (
                <>
                    <div className={"style.header"}>
                        <Container>
                            <Row>Your dashboard, {user.full_name}</Row>
                        </Container>
                    </div>
                    <CustomerDashboard {...this.props}/>
                </>
            );
        } else {
            return (
                <div className={"style.header"}>
                    <Container>
                        <Row>Not fount</Row>
                    </Container>
                </div>
            )
        }
    }
}


const mapStateToProps =(state) => {
    const {user} = state.authReducer;
    const {contests, isFetching} =  state.customerContestsReducer;
    return {contests, isFetching, user};
};

const mapDispatchToProps =(dispatch) => ({
    getContests: (data) => dispatch(getCustomerContests(data)),
    getFilteredContests: (data) => dispatch(getFilteredContests(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



