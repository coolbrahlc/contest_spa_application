import React from 'react';
import {connect} from 'react-redux';
import styles from './SidebarRight.module.sass';
import {withRouter} from 'react-router-dom';
import moment from 'moment';


class SidebarRight extends React.Component {
    constructor(props) {
        super(props);
        this.defaultPath = '/usersAvatars/';
    }


    renderCustomerInfo = () => {
        const {User} = this.props.contestData;
        return (
            <div className={styles.infoCustomerContainer}>
                <span className={styles.labelCustomerInfo}>About Contest Holder</span>
                <div className={styles.customerInfo}>
                    <img src={this.defaultPath + User.avatar}/>
                    <div className={styles.customerNameContainer}>
                        <span>{User.firstname + ' ' + User.lastname}</span>
                        <span>{User.displayname}</span>
                    </div>
                </div>
            </div>
        )
    };

    getTimeStr = () => {
        const diff = (moment.duration(moment().diff(moment(this.props.contestData.createdAt))));
        let str = '';
        if (diff._data.days !== 0)
            str = `${diff._data.days} days `;
        if (diff._data.hours !== 0)
            str += `${diff._data.hours} hours`;
        if (str.length === 0)
            str = 'less than one hour';
        return str;
    };

    renderGeneralSideBarInfo = () => {
        const {contestData} = this.props;
        return (
            <div className={styles.contestInfo}>
                <div className={styles.awardAndTimeContainer}>
                    <div className={styles.prizeContainer}>
                        <i className="far fa-gem"/>
                        <span>{`$ ${contestData.prize_pool}`}</span>
                    </div>
                    <div className={styles.timeContainer}>
                        <div className={styles.timeDesc}>
                            <i className="far fa-clock"/>
                            <span>Going</span>
                        </div>
                        <span className={styles.time}>{this.getTimeStr()}</span>
                    </div>
                    <div className={styles.guaranteedPrize}>
                        <div>
                            <i className="far fa-gem"/>
                        </div>
                        <span>Guaranteed prize</span>
                    </div>
                </div>
                <div className={styles.contestStats}>
                    <span>Contest Stats</span>
                    <div className={styles.totalEntrie}>
                        <span className={styles.totalEntriesLabel}>Total Entries</span>
                        <span>{this.props.totalEntries}</span>
                    </div>
                </div>
            </div>
        )
    };

    renderContestInfo = () => {
        const {User} = this.props.contestData;
        console.log(User)
        console.log(this.props.user.id)

        return (
            <div className={styles.contestSideBarInfo}>
                {this.renderGeneralSideBarInfo()}
                {this.props.user.id !== User.id && this.renderCustomerInfo()}
            </div>
        )
    };

    render() {
        return this.renderContestInfo();
    }
}

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    return user;
};


export default connect(mapStateToProps, null)(SidebarRight);
