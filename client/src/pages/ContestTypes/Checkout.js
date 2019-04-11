import React, { Component } from 'react';
import {GridLoader} from "react-spinners";
import {getUserProfile, dataClear} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import {tokenAction, checkout} from '../../actions/actionCreator';


class  nameContest extends Component {

    constructor(props) {
        super(props);
        this.token = localStorage.getItem('token');

        this.state= {
            cardNumber: '',
        }
    }

    componentDidMount() {
        console.log(this.props.contestFormData, 'MY VALUES')

    }

    checkout = () => {
        let data = this.props.contestFormData;
        data.set('cardNumber',this.state.cardNumber);
        this.props.checkoutSubmit({
            data,
            token: this.token,
        });
        this.props.dataClear();
    };

    handleInputChange = (event) => {
        this.setState({
            cardNumber: event.target.value
        });
    };

    redirect = () => {
        this.props.history.push({
            pathname: '/dashboard',
        });
    };


    render() {

        const {success, isFetching, error} = this.props;
        return (
            <div>
                <input type='text' value={this.state.cardNumber} onChange={this.handleInputChange}/>

                <div onClick={this.checkout}>CHECKOUT BUTTON</div>

                {error && <div>{this.props.error}</div>}

                {success && this.redirect()}

                {isFetching && <GridLoader loading={isFetching}
                                           sizeUnit={"px"}
                                           size={40 }
                                           color={'#28D2D1'}/>}

            </div>
        )
    }
}


const mapStateToProps =(state) => {
    const {contestFormData} = state.testReducer;
    const {success, error, isFetching} = state.checkoutReducer;
    return { contestFormData, success, error, isFetching }
};

const mapDispatchToProps =(dispatch) => ({
    dataClear: () => dispatch(dataClear()),
    checkoutSubmit: (data) => dispatch(checkout(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(nameContest);



