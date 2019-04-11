import React, {Component} from "react";
import style from './ContestPreview.module.scss';
import moment from 'moment';

class ContestPreview extends Component{

    renderStatus(){
        const {completed} = this.props.contest;
        let status = "inactive";
        let danger = style.danger_red;
        if(!completed){
            status = "active";
            danger = style.danger_green;
        }
        return (
            <p className={danger}>
                <i className="fas fa-check-circle"/>
                {status}
            </p>
        );
    }

    clickHandler = () => {
        const {history} = this.props;
        const {id} = this.props.contest;
        history.push(`/contest/${id}`);
    };

    render(){
        const {type, id, venture, industry, created_at, prize_pool, entriesCount, days_passed} = this.props.contest;
        const date = moment(created_at).format("YYYY-MM-DD HH:mm");
        const new_date = moment(date, "YYYY-MM-DD HH:mm").add(days_passed, 'days');
        return(
            <div className={style.container} onClick={this.clickHandler}>
                <div className={style.container__content}>
                    <h2>{type} for {industry}</h2>
                    <div className={style.container__content_id}>
                        <p># {id}</p>
                    </div>
                    <div className={style.container__content_row}>
                        <p className={style.container__content_blue}>{type}</p>
                        <span>Posted {moment(date).from(moment())}</span>
                    </div>
                    <p className={style.container__content_text}>{venture}</p>
                    <div className={style.container__content_row}>
                        {
                            this.renderStatus()
                        }
                        <span className={style.container__content_blue}>
                            <i className="far fa-gem"/>
                            ${prize_pool}
                        </span>
                    </div>
                </div>
                <div className={style.container__info}>
                    <div className={style.container__info__topbar}>
                        <ul>
                            <li>
                                <p>
                                    <i className="fas fa-user-alt"/>
                                    {entriesCount}
                                </p>
                                <span>Entries</span>
                            </li>
                            <li>
                                <p>
                                    {moment(new_date).from(moment(date))}
                                </p>
                                <span>Finish</span>
                            </li>
                        </ul>
                    </div>
                    {/*<div className={style.container__info__botbar}>*/}
                        {/*<i className="far fa-clock"/>*/}
                        {/*<p> asdf </p>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }

}

export default ContestPreview;
