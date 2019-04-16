import React, { useState } from 'react';
import style from "./CreativeDashboard.module.scss";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { GridLoader } from 'react-spinners';
import { Container, Row, Col } from 'react-bootstrap';
import ContestPreview from "../ContestPreview/ContestPreview";

const CreativeDashboard = (props) => {

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
        if(!contests.length>0 && !lastFilter){
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
                    <Col md = {{size: 6}}>
                        {<div className={style.link} onClick={() => clickHandler({type: 'Name'}, 'Name' )}>Name contests</div>}
                        {<div className={style.link} onClick={() => clickHandler({type: 'Logo'}, 'Logo' )}>Logo contests</div>}
                        {<div className={style.link} onClick={() => clickHandler({type: 'Tagline'}, 'Tagline' )}>Tagline contests</div> }
                    </Col>
                    <Col md = {{size: 6}}>
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

export default connect(mapStateToProps, null)(CreativeDashboard);
