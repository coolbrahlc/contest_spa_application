import React, { Component } from 'react';
import {GridLoader} from "react-spinners";
import {getUserProfile, setContestOrder} from "../../actions/actionCreator";
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
    };

    handleInputChange = (event) => {
        this.setState({
            cardNumber: event.target.value
        });
    };


    render() {
        // console.log(this.props);
        // if (!this.isLoginned) {
        //     return <Redirect to='/login'/>
        // }

        return (
            <div>
                <input type='text' value={this.state.cardNumber} onChange={this.handleInputChange}/>

                <div onClick={this.checkout}>CHECKOUT BUTTON</div>

                {!this.props.success && <div>{this.props.error}</div>}

            </div>
        )
    }
}


const mapStateToProps =(state) => {
    const {contestFormData} = state.testReducer;
    const {success, error} = state.checkoutReducer;
    return { contestFormData, success, error }
};

const mapDispatchToProps =(dispatch) => ({
    setContestOrder: (arr) => dispatch(setContestOrder(arr)),
    checkoutSubmit: (data) => dispatch(checkout(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(nameContest);



