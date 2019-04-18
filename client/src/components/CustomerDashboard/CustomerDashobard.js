import React, { useState, useEffect } from 'react';
import style from "./CustomerDashboard.module.scss";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { GridLoader } from 'react-spinners';
import { Container, Row, Col } from 'react-bootstrap';
import ContestPreview from "../ContestPreview/ContestPreview";
import queryString from 'query-string';
import { ACTIVE, INACTIVE, COMPLETED } from '../../constants/constants'


const filterObj = {
    active: {is_active: true},
    inactive: {is_active: false},
    completed: {completed: true},
};


const CustomerDashboard = (props) => {

    const {isFetching, contests, getContests, history} = props;
    const [lastFilter, setLastFilter] = useState('');

    const clickHandler = (filter) => {
        if (lastFilter!==filter) {

            getContests({params: filterObj[filter]});
            setLastFilter(filter);

            history.push({
                pathname: '/dashboard',
                search: '?filter='+filter
            })
        }
    };

    const filterHandler = () => {
        setLastFilter(false);
        getContests({ params: {} });
        history.push({pathname: '/dashboard'})
    };

    useEffect(() => {
        const parsed = queryString.parse(props.location.search);
        if (parsed.filter) {
            const filter = parsed.filter;
            getContests({ params: filterObj[filter] });
            setLastFilter(filter);
        } else {
            getContests({ params: {} });
        }
    }, []);

    useEffect(() => {
        const parsed = queryString.parse(props.location.search);
        if (parsed.filter) {
            const filter = parsed.filter;
            getContests({ params: filterObj[filter] });
            setLastFilter(filter);
        }
    }, [props.location.search]);


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
        if(!contests && !lastFilter){
            return (
                <Container>
                    <Row className={style.contests}>
                        <Col md = {{size: 2, offset: 5}}>
                            <div className={style.button}>
                                <Link className={style.button__link} to="/contest">START CONTEST</Link>
                            </div>
                        </Col>
                    </Row>
                    <Row>Error</Row>
                </Container>
            );
        }
        if(contests.length===0 && !lastFilter){
            return (
                <Container>
                    <Row className={style.contests}>
                        <Col md = {{size: 2, offset: 5}}>
                            <div className={style.button}>
                                <Link className={style.button__link} to="/contest">START CONTEST</Link>
                            </div>
                        </Col>
                    </Row>
                    <Row>You dont have contests</Row>
                </Container>
            );
        }
        return (
            <Container>
                <Row className={style.contests}>
                    <Col md = {{size: 6}}>
                        {<div className={style.link} onClick={() => clickHandler(ACTIVE)}>Active Contests</div>}
                        {<div className={style.link} onClick={() => clickHandler(COMPLETED)}>Completed contests</div>}
                        {<div className={style.link} onClick={() => clickHandler(INACTIVE)}>Inactive contests</div> }
                    </Col>
                    <Col md = {{size: 6}}>
                        <div className={`${style.button} float-right`}>
                            <Link className={style.button__link} to="/contest">START CONTEST</Link>
                        </div>
                    </Col>
                </Row>
                {lastFilter && <div  className={style.filter} onClick={() => filterHandler()}>Current filter: {lastFilter}</div>}

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
