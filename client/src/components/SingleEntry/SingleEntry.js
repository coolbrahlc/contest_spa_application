import React, { useState } from "react";
import style from "./SingleEntry.module.scss";
import {publicURL} from "../../api/baseURL";
import { ROLE, ENTRY_WINNER, ENTRY_REJECTED } from "../../constants/constants";
import pic from "../../images/profilePic.jpeg";
import {rejectEntry, setEntryWinner, startConversation} from "../../actions/actionCreator";
//import classNames from 'classnames';
import {connect} from "react-redux";
import ModalSubmit from "../ModalSubmit/ModalSubmit";


const SingleEntry = (props) => {

    const {id, user_id, status, answer, User, file} = props.data;
    const {setEntryWinner, rejectEntry, startConversation, user: {role, id:customerId}, user,
        contestId, /*contestCreatorId*/ } = props;

    const [isShowModal, setModal] = useState(false);
    const [actionType, setActionType] = useState('');

    const showModal = (type) => {
        setActionType(type);
        setModal(true)
    };
    const submitAction = () => {
        if (actionType===ENTRY_WINNER) {
            setEntryWinner({
                entryId: id,
                creatorId: user_id,    // entry CREATOR
                contestId,
                customerId,            // CURRENT USER
                //contestCreatorId
            });
        } else {
            rejectEntry({id, customerId, contestId})
        }
        setModal(false)
    };

    const renderImage = () => {
        if(file){
            return <div className={style.img}><img src={`${publicURL+file}`}  className={style.imgPreview} alt={"logo"}/></div>
        }
    };
    const renderProfilePic = (profilePic) => {
        if (profilePic) {
            return <img className={style.imgPreview} key={profilePic} src={publicURL+profilePic} alt="img"/>
        } else {
            return <img className={style.imgPreview} key={pic} src={pic} alt="img"/>
        }
    };

    const createDialog = () => {
        console.log(user.id, user_id);
        startConversation({
            user1: user.id,
            user2: user_id,  // entry CREATOR
        });
    };

    const closeModal = () => {
        setModal(false)
    };

    const renderActions = () => {
        if(role===ROLE.CREATIVE){
            return <div>{status}</div>
        }
        if(status === ENTRY_WINNER){
            return <div>Winner</div>
        }
        if(status === ENTRY_REJECTED){
            return <div>Rejected</div>
        }
        return(
            <>
                <div className={style.container__acceptButton}>
                    <i className="fas fa-check-circle" onClick={()=>showModal(ENTRY_WINNER)}/>
                </div>
                <div className={style.container__rejectButton}>
                    <i className="fas fa-times-circle" onClick={()=>showModal(ENTRY_REJECTED)} />
                </div>
            </>
        );
    };

    if(User) {
        let entryClass = style.container;
        if(status === ENTRY_WINNER){
            entryClass = style.container_winner;
        }
        if(status === ENTRY_REJECTED){
            entryClass = style.container_rejected;
        }

        return (
            <div className={entryClass}>
                <div className={style.topContainer}>
                    <div>
                        <div>{ renderProfilePic(User.profile_picture) }</div>
                        <h5>Username: {User.full_name}</h5>
                        <div>Email: {User.email}</div>
                        <div>entry ID: {id}</div>
                        <span>Answer: {answer}</span>
                    </div>

                    {(role===ROLE.CUSTOMER) && <div onClick={createDialog}>Send message</div> }

                    <div>
                        <div>{ renderImage() }</div>
                    </div>
                </div>
                <div className={style.menuGroup}>
                    { renderActions() }
                    <ModalSubmit show={isShowModal} closeModal={closeModal} submit={submitAction} />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                empty
            </div>
        )
    }

};

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    const {isFetchingMyChats, participants, messages} = state.chatReducer;
    return { user, isFetchingMyChats, participants, messages};
};

const mapDispatchToProps = (dispatch) => ({
    setEntryWinner: (data) => dispatch(setEntryWinner(data)),
    rejectEntry: (data) => dispatch(rejectEntry(data)),
    startConversation: (data) => dispatch(startConversation(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleEntry);
