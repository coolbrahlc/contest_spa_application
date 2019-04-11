import React from "react";
import style from "./SingleEntry.module.scss";

export default function SingleEntry(props) {

    const {id, creator_id, file, content, user_id, status} = props.data;
    const {win, reject, contestId, customerId, isActiveContest} = props;

    const onWinClick = () => {
        win({
            entryId: id,
            creatorId: creator_id,
            contestId,
            customerId
        })
    };

    const renderButtons = () => {
        return (
            <div>
                <div onClick={() => onWinClick({}) } className={"float-right"}> Set as winner</div>
                {(status!=="rejected") && <div onClick={() => reject(id) } className={"float-right"}> Reject</div>}
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

