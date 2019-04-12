import React from "react";
import style from "./SingleEntry.module.scss";

export default function SingleEntry(props) {

    const {id, user_id, status} = props.data;
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

    const renderButtons = () => {
        return (
            <div>
                <div onClick={() => onWinClick({}) } className={"float-right"}> Set as winner</div>
                {(status!=="rejected") && <div onClick={() => reject({id, customerId, contestId}) } className={"float-right"}> Reject</div>}
            </div>
    )};


    return(
        <div className={`${style.entry} mt-3` }>
            {id} entrie id
            {user_id}  user id
            <div>
                status: {status}
            </div>

            {isActiveContest && renderButtons()}
        </div>
    );
}

