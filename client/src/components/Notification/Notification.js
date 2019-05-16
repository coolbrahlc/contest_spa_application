import React from 'react';
import {withRouter} from 'react-router-dom';


const Notification=(props)=>{

    const toContest =()=>{
        if (props.contestId) {
            console.log('true')
            props.history.push(`/contest/${props.contestId}`)
        }
    };

    return (
        <div onClick={toContest} >
            <br/>
            <span>{props.message}</span>
            <br/>
        </div>
    )
};


export default withRouter(Notification);
