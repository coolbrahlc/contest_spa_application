import React, {useEffect} from "react";
import style from "./ListDialogs.module.scss";
import PreviewChat from "../ChatPreview/PreviewChat";
import { listMyChats } from "../../actions/actionCreator";
import {connect} from "react-redux";

const DialogList = props => {
    useEffect(() => {
        props.listMyChats({myId: props.user.id})
    },[]);

    const renderDialogs = () => {
        const {chats, isOpened, user, onlineUsers} = props;
        return isOpened && chats.map(chat => <PreviewChat key={chat._id}
                                                          chat={chat} user={user}
                                                          lastMessage={chat.lastMessage}
                                                          onlineUsers={onlineUsers} />);
    };

    const {isOpened} = props;

    return (
        <div className={style.container}>
            {
                isOpened && renderDialogs()
            }
        </div>
    );

};

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    const { chats, isFetchingMyChats, isOpened, onlineUsers} = state.chatReducer;

    return {isFetchingMyChats, user, chats, isOpened, onlineUsers};
};

const mapDispatchToProps = (dispatch) => ({
    listMyChats: (data) => dispatch(listMyChats(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogList);
