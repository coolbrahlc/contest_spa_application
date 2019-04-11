import React, { Component } from 'react';
import '../../App.css';
import {GridLoader} from "react-spinners";
import connect from "react-redux/es/connect/connect";
import style from "./ContestPage.module.scss";
import {getContestById, updateContest, setEntryWinner, rejectEntry} from "../../actions/actionCreator";  //updateContest
import SingleEntry from "../../components/SingleEntry/SingleEntry";
import {ROLE} from "../../constants/constants";
import { Container, Row } from 'react-bootstrap';
import moment from "moment";
import CreateEntry from "../../components/CreateEntry/CreateEntry";
import NameContest from "../../pages/ContestTypes/NameContest";
import LogoContest from "../../pages/ContestTypes/LogoContest";
import TaglineContest from "../../pages/ContestTypes/TaglineContest";

const formNames = {
    Name: NameContest,
    Logo: LogoContest,
    Tagline: TaglineContest,
};

class  ContestPage extends Component {

    constructor(props) {
        super(props);
        this.state= {
            editMode: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getContestById({id:id});
    }

    redirect =  () => {
        this.props.history.replace({
            pathname: '/login',
        })
    };

    changeMode =  () => {
        this.setState({
            editMode: !this.state.edgeMode
        })
    };

    update = (data) => {
        this.props.updateContest(data);
        this.setState({
            editMode :false
        })
    };

    renderEdit =  () => {
        const {type} = this.props.contest;
        const Component =formNames[type];

        if (!Component) {
            return null
        }
        return <Component
            contestsToInsert = {[type]}
            dataContest = {this.props.contest}
            editMode = {true}
            update = {this.update}
            contest = {this.props.contest}
            {...this.props}
        />;

    };

    renderBrief = (contest) => {
        const {name, type, venture_name, target_customer,
            preference, industry, created_at, prize_pool, id} = contest;
        const date = moment(created_at).format("YYYY-MM-DD HH:mm");
        return (
            <div className={style.brief}>

                <div onClick={()=>this.changeMode()}>EDIT</div>
                {this.state.editMode && this.renderEdit()}

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
        const {id, type, Suggestions, is_active} = this.props.contest;
        if(user){
            if(user.role === ROLE.CUSTOMER) {
                return(
                    <div >
                        {
                            Suggestions.map(e => {
                                return <SingleEntry key={e.id} data={e}
                                                    reject = {this.props.rejectEntry}
                                                    win = {this.props.setEntryWinner}
                                                    contestId = {id}
                                                    isActiveContest = {is_active}
                                                    customerId = {user.id}
                                />
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
            return (
                <div className={style.loader}>
                    <GridLoader loading={isFetchingContest}
                                color={'#28D2D1'}
                                height={320} width={320}
                    />
                </div>
            )
        }
        else{
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
        if(!this.props.contest){
            return (
                <Container>
                    <Row>Nothing found</Row>
                </Container>
            );
        } else {
            return this.renderContest();
        }
    }
}

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    const {contest, isFetchingContest, error, preferences} = state.customerContestsReducer;
    return {error, contest, isFetchingContest, preferences, user};
};

const mapDispatchToProps = (dispatch) => ({
    setEntryWinner: (data) => dispatch(setEntryWinner(data)),
    rejectEntry: (data) => dispatch(rejectEntry(data)),
    getContestById: (id) => dispatch(getContestById(id)),
    updateContest: (data) => dispatch(updateContest(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);


