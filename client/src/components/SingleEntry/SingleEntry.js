import React from "react";
import style from "./SingleEntry.module.scss";

export default function SingleEntry(props) {

    const {id, file, content, user_id} = props.data;
    const clickHandler = () => {
    }
    
    return(
        <div className={`${style.entry} mt-3` }>
            {id} entrie id
            {user_id}  user id
            <div onClick={() => clickHandler( {is_active: true} )} className={"float-right"}> Set as winner</div>
        </div>
    );
}
