import React, {Component} from "react";
import style from './ContestPreview.module.scss';
import moment from 'moment';

class ContestPreview extends Component{

    renderStatus(){
        const {is_done} = this.props.contest;
        let status = "inactive";
        let danger = style.danger_red;
        if(!is_done){
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
        const {tag, id, venture, industry, createdAt, budget, entriesCount} = this.props.contest;
        const date = moment(createdAt).format("YYYY-MM-DD HH:mm");
        const text = venture;
        const text1 = "text text text text text text text text text text text text text text text text text text text ";
        return(
            <div className={style.container} onClick={this.clickHandler}>
                <div className={style.container__content}>
                    <h2>{tag} for {industry}</h2>
                    <div className={style.container__content_id}>
                        <p>(# {id})</p>
                    </div>
                    <div className={style.container__content_row}>
                        <p className={style.container__content_blue}>{tag}</p>
                        <span>(Posted {moment(date).from(moment())})</span>
                    </div>
                    <p className={style.container__content_text}>{text}</p>
                    <div className={style.container__content_row}>
                        {
                            this.renderStatus()
                        }
                        <span className={style.container__content_blue}>
                            <i className="far fa-gem"/>
                            ${budget}
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
                                    1d, 23h
                                </p>
                                <span>Left</span>
                            </li>
                        </ul>
                    </div>
                    <div className={style.container__info__botbar}>
                        <i className="far fa-clock"/>
                        <p>Early Access</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default ContestPreview;
