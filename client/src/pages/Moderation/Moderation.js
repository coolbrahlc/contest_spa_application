import React, { Component } from 'react';
import '../../App.css';
import {GridLoader} from "react-spinners";
import connect from "react-redux/es/connect/connect";
import style from "./Moderation.module.scss";
import { listEntries} from "../../actions/actionCreator";
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import SingleEntryModer from "../../components/SingleEntryModer/SingleEntryModer";
import {ENTRY_CONFIRMED, ENTRY_REJECTED, ENTRY_REVIEW} from "../../constants/constants";
import {ROLE} from "../../constants/constants";


class  Moderation extends Component {

    constructor(props) {
        super(props);
        this.state= {
            modalShow: false,
        }
    }

    componentDidMount() {
        const {listEntries} = this.props;
        listEntries();
    }

    filteredByStatus (status) {
        const {entries} = this.props;
        const filtered = entries.filter(e => e.moderation_status===status);
        if (filtered.length>0) {
            return filtered.map(e => (
                <SingleEntryModer key={e.id} data={e}
                                  status = {e.status}
                                  moderationStatus = {e.moderation_status}
                                  contestId = {e.contest_id} />
            ))
        } else return (<div className='mt-3'>No new entries</div>)
    }

    renderEntries = () => {
        const {error, user} = this.props;
        return (
            <Container className={style.container}>
                <Row>
                    <Col className={style.contestContainer} lg={8}>
                        <Tabs defaultActiveKey="Review" id="contest-tabs">
                            <Tab eventKey="Review" title="Review">
                                {error && <div>Server error</div>}
                                { this.filteredByStatus(ENTRY_REVIEW) }
                            </Tab>
                            <Tab eventKey="Rejected" title="Rejected">
                                { this.filteredByStatus(ENTRY_REJECTED) }
                            </Tab>
                            <Tab eventKey="Confirmed" title="Confirmed">
                                { this.filteredByStatus(ENTRY_CONFIRMED) }
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        );
    };
    redirect = () => {
        this.props.history.push({
            pathname: '/',
        });
    };

    render() {
        const {isFetching, user, error, listEntries} = this.props;
        if (!user || isFetching) {
            return  (
                <div className={style.loader}>
                    <GridLoader loading={isFetching}
                                color={'#28D2D1'}
                                height={320} width={320}
                    />
                </div>
            )
        }
        if (user.role!==ROLE.MODERATOR) {
            this.redirect()
        }
        if(error){
            return (
                <Container>
                    <Row>
                        <div>
                            Server error
                        </div>
                        <div onClick={()=>listEntries()}>
                            CLick here to reload page
                        </div>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container className={style.fullHeight}>
                    <div className={style.content}>
                        {
                            this.renderEntries()
                        }
                    </div>
                </Container>
            );
        }
    }
}

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    const { entries, isFetching, error} = state.moderatorReducer;
    return {  entries, isFetching, error, user};
};

const mapDispatchToProps = (dispatch) => ({
    listEntries: (data) => dispatch(listEntries(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Moderation);


