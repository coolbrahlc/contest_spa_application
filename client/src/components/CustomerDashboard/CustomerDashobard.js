import React, { useState, useEffect } from 'react';
import style from "./CustomerDashboard.module.scss";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { GridLoader } from 'react-spinners';
import { Container, Row, Col } from 'react-bootstrap';
import ContestPreview from "../ContestPreview/ContestPreview";
import queryString from 'query-string';
import {ACTIVE, INACTIVE, COMPLETED, NAME_TYPE, LOGO_TYPE, TAGLINE_TYPE, ROLE } from '../../constants/constants'
import {creativeCheckout, getMore} from "../../actions/actionCreator";
import {DebounceInput} from 'react-debounce-input';


const filterObj = {
    active: {is_active: true},
    inactive: {is_active: false},
    completed: {completed: true},
    Name: {type: NAME_TYPE},
    Logo: {type: LOGO_TYPE},
    Tagline: {type: TAGLINE_TYPE},
};


const CustomerDashboard = (props) => {

    const {isFetching, contests, /*getContests, */getFilteredContests, history, isFetchingMore} = props;
    const [lastFilter, setLastFilter] = useState(null);
    const [search, setSearch] = useState(null);

    // BUTTON FILTERS: ACTIVE/COMPLETED/INACTIVE
    const clickHandler = (filter) => {
        if (lastFilter!==filter) {
            const parsed = queryString.parse(props.location.search);
            const query = {...parsed, filter};
            const searchString = queryString.stringify(query);
            setLastFilter(filter);
            history.push({
                pathname: '/dashboard',
                search: searchString
            })
        }
    };


    // RESET BUTTON FILTERS
    const resetFilters = () => {
        setLastFilter(null);
        const searchString = queryString.stringify({search});
        history.push({
            pathname: '/dashboard',
            search: searchString
        })
    };

    // URL CHANGE OBSERVER
    useEffect(() => {
        const parsed = queryString.parse(props.location.search);
        //console.log('URL changed', parsed);
        let params = {};
        let name = null;
        const {filter, search} = parsed;
        if (filter) {
            //console.log(filter)
            params=filterObj[filter]
            //console.log(params)
        }
        if (search) {
            name=search
        }
        getFilteredContests({ params, name });
        setLastFilter(filter);
        setSearch(name);
    }, [props.location.search]);


    // SEARCH BY CONTEST NAME
    const apiCall = name => {
        if (name.length>0) {
            const parsed = queryString.parse(props.location.search);
            const query = {...parsed, search: name};
            const searchString = queryString.stringify(query);
            history.push({
                pathname: '/dashboard',
                search: searchString
            })
        } else {
            const searchString = queryString.stringify({filter: lastFilter});
            history.push({
                pathname: '/dashboard',
                search: searchString
            });
            setSearch(name);
        }
    };

    // INFINITE SCROLL
    const loadMore = (startFrom) => {
        let params = {};
        if (lastFilter) {
            params=filterObj[lastFilter]
        }
        props.getMore( {offset: startFrom, params, name: search});
        console.log('load more');
    };

    window.onscroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            loadMore(contests.length);
        }
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
        const {user} = props
        return (
            <Container>
                <Row className={style.contests}>
                    <Col md = {{size: 6}}>
                        <div >Search by contests name</div>
                        <DebounceInput
                            minLength={1}
                            debounceTimeout={300}
                            value = {search}
                            onChange={ event => apiCall(event.target.value) } />
                            {user.role === ROLE.CUSTOMER &&
                                <>
                                    <div className={style.link} onClick={() => clickHandler(ACTIVE)}>Active Contests</div>
                                    <div className={style.link} onClick={() => clickHandler(COMPLETED)}>Completed contests</div>
                                    <div className={style.link} onClick={() => clickHandler(INACTIVE)}>Inactive contests</div>
                                </>
                            }
                            {user.role === ROLE.CREATIVE &&
                                <>
                                    <div className={style.link} onClick={() => clickHandler( NAME_TYPE )}>Name contests</div>
                                    <div className={style.link} onClick={() => clickHandler( LOGO_TYPE )}>Logo contests</div>
                                    <div className={style.link} onClick={() => clickHandler( TAGLINE_TYPE )}>Tagline contests</div>
                                </>
                            }
                    </Col>
                    <Col md = {{size: 6}}>
                        <div className={`${style.button} float-right`}>
                            <Link className={style.button__link} to="/contest">START CONTEST</Link>
                        </div>
                    </Col>
                </Row>
                {lastFilter && <div  className={style.filter} onClick={() => resetFilters()}>Current filter: {lastFilter}</div>}

                {
                    contests.length!==0 ?
                    contests.map(c => {
                        return (
                            <Row key={c.id} className={style.contests}>
                                <ContestPreview contest={c} {...props}/>
                                {isFetchingMore && <GridLoader loading={isFetching}
                                                               color={'#28D2D1'}
                                                               height={320} width={320}
                                />}
                            </Row>
                        );
                    }) : <div>nothing found</div>

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
const mapDispatchToProps = (dispatch) => ({
    getMore: (data) => dispatch(getMore(data)),
    creativeCheckout: (data) => dispatch(creativeCheckout(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
