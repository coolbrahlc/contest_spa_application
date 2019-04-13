import React from "react";
import style from "./SingleEntry.module.scss";
import {publicURL} from "../../api/baseURL";


export default function SingleEntry(props) {

    const {id, user_id, status, answer, User, file} = props.data;
    const {win, reject, contestId, customerId, isActiveContest} = props;


    const onWinClick = () => {
        console.log({
            entryId: id,
            creatorId: user_id,
            contestId,
            customerId
        })
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

    const renderButtons = () => {
        return (
            <div>
                <div onClick={() => onWinClick({}) } className={"float-right"}> Set as winner</div>
                {(status!=="rejected") && <div onClick={() => reject({id, customerId, contestId}) } className={"float-right"}> Reject</div>}
            </div>
    )};

    const renderMenuBar = () => {
        if(status === 'accepted'){
            return <div>Accepted</div>
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
                <p>Name: {User.full_name}</p>
                <span>Answer: {answer}</span>
                {
                   renderImage()
                }
                <div className={style.menuGroup}>
                    {
                        renderMenuBar()
                    }
                </div>
            </div>
        );
    }



    // return(
    //     <div className={`${style.entry} mt-3` }>
    //         {id} entrie id
    //         {user_id}  user id
    //         <div>
    //             status: {status}
    //         </div>
    //
    //         {isActiveContest && renderButtons()}
    //     </div>
    //
    //
    // );
}

