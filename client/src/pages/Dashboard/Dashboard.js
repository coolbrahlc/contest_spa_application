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
        // this.token = localStorage.getItem('token');
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
        //console.log(user);
        if(user) {
            return (
                <div className={"style.header"}>
                    <Container>
                        <Row>{user.full_name}</Row>
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

    // handleInputChange = (event) => {
    //
    //     this.setState({
    //         currentSelection: event.target.value
    //     });
    // };


    render() {
        return (
            <>
                {
                    this.renderDashboard()
                }
            </>
        );
    }

/*
    render() {
        return (
            <div>
                DASHBOARD
                <div onClick={this.clickHandlerAll}>All</div>
                <divonClick={this.clickHandlerActive}>Active Contests</div>
                <div onClick={this.clickHandlerCompleted}>Completed contests</div>
                <div onClick={this.clickHandlerInactive}>Inactive contests</div>
                {!this.props.isFetching && this.listContests()}
                {/!*{!this.props.checkoutReducer.success && <div>{this.props.checkoutReducer.error}</div>}*!/}
            </div>
        )
    }
*/

}


const mapStateToProps =(state) => {
    const {user} = state.authReducer;
    const {contests, isFetching} =  state.customerContestsReducer;
    return {contests, isFetching, user};
};

const mapDispatchToProps =(dispatch) => ({
    getContests: (data) => dispatch(getCustomerContests(data)),
    //getAllContests: (data) => dispatch(getAllContests(data))

});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



