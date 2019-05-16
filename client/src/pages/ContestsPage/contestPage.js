import React, { Component } from 'react';
import '../../App.css';
import {GridLoader} from "react-spinners";
import connect from "react-redux/es/connect/connect";
import style from "./ContestPage.module.scss";
import { getContestById, startConversation,  updateContest,
    collectFormData, dataClear
} from "../../actions/actionCreator";
import {ROLE} from "../../constants/constants";
import NameContest from "../ContestType/contestType";
import {publicURL} from "../../api/baseURL";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import EntriesList from "../../components/EntriesList/EntriesList";
import ContestBrief from "../../components/ContestBrief/ContestBrief";
import CreateEntry from "../../components/CreateEntry/CreateEntry";


class  ContestPage extends Component {

    constructor(props) {
        super(props);
        this.state= {
            editMode: false,
            //sideMenuStatus: false,
            modalShow: false,
            //isVisible: false,
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getContestById({id:id});
        this.props.dataClear();
    }


    changeMode =  () => {
        this.setState({
            editMode: !this.state.edgeMode
        })
    };

    createDialog = () => {
        const {creator_id} = this.props.contest;
        const {user, startConversation} = this.props;

        startConversation({
            user1: user.id,
            user2: creator_id,  // entry CREATOR
        });
    };

    update = (data) => {
        this.props.updateContest(data);
        this.setState({
            editMode :false
        })
    };

    renderEdit =  () => {
        const {contest, collectFormData} =this.props;
        const {type} = this.props.contest;
        const bodyFormData = new FormData();
        bodyFormData.set(`${type.toLowerCase()}Form`, JSON.stringify(contest));
        collectFormData(bodyFormData);
        return <NameContest
            type = {type}
            contestsToInsert = {[type]}
            //dataContest = {contest}
            editMode = {true}
            update = {this.update}
            contest = {contest}
            {...this.props}
        />;
    };

    renderEditButton = () => {
        const {user} = this.props;
        if (this.state.editMode) {
            return this.renderEdit()
        } else {
            if (user) {
                if(user.role === ROLE.CUSTOMER) {
                    return (
                        <div className={style.link+" float-right"}
                             onClick={()=>this.changeMode()}>
                            EDIT CONTEST
                        </div>
                    )
                } else {
                    return (
                        <div className={style.link+" float-right"}
                             onClick={()=>this.createDialog()}>
                            MESSAGE CONTEST CREATOR
                        </div>
                    )
                }
            }
        }
    };

    renderImage = (file) => {
        if(file) {
            return <div className={style.photo}><img src={`${publicURL}${file}`} alt="contestPic" className="img-fluid"/></div>
        }
    };

    renderContest = () => {
        const {isFetchingContest, contest, user, entries} = this.props;
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
                <Container className={style.container}>
                    <Row>
                        <Col className={style.contestContainer} lg={{ span: 8}}>

                            <Tabs defaultActiveKey="brief" id="contest-tabs">
                                <Tab eventKey="brief" title="Contest brief">
                                    <ContestBrief contest={contest}
                                                  renderEditButton={this.renderEditButton}
                                                  renderStatus={this.renderStatus}
                                                  renderImage={this.renderImage}
                                                  editMode={this.state.editMode}/>
                                </Tab>
                                {
                                    user.role===ROLE.CREATIVE &&
                                    <Tab eventKey="entry" title="Create entry">
                                        <CreateEntry type={contest.type} contestId={contest.id} user={user} contest={contest} />
                                    </Tab>
                                }

                            </Tabs>
                        </Col>
                        <Col className={style.sidebarContainer} lg={{ span: 2 }} sm={{ span: 11 }} xs={{ span: 11 }}>
                            <SidebarRight contestData={contest} totalEntries={entries.length} myUser={user}/>
                        </Col>
                    </Row>
                    <Row className={style.noPadding }>
                        <Col md={8} >
                            <EntriesList contest={contest} entries={entries} user={user}
                            />

                        </Col>
                    </Row>
                </Container>
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
    };

    render() {
        const {isFetchingContest, contest, user } = this.props;
        if (!user) {
            return  (
                <div className={style.loader}>
                    <GridLoader loading={isFetchingContest}
                                color={'#28D2D1'}
                                height={320} width={320}
                    />
                </div>
            )
        }

        if(!contest && !isFetchingContest){
            return (
                <Container>
                    <Row>Nothing found</Row>
                </Container>
            );
        } else {
            return (
                <Container className={style.fullHeight}>
                            <div className={style.content}>
                                {
                                    this.renderContest()
                                }
                            </div>
                </Container>
            );
        }
    }
}

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    const {contest, entries, isFetchingContest, error, preferences} = state.customerContestsReducer;
    return {error, contest, entries, isFetchingContest, preferences, user};
};

const mapDispatchToProps = (dispatch) => ({
    dataClear: () => dispatch(dataClear()),
    collectFormData: (formData) => dispatch(collectFormData(formData)),
    getContestById: (id) => dispatch(getContestById(id)),
    updateContest: (data) => dispatch(updateContest(data)),
    startConversation: (data) => dispatch(startConversation(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);


