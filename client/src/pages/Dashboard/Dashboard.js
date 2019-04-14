import React, { Component } from 'react';
//import {GridLoader} from "react-spinners";
import connect from "react-redux/es/connect/connect";
//import {Link} from "react-router-dom";
import { getCustomerContests} from '../../actions/actionCreator';
import {ROLE} from "../../constants/constants";
import CustomerDashboard from "../../components/CustomerDashboard/CustomerDashobard";
import CreativeDashboard from "../../components/CreativeDashboard/CreativeDashboard";
import { Container, Row } from 'react-bootstrap';


class  Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state= {
            contests: ''
        }
    }

    componentDidMount() {
        const {user} = this.props;
        if(user) {
            this.props.getContests({ params: {} });
        }
    }

    renderDashboardHeader(){
        const {user} = this.props;
        if(user) {
            return (
                <div className={"style.header"}>
                    <Container>
                        <Row>Your dashboard, {user.full_name}</Row>
                    </Container>
                </div>
            );
        }
    }

    renderContests(){
        const {user} = this.props;
        if(user) {
            if (user.role === ROLE.CUSTOMER) {
                return <CustomerDashboard {...this.props}/>
            } else if (user.role === ROLE.CREATIVE) {
                return <CreativeDashboard {...this.props}/>
            }
        }
    }

    renderDashboard () {
        return (
            <>
                {
                    this.renderDashboardHeader()
                }
                {
                    this.renderContests()
                }
            </>
        );
    }

    render() {
        return (
            <>
                {
                    this.renderDashboard()
                }
            </>
        );
    }

}


const mapStateToProps =(state) => {
    const {user} = state.authReducer;
    const {contests, isFetching} =  state.customerContestsReducer;
    return {contests, isFetching, user};
};

const mapDispatchToProps =(dispatch) => ({
    getContests: (data) => dispatch(getCustomerContests(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



