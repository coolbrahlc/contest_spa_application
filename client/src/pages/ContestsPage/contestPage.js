import React, { Component } from 'react';
import '../../App.css';
import {GridLoader} from "react-spinners";
import connect from "react-redux/es/connect/connect";
import style from "./ContestPage.module.scss";
import {getContestById, updateContest, setEntryWinner, rejectEntry} from "../../actions/actionCreator";  //updateContest
import SingleEntry from "../../components/SingleEntry/SingleEntry";
import {ROLE} from "../../constants/constants";
import { Container, Row, Col } from 'react-bootstrap';
import moment from "moment";
import CreateEntry from "../../components/CreateEntry/CreateEntry";
import Header from "../../components/Header/Header";
import NameContest from "../ContestType/contestType";
import {publicURL} from "../../api/baseURL";
import SidebarRight from "../../components/SidebarRight/SidebarRight";


class  ContestPage extends Component {

    constructor(props) {
        super(props);
        this.state= {
            editMode: false,
            sideMenuStatus: false,
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getContestById({id:id});
    }


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

        return <NameContest
            type = {type}
            contestsToInsert = {[type]}
            dataContest = {this.props.contest}
            editMode = {true}
            update = {this.update}
            contest = {this.props.contest}
            {...this.props}
        />;

    };

    renderEditButton = () => {
        const {user} = this.props;
        if (this.state.editMode) {
            return this.renderEdit()
        } else {
            if(user.role === ROLE.CUSTOMER) {
                return (
                    <div className={style.link+' '+"float-right"}
                         onClick={()=>this.changeMode()}>EDIT CONTEST
                    </div>
                )}
        }
    };

    renderImage = (file) => {

        if(file) {
            return <div className={style.photo}><img src={`${publicURL}${file}`} alt="contestPic" className="img-fluid"/></div>
        }
    };


    renderBrief = (contest) => {
        const {name, type, file, venture_name, target_customer, type_of_title,
            preferences, industry, created_at, prize_pool, id, is_active} = contest;
        const {editMode} = this.state;

        const date = moment(created_at).format("YYYY-MM-DD HH:mm");
        return (
            <div className={style.brief}>
                {
                   this.renderEditButton()
                }
                {!editMode &&
                <>
                    <ul>
                        {
                            this.renderStatus(is_active)
                        }
                        <div >#{id}</div>
                        <div>Created {moment(date).from(moment())}</div>

                        <li className={style.brief__thin}>
                            <h5>Contest name</h5>

                            <p>{name}</p>
                        </li>
                        <li className={style.brief__thin}>
                            <h5>Contest type</h5>
                            <p>{type}</p>
                        </li>
                        {
                            type_of_title &&
                            <li className={style.brief__thin}>
                                <h5>Type of name</h5>
                                <p>{type_of_title}</p>
                            </li>
                        }
                        {
                            venture_name &&
                            <li className={style.brief__thin}>
                                <h5>Venture name</h5>
                                <p>{venture_name}</p>
                            </li>
                        }
                        <li className={style.brief__thin}>
                            <h5>Industry</h5>
                            <p>{industry}</p>
                        </li>
                        <li className={style.brief__thin}>
                            <h5>Preferences</h5>
                            <p>{preferences}</p>
                        </li>
                        <li className={style.brief__thick}>
                            <h5>Target customers</h5>
                            <p>{target_customer}</p>
                        </li>
                        <li className={style.brief__thick}>
                            <h5 className={style.brief__thick}>Description</h5>
                            <p>{venture_name}</p>
                        </li>
                        <li className={style.brief__thin}>
                            <h5>Budget</h5>
                            <p>{prize_pool} $</p>
                        </li>
                        <li className={style.brief__thin}>
                            {(type === 'Logo')?
                                this.renderImage(file) :

                                <h5 className={style.brief__thick}>
                                    <a href={publicURL + file}>{file}</a>
                                </h5>
                            }

                        </li>
                    </ul>
                </>}

            </div>
        );
    };


    renderEntries = () => {
        const {user} = this.props;
        const {id, type, Suggestions, is_active} = this.props.contest;

        if(user){
            if(user.role === ROLE.CUSTOMER) {
                return(
                    <div className={style.entryContainer}>
                    {
                            Suggestions.map(e => {
                                return <SingleEntry key={e.id} data={e}
                                                    reject = {this.props.rejectEntry}
                                                    win = {this.props.setEntryWinner}
                                                    contestId = {id}
                                                    isActiveContest = {is_active}
                                                    customerId = {user.id}
                                                    role = {user.role}
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
                        <CreateEntry type={type} contestId={id} user ={user} {...this.props}/>
                        <div>My entries:</div>
                        <div className={style.entryContainer}>
                            {
                                Suggestions.filter(s => (s.user_id === user.id)).map(e => {
                                    return <SingleEntry key={e.id} data={e}
                                                        reject = {this.props.rejectEntry}
                                                        win = {this.props.setEntryWinner}
                                                        contestId = {id}
                                                        isActiveContest = {is_active}
                                                        customerId = {user.id}
                                                        role = {user.role}
                                    />
                                })
                            }
                        </div>
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
                <div className={style.container}>
                    <Row>
                        <Col className={style.contestContainer} md={{ span: 8, offset: 2 }}>
                            {
                                this.renderBrief(contest)
                            }

                            {/*<SidebarRight contestData={contest} totalEntries={contest.entriesCount}/>*/}


                            {
                                this.renderEntries()
                            }
                        </Col>
                    </Row>

                </div>
            );
        }
    };

    renderStatus = (is_active) =>{
        let status = "inactive";
        let danger = style.danger_red;
        if(is_active){
            status = "active";
            danger = style.danger_green;
        }
        return (
            <p className={danger}>
                <i className="fas fa-check-circle"/>
                {status}
            </p>
        );
    }


    render() {
        const {sideMenuStatus} = this.state;
        if(!this.props.contest){
            return (
                <Container>
                    <Row>Nothing found</Row>
                </Container>
            );
        } else {
            console.log(this.props.contest)
            return (
                <Row className={style.fullHeight}>
                    {/*<Col md={"auto"} className={style.clearRight}>*/}
                    {/*    <Sidebar //filterListener={this.getFilterData}*/}
                    {/*             opened={sideMenuStatus}*/}
                    {/*             toggleSideMenu={this.toggleSideMenu}*/}
                    {/*             {...this.props}/>*/}
                    {/*</Col>*/}
                    <Col className={style.clearLeft} >
                        <Header toggleSideMenu={this.toggleSideMenu} {...this.props}/>

                        <div className={style.content}>
                            {
                                this.renderContest()
                            }
                        </div>
                    </Col>
                </Row>
            );
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


