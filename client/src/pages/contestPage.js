import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import {GridLoader} from "react-spinners";
import {getContestById} from "../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom'

class  ContestPage extends Component {

    constructor(props) {
        super(props);
        this.token = localStorage.getItem('token');


        this.state= {
            selectValues: ['Active', 'Finished', 'All'],
            currentSelection: 'All',
            contests: ''
        }
    }

    renderLoader() {
        return (<GridLoader
            sizeUnit={"px"}
            size={40 }
            color={'#123abc'}
            loading={this.props.isFetchingContest}
        />);
    }

    redirect =  () => {
        this.props.history.replace({
            pathname: '/login',
        })
    };

    listEntries() {

        if (this.props.contest) {
            let suggestions = this.props.contest.Suggestions;
            return suggestions.map(s =>
                <li
                    key={s.id}>
                    <div>
                        {JSON.stringify(s)}
                    </div>
                </li>
            )
        }

        // const listItems = this.props.customerContests.contest.Suggestions.map((suggestion) =>
        //     <li
        //         key={suggestion.id}>
        //         <div>
        //             {JSON.stringify(suggestion)}
        //         </div>
        //     </li>
        // );
        //
        // return (
        //     <ul>{listItems}</ul>
        // );
    }



    componentDidMount() {
        const id = this.props.match.params.id;
        //this.setState({isFetching: true});
        this.props.getContestById({id:id, token:this.token});
    }

    render() {

        return (
            <div className="UserProfile">
                contest page
                {this.props.error && this.redirect()}
                {this.props.isFetchingContest  ? this.renderLoader() : this.listEntries()}
            </div>

        );
    }

}


const mapStateToProps =(state) => {
    return {
        //isFetchingUser: state.CustomerCO.isFetchingUser,
        //user: state.testReducer.user.
        isFetchingContest: state.customerContestsReducer.isFetchingContest,
        error: state.customerContestsReducer.error,

        contest: state.customerContestsReducer.contest
    }
};

const mapDispatchToProps =(dispatch) => ({
    getContestById: (data) => dispatch(getContestById(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);


