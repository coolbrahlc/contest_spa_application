import React, { Component } from 'react';
import '../../App.css';
import {GridLoader} from "react-spinners";
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom'
import style from "./ContestPage.module.scss";
import {getContestById} from "../../actions/actionCreator";  //updateContest
import SingleEntry from "../../components/SingleEntry/SingleEntry";
import {ROLE} from "../../constants/constants";
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import Header from "../../components/Header/Header";
import moment from "moment";
import CreateEntry from "../../components/CreateEntry/CreateEntry";


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

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getContestById({id:id, token:this.token});
    }

    redirect =  () => {
        this.props.history.replace({
            pathname: '/login',
        })
    };

    renderBrief = (contest) => {
        const {name, type, venture_name, target_customer,
            preference, industry, created_at, prize_pool, id} = contest;
        const date = moment(created_at).format("YYYY-MM-DD HH:mm");
        return (
            <div className={style.brief}>

                <ul>
                    <li>
                        <h5>Contest Id</h5>
                        <p>#{id}</p>
                    </li>
                    <li>
                        <h5>Contest Type</h5>
                        <p>{type}</p>
                    </li>
                    <li>
                        <h5>Contest Title</h5>
                        <p>{name}</p>
                    </li>
                    <li>
                        <h5>What is your Business/ Brand about?</h5>
                        <p>{venture_name}</p>
                    </li>
                    <li>
                        <h5>Tell us about your customers</h5>
                        <p>{target_customer}</p>
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
                        <h5>Prize poll</h5>
                        <p>{prize_pool}</p>
                    </li>
                </ul>
            </div>
        );
    };

    renderEntries = () => {
        const {user} = this.props;
        const {id, type, Suggestions} = this.props.contest;
        if(user){
            if(user.role === ROLE.CUSTOMER) {
                return(
                    <div >
                        {
                            Suggestions.map(e => {
                                return <SingleEntry key={e.id} data={e}/>
                            })
                        }
                    </div>
                )
            }
            else{
                return(
                    <div>
                        Click here to add your entry
                        <CreateEntry type={type} contest_id={id} {...this.props}/>
                    </div>
                )
            }
        }
    };

    renderContest = () => {
        const {isFetchingContest, contest} = this.props;
        if(isFetchingContest){
            return <GridLoader loading={isFetchingContest}
                               sizeUnit={"px"}
                               size={40 }
                               color={'#28D2D1'}/>
        }
        else{
            if(!contest){
                return (
                    <Container>
                        <Row>Nothing found</Row>
                    </Container>
                );
            }
            return (
                <Container>
                    <div>
                        <div>
                            { this.renderBrief(contest) }
                        </div>
                        { this.renderEntries() }
                    </div>
                </Container>
            );
        }
    };

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

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    const {contest, isFetchingContest, error, preferences} = state.customerContestsReducer;
    return {error, contest, isFetchingContest, preferences, user};
};

const mapDispatchToProps = (dispatch) => ({
    getContestById: (id) => dispatch(getContestById(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);


