import React, { Component } from 'react';
import '../../App.css';
import {GridLoader} from "react-spinners";
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom'
import style from "./ContestPage.module.scss";

import {getContestById} from "../../actions/actionCreator";  //updateContest
// import ContestEdit from "../../components/ContestEdit/ContestEdit";
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import Header from "../../components/Header/Header";
import moment from "moment";


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
    }

    renderBrief = (contest) => {
        const {title, tag, venture_name, naming_type, venture, target,
            preference, industry, createdAt, budget, id} = contest;
        const date = moment(createdAt).format("YYYY-MM-DD HH:mm");
        return (
            <div className={style.brief}>

                <ul>
                    <li>
                        <h5>Contest Id</h5>
                        <p>#{id}</p>
                    </li>
                    <li>
                        <h5>Contest Type</h5>
                        <p>{tag}</p>
                    </li>
                    <li>
                        <h5>Contest Title</h5>
                        <p>{title}</p>
                    </li>
                    <li>
                        <h5>What is your Business/ Brand about?</h5>
                        <p>{venture}</p>
                    </li>
                    <li>
                        <h5>Tell us about your customers</h5>
                        <p>{target}</p>
                    </li>
                    <li>
                        <h5>Type of business</h5>
                        <p>{industry}</p>
                    </li>
                    <li>
                        <h5>Preferences</h5>
                        <p>{preference}</p>
                    </li>
                    <li>
                        <h5>Created</h5>
                        <p>{moment(date).from(moment())}</p>
                    </li>
                    <li>
                        <h5>Budget</h5>
                        <p>{budget}</p>
                    </li>
                </ul>
            </div>
        );
    };



    renderCorrectBrief = (contest) => {
        if(contest) {
            return this.renderBrief(contest)

        }
    };


    renderContest = () => {
        const {isFetching, contest} = this.props;
        if(isFetching){
            return <GridLoader loading={isFetching}
                                color={'#28D2D1'}/>
        }
        else{
            if(!contests.length>0){
                return (
                    <Container>
                        <Row>Nothing found</Row>
                    </Container>
                );
            }
            return (
                <Container>
                    <Tabs defaultActiveKey="brief" id="contest-tab">
                        <Tab eventKey="brief" title="Brief">
                            {
                                this.renderCorrectBrief(contest)
                            }
                        </Tab>
                        {
                            this.renderCorrectEntries()
                        }
                    </Tabs>
                </Container>
            );
        }
    };

    renderCorrectEntries = () => {
        const {user} = this.props;
        const {type, id, Suggestions} = this.props.contest;
        console.log(this.props.contest);
        if(user){
            if(user.role === ROLES.CUSTOMER) {
                return(
                    <Tab eventKey="entries" title="Entries">
                        {
                            Suggestions.map(e => {
                                return <SingleEntry key={e.id} data={e}/>
                            })
                        }
                    </Tab>
                )
            }
            else{
                return(
                    <Tab eventKey="entrie" title="Entrie">
                        {/*<Entrie type={tag} contest_id={id} {...this.props}/>*/}
                    </Tab>
                )
            }
        }
    };





    componentDidMount() {
        const id = this.props.match.params.id;
        //this.setState({isFetching: true});
        this.props.getContestById({id:id, token:this.token});
    }

    render() {

        // return (
        //     <div className="UserProfile">
        //         contest page
        //         {this.props.error && this.redirect()}
        //         {this.props.isFetchingContest  ? this.renderLoader() : this.listEntries()}
        //     </div>
        //
        // );
        return this.renderContest();
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


