import React, { useState } from 'react';
import style from "./CustomerDashboard.module.scss";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { GridLoader } from 'react-spinners';
import { Container, Row, Col } from 'react-bootstrap';
import ContestPreview from "../ContestPreview/ContestPreview";

const CustomerDashboard = (props) => {

    const {isFetching, contests, getContests} = props;
    const [lastFilter, setLastFilter] = useState('');


    const clickHandler = (params, filter) => {
        if (lastFilter!==filter) {
            getContests({ params });
            setLastFilter(filter);
        }
    };

    const filterHandler = () => {
        setLastFilter(false);
        getContests({ params: {} });
    };


    if (isFetching) {
        return (
            <div className={style.loader}>
                <GridLoader loading={isFetching}
                            color={'#28D2D1'}
                            height={320} width={320}
                />
            </div>
            )
    }
    else{
        if(!contests.length>0){
            // return (<div>nothing found</div>)
            return (
                <Container>
                    <Row className={style.contests}>
                        <Col md = {{size: 2, offset: 5}}>
                            <div className={style.button}>
                                <Link className={style.button__link} to="/contest">START CONTEST</Link>
                            </div>
                        </Col>
                    </Row>
                    <Row>Nothing found</Row>
                </Container>
            );
        }
        return (
            <Container>
                <Row className={style.contests}>
                    <Col md = {{size: 2, offset: 5}}>
                        <div className={`${style.button} float-right`}>
                            <Link className={style.button__link} to="/contest">START CONTEST</Link>
                        </div>
                    </Col>
                </Row>

                {<div onClick={() => clickHandler({is_active: true}, 'Active' )}>Active Contests</div>}
                {<div onClick={() => clickHandler({completed: true}, 'Completed' )}>Completed contests</div>}
                {<div onClick={() => clickHandler({is_active: false}, 'Inactive' )}>Inactive contests</div> }

                {lastFilter && <div onClick={() => filterHandler()}>Current filter: {lastFilter}</div>}

                {
                    contests.map(c => {
                        return (
                            <Row key={c.id} className={style.contests}>
                                <ContestPreview contest={c} {...props}/>
                            </Row>
                        );
                    })
                }
            </Container>
        );
    }
};

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    const {contests, isFetching, error} =  state.customerContestsReducer;
    return {error, contests, isFetching, user};
};

export default connect(mapStateToProps, null)(CustomerDashboard);
