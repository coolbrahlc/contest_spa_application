import React  from "react";
import style from "./Chat.module.scss";
import {connect} from "react-redux";
import Dialog from "../ChatDialog/Dialog";
import ListDialogs from "../ChatListDialogs/ListDialogs";
import {toggleChat, closeChat} from "../../actions/actionCreator";

const Chat = props => {

    const toggleChatClick = () => {
        props.toggleChat();
    };

    const {participants, user} = props;
    if(user) {
        const opponent = participants.filter(participant => participant.id !== user.id)[0];

        return (
            <div className={style.container}>
                <div className={style.container__opener} onClick={()=>toggleChatClick()}>
                    <i className="far fa-comment-alt"/>
                </div>
                <div className={props.isOpened ? style.container_opened : style.container_closed}>
                    {
                        props.isExpanded ? <Dialog participants={participants} opponent={opponent}/> : <ListDialogs/>
                    }
                </div>
            </div>
        );
    } else {
        return (<div/>)
    }

};

const mapStateToProps = (state) => {
    const { isOpened, participants, opponent, isExpanded, messages} = state.chatReducer;
    const { user} = state.authReducer;

    return { isOpened, participants, opponent, isExpanded, messages, user};
};

const mapDispatchToProps = (dispatch) => ({
    toggleChat: () => dispatch(toggleChat()),
    closeChat: () => dispatch(closeChat())
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
