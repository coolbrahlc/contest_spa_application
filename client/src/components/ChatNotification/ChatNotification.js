import React from 'react';
import {connect} from "react-redux";
import { startConversation} from "../../actions/actionCreator";


const ChatNotification=(props)=>{

    const handleClick = (_id) => {
        props.startConversation({ _id });
    };

    return (
        <div onClick={ ()=>handleClick(props._id) } >
            <br/>
            <span>{props.message}</span>
            <br/>
        </div>
    )
};
const mapDispatchToProps = (dispatch) => ({
    startConversation: (data) => dispatch(startConversation(data)),
});

export default connect(null, mapDispatchToProps)(ChatNotification);

