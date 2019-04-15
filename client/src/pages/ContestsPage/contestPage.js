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

    renderBrief = (contest) => {
        const {name, type, file, venture_name, target_customer, type_of_title,
            preference, industry, created_at, prize_pool, id} = contest;

        const date = moment(created_at).format("YYYY-MM-DD HH:mm");
        return (
            <div className={style.brief}>
                {
                   this.renderEditButton()
                }
                <ul>
                    <li className={style.brief__thin}>
                        <p>{name}</p>
                        <span>#{id}</span>
                    </li>
                    <li className={style.brief__thin}>
                        <p>{type}</p>
                        <span>{moment(date).from(moment())}</span>
                    </li>
                    {
                       type_of_title &&
                       <li className={style.brief__thin}>
                           <p>{type_of_title}</p>
                       </li>
                    }
                    {
                        venture_name &&
                        <li className={style.brief__thin}>
                            <p>{venture_name}</p>
                        </li>
                    }
                    <li className={style.brief__thin}>
                        <p>{industry}</p>
                    </li>
                    <li className={style.brief__thin}>
                        <h5>Preferences</h5>
                        <p>{preference}</p>
                    </li>
                    <li className={style.brief__thick}>
                        <h5>Target customers</h5>
                        <p>{target_customer}</p>
                    </li>
                    <li className={style.brief__thick}>
                        <h5 className={style.brief__thick}>Description</h5>
                        <p>{venture_name}</p>
                    </li>
                    <li>
                        <h5>Budget</h5>
                        <p>{prize_pool}</p>
                    </li>
                    <li>
                        {
                            //this.renderImage(file)
                        }
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

                            {
                                this.renderEntries()
                            }
                        </Col>
                    </Row>

                </div>
            );
        }
    };

    toggleSideMenu = () => {
        this.setState(state => {
            return {
                sideMenuStatus: !state.sideMenuStatus
            };
        });
    };


    render() {
        const {sideMenuStatus} = this.state;
        if(!this.props.contest){
            return (
                <Container>
                    <Row>Nothing found</Row>
                </Container>
            );
        } else {
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


