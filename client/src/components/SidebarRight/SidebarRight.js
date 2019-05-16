import React from 'react';
import {connect} from 'react-redux';
import styles from './SidebarRight.module.sass';
import moment from 'moment';
import {publicURL} from "../../api/baseURL";
import pic from "../../images/profilePic.jpeg";


class SidebarRight extends React.Component {


    renderCustomerInfo = () => {
        const {User} = this.props.contestData;
        return (
            <div className={styles.infoCustomerContainer}>
                <div className={styles.labelCustomerInfo}>About Contest Holder</div>
                <div className={styles.customerInfo}>
                    {this.renderProfilePic(User.profile_picture)}
                    <div className={styles.customerNameContainer}>
                        <span>{User.full_name + ' Johnson'}</span>
                        <span>{User.full_name}</span>
                    </div>
                </div>
            </div>
        )
    };

    renderProfilePic= (profilePic) => {
        if (profilePic) {
            return <img key={profilePic} src={publicURL+profilePic} alt="img"/>
        } else {
            return <img key={pic} src={pic} alt="img"/>
        }
    };


    renderGeneralSideBarInfo = () => {
        const {contestData} = this.props;
        const date = moment(contestData.created_at).format("YYYY-MM-DD HH:mm");

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
                            <span>Created</span>
                        </div>
                        <span className={styles.time}>{moment(date).from(moment())}</span>
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

    render() {
        const {User} = this.props.contestData;
        const {myUser} = this.props;
        return (
            <div className={styles.contestSideBarInfo}>
                {this.renderGeneralSideBarInfo()}
                {myUser.id !== User.id && this.renderCustomerInfo()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    return user;
};


export default connect(mapStateToProps, null)(SidebarRight);
