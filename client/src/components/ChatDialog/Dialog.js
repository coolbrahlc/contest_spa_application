import React, {Component} from "react";
import style from "./Dialog.module.scss";
import {sendMessage, closeChat, loadMoreChat} from "../../actions/actionCreator";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
//import _ from "lodash";
import ChatImage from "../ChatImage/ChatImage";
import ChatMessage from "../ChatMessage/ChatMessage";
//import { PulseLoader } from 'react-spinners';
import moment from "moment";


class Dialog extends Component {


    componentDidMount() {
        this.scrollToBottom();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleSubmit = (e) => {
        const { opponent, fields, user, sendMessage, reset, messages, myChat: {_id}} = this.props;

        e.preventDefault();
        if(fields.values) {
            const {body} = fields.values;

            let isNewDialog = true;
            if (messages.length>0) {
                isNewDialog = false;
            }
            sendMessage({
                _id,  //chat ID
                body, // Msg body
                sender: user.id,
                receiver: opponent.id,
                isNewDialog
            })
        }
        reset();
    };

    messagesEnd = React.createRef();

    componentDidUpdate ()  {
        this.scrollToBottom()
    }

    scrollToBottom = () => {
        const {messages, isOpened} = this.props;
        if (messages.length>0 && isOpened) {
            this.messagesEnd.current.scrollIntoView({behavior: 'smooth'})
        }
    };

    close = () => {
        this.props.closeChat();
    };

    loadMore = () =>{
        const  {messages} = this.props;
        const {loadMoreChat, myChat: {_id}} = this.props;
        const skip = messages.length;
        loadMoreChat({ _id, skip });
    };

    renderMessages = () => {
        const {messages, } = this.props;  //isFetchingChat
        let current = moment();
        return messages.map((message, index) => {
            if (index>1) {
                current = moment(messages[index-1].created_at);
            }
            if(moment(message.created_at).isAfter(current, 'day') || index===0 ) {
                return (
                    <div key={message._id} className={style.dayHint} >
                        <p>{moment(message.created_at).format("DD MMMM")}</p>
                        <ChatMessage message={message}/>
                        <div ref={this.messagesEnd} />
                    </div>
                );
            } else {
                return <div>
                        <ChatMessage key={message._id} message={message}/>
                        <div ref={this.messagesEnd} />
                    </div>;
            }
        });
    };
    renderOnlineStatus = () => {
        const {onlineUsers, opponent} = this.props;  //isFetchingChat
        if (onlineUsers.indexOf(opponent.id)>-1) {
            return (<div className={style.status}>online</div>)
        }
    };

    render() {
        const { isOpened, opponent, haveMore} = this.props;
        const { full_name,  profile_picture } = opponent;
        //return  this.renderChat()
        if(isOpened) {
            return (
                <>
                    <div className={style.menu}>
                        <i className="fas fa-arrow-left" onClick={this.close}/>
                        <ChatImage src={profile_picture} firstName={full_name} lastName={full_name}/>
                        <div>
                            <div>{full_name} </div>
                            {this.renderOnlineStatus()}
                        </div>

                    </div>
                    <div className={style.container}>
                        { haveMore && <div className={style.loadMore } onClick={()=>this.loadMore()}><p>load more</p></div> }
                        { this.renderMessages() }
                    </div>

                    <form onSubmit={this.handleSubmit} className={style.container__panel}>
                        <Field name={"body"} type={"body"} component="input"/>
                        <button>
                            <i className="fas fa-paper-plane"/>
                        </button>
                    </form>
                </>
            );
        } else {
            return (<div>wait please</div>)
        }
    }

}

const mapStateToProps = (state) => {
    const {isFetchingChat, error, messages, isOpened, myChat, haveMore, onlineUsers} = state.chatReducer;
    const {user} = state.authReducer;
    const fields = state.form.chat;
    return {fields, isFetchingChat, error, messages, isOpened, user, myChat, haveMore, onlineUsers};
};

const mapDispatchToProps = (dispatch) => ({
    sendMessage: (data) => dispatch(sendMessage(data)),
    closeChat: () => dispatch(closeChat()),
    loadMoreChat: (data) => dispatch(loadMoreChat(data)),
});

export default reduxForm({
    form: 'chat'
})(connect(mapStateToProps, mapDispatchToProps)(Dialog))
