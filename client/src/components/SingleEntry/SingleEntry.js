import React from "react";
import style from "./SingleEntry.module.scss";
import {publicURL} from "../../api/baseURL";
import { ROLE } from "../../constants/constants";


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
            return <img src={`${publicURL}/${file}`} alt="entryPic"/>
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
                <p>Username: {User.full_name}</p>
                <span>Answer: {answer}</span>
                {
                   renderImage()
                }
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

