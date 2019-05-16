import React from 'react';
import {ROLE} from "../../constants/constants";
import style from "../../pages/ContestsPage/ContestPage.module.scss";
import SingleEntry from "../SingleEntry/SingleEntry";


const entriesList = (props) => {
    //const {id, is_active, creator_id} = props.contest;
    const {entries, user} = props;

    if(user){
        if(user.role !== ROLE.CREATIVE) {
            return(
                <div className={style.entryContainer}>
                    {
                        entries.map(e => {
                            return <SingleEntry key={e.id} data={e}
                                                status = {e.status}
                                                contestId = {e.contest_id}
                                                //isActiveContest = {is_active}
                                                //contestCreatorId = {creator_id}
                                                //{...this.props}
                            />
                        })
                    }
                </div>
            )
        }
        else{
            return(
                <div>
                    <div className={style.entryContainer}>
                        {
                            entries.filter(s => (s.user_id === user.id)).map(e => {
                                return <SingleEntry key={e.id} data={e}
                                                    status = {e.status}
                                                    contestId = {e.contest_id}
                                                    //isActiveContest = {is_active}
                                                    //contestCreatorId = {creator_id}
                                />
                            })
                        }
                    </div>
                </div>
            )
        }
    }
};
export default entriesList
