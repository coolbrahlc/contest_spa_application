import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import {GridLoader} from "react-spinners";
import {setContestOrder, getSelects} from "../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import Header from "../components/Header/Header";

class  CreateContest extends Component {

    constructor(props) {
        super(props);
        this.state= {
            contestsToInsert: []
        }
    }

    componentDidMount() {
        this.props.getSelects();
        this.setState({isFetching: true});
    }

    setContestOrder =  (arr) => {
        this.props.setContestOrder(arr);
        this.props.history.push({
            pathname: '/'+arr[0],
            // state: {
            //     contestsToInsert: arr,
            // }
        })
    };


    render() {
        return (

            <div className="Users">
                <Header {...this.props}/>
                <div onClick={ () =>{this.setContestOrder(['name']) }}>Name </div>
                <div onClick={ () =>{this.setContestOrder(['tagline']) }}>Tagline </div>
                <div onClick={ () =>{this.setContestOrder(['logo']) }}>Logo</div>
                <div onClick={ () =>{this.setContestOrder(['name', 'tagline']) }}>Name + Tagline </div>
                <div onClick={ () =>{this.setContestOrder(['name', 'logo']) }}>Name + Logo </div>
                <div onClick={ () =>{this.setContestOrder(['tagline', 'logo']) }}>Tagline + Logo</div>
                <div onClick={ () =>{this.setContestOrder(['name', 'tagline', 'logo']) }}>Name + Tagline + Logo</div>
            </div>
        );
    }

}


const mapStateToProps =(state) => {
    return {
        isFetchingUser: state.testReducer.isFetchingUser,
        user: state.testReducer.user
    }
};

const mapDispatchToProps =(dispatch) => ({
    setContestOrder: (arr) => dispatch(setContestOrder(arr)),
    getSelects: () => dispatch(getSelects())

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateContest);


