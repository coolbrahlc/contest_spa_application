import React from "react";
import style from "./ChatMessage.module.scss";
import {connect} from "react-redux";
import moment from "moment";

const DialogMessage = props => {

    const renderMessage = () => {
        const {message: {body, created_at, sender}, user} = props;
        let className;
        if(parseInt(sender) === user.id) {
            className = style.container_self;
        } else {
            className = style.container_opponent;
        }
        return (
            <div className={className}>
                <div className={style.inner}>
                    <p>{body}</p>
                    <span>{moment(created_at).format("HH:mm")}</span>
                </div>
            </div>
        );
    };
    return renderMessage();

};

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    return {user};
};

export default connect(mapStateToProps, null)(DialogMessage);
