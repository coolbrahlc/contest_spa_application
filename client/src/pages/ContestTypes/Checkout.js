import React, { Component } from 'react';
import {GridLoader} from "react-spinners";
import { dataClear} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import { checkout} from '../../actions/actionCreator';


class  nameContest extends Component {

    constructor(props) {
        super(props);
        this.token = localStorage.getItem('token');

        this.state= {
            cardNumber: '',
        }
    }

    componentDidMount() {
        if (!this.props.contestFormData) {
            this.redirect('/')
        }
    }

    checkout = () => {
        let data = this.props.contestFormData;
        if (data) {
            console.log(123)
        }
        data.set('cardNumber',this.state.cardNumber);
        this.props.checkoutSubmit({
            data,
            token: this.token,
        });
    };

    handleInputChange = (event) => {
        this.setState({
            cardNumber: event.target.value
        });
    };

    redirect = (route) => {
        this.props.history.push({
            pathname: route,
        });
    };


    render() {

        const {success, isFetching, error} = this.props;
        return (
            <div>
                <input type='text' value={this.state.cardNumber} onChange={this.handleInputChange}/>

                <div onClick={this.checkout}>CHECKOUT BUTTON</div>

                {error && <div>{this.props.error}</div>}

                {success && this.redirect('/dashboard')}

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
    const {success, error, isFetching} = state.testReducer;
    return { contestFormData, success, error, isFetching }
};

const mapDispatchToProps =(dispatch) => ({
    dataClear: () => dispatch(dataClear()),
    checkoutSubmit: (data) => dispatch(checkout(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(nameContest);



