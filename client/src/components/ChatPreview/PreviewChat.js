import React from "react";
import style from "./PreviewChat.module.scss";
import {connect} from "react-redux";
import { startConversation} from "../../actions/actionCreator";
import ChatImage from "../ChatImage/ChatImage";
import moment from "moment";

const DialogSnapshot = props => {

    const {participants, _id } = props.chat;
    const {user, onlineUsers, lastMessage: {sender, body, created_at} } = props;
    let opponent = participants.filter(participant => participant.id !==user.id)[0];
    const {full_name,  profile_picture} = opponent;

    const handleClick = () => {
        props.startConversation({ _id });
    };
    const renderOnlineStatus = () => {
        if (onlineUsers.indexOf(opponent.id)>-1) {
            return (<span className={style.status}>online</span>)
        }
    };


    const renderMessage = () => {
        const {user} = props;
        if(parseInt(sender) === user.id){
            return <span>{body}</span>;
        } else {
            return <span>{opponent.full_name+": "+body}</span>
        }
    };

    const date = moment(created_at).format("YYYY-MM-DD HH:mm");
    return (
        <div onClick={handleClick} className={style.container}>
            <div className={style.container__inner}>
                <ChatImage src={profile_picture} firstName={full_name} lastName={full_name}/>
                <div className={style.container__content}>
                    <p>{full_name} { renderOnlineStatus() } </p>
                    { renderMessage() }
                </div>
            </div>
            <p className={style.container__time}>{moment(date).from(moment())}</p>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    startConversation: (data) => dispatch(startConversation(data)),
});

export default connect(null, mapDispatchToProps)(DialogSnapshot);
