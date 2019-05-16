import React, { useState } from "react";
import style from "../SingleEntry/SingleEntry.module.scss";
import {publicURL} from "../../api/baseURL";
import { ENTRY_CONFIRMED, ENTRY_REJECTED } from "../../constants/constants";
import pic from "../../images/profilePic.jpeg";
import {changeStatus} from "../../actions/actionCreator";
import {connect} from "react-redux";
import ModalSubmit from "../ModalSubmit/ModalSubmit";


const SingleEntryModer = (props) => {

    const {id, user_id, moderation_status, answer, User, file} = props.data;
    const {changeStatus, user: {role, id:customerId}, user, contestId } = props;

    const [isShowModal, setModal] = useState(false);
    const [actionType, setActionType] = useState('');

    const showModal = (type) => {
        setActionType(type);
        setModal(true)
    };
    const submitAction = () => {
        if (actionType===ENTRY_CONFIRMED) {
            changeStatus({
                id,
                user_id,
                email:User.email,
                action: ENTRY_CONFIRMED
            });
        } else {
            changeStatus({id, user_id, action: ENTRY_REJECTED})
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


    const closeModal = () => {
        setModal(false)
    };

    const renderActions = () => {
        if(moderation_status === ENTRY_CONFIRMED){
            return <div>Confirmed</div>
        }
        if(moderation_status === ENTRY_REJECTED){
            return <div>Rejected</div>
        }
        return(
            <>
                <div className={style.container__acceptButton}>
                    <i className="fas fa-check-circle" onClick={()=>showModal(ENTRY_CONFIRMED)}/>
                </div>
                <div className={style.container__rejectButton}>
                    <i className="fas fa-times-circle" onClick={()=>showModal(ENTRY_REJECTED)} />
                </div>
            </>
        );
    };

    if(User) {
        let entryClass = style.container;
        if(moderation_status === ENTRY_CONFIRMED){
            entryClass = style.container_winner;
        }
        if(moderation_status === ENTRY_REJECTED){
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
                        <div>Contest ID: {contestId}</div>
                        <span>Answer: {answer}</span>
                    </div>


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
    changeStatus: (data) => dispatch(changeStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleEntryModer);
