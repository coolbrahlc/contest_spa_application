import React from "react";
import style from "./SingleEntry.module.scss";
import {publicURL} from "../../api/baseURL";
import { ROLE } from "../../constants/constants";
import pic from "../../images/profilePic.jpeg";


export default function SingleEntry(props) {

    const {id, user_id, status, answer, User, file} = props.data;
    const {win, reject, contestId, customerId, isActiveContest, role} = props;


    const onWinClick = () => {
        win({
            entryId: id,
            creatorId: user_id,
            contestId,
            customerId
        })
    };
    const renderImage = () => {
        if(file){
            return <div className={style.img}><img src={`${publicURL+file}`}  className={style.imgPreview} alt={"logo"}/></div>
               // <div className={style.img}><img src={`${publicURL+file}`} className="img-fluid" alt={"logo"}/></div>
        }
    };
    const renderProfilePic = (profilePic) => {
        if (profilePic) {
            return <img className={style.imgPreview} key={profilePic} src={publicURL+profilePic} alt="img"/>
        } else {
            return <img className={style.imgPreview} key={pic} src={pic} alt="img"/>
        }
    };



    const renderActions = () => {
        if(role===ROLE.CREATIVE){
            return <div>{status}</div>
        }
        if(status === 'winner'){
            return <div>Winner</div>
        }
        if(status === 'rejected'){
            return <div>Rejected</div>
        }
        return(
            <>
                <div className={style.container__acceptButton}>
                    <i className="fas fa-check-circle" onClick={onWinClick}/>
                </div>

                <div className={style.container__rejectButton}>
                    <i className="fas fa-times-circle" onClick={() => reject({id, customerId, contestId})}/>
                </div>

            </>
        );
    };

    if(User) {
        return (
            <div className={style.container}>
                <div className={style.topContainer}>
                    <div>
                        <div>{ renderProfilePic(User.profile_picture) }</div>
                        <p>Username: {User.full_name}</p>
                        <p>Email: {User.email}</p>
                        <p>entry ID: {id}</p>

                        <span>Answer: {answer}</span>
                    </div>
                    <div>
                        {
                            renderImage()
                        }
                    </div>
                </div>
                <div className={style.menuGroup}>
                    {
                        renderActions()
                    }
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

}

