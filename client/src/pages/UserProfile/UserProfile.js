import React, { Component } from 'react';
import '../../App.css';
import connect from "react-redux/es/connect/connect";
import style from "./UserProfile.module.scss";
import {editUser} from "../../actions/actionCreator"
import { Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import {publicURL} from "../../api/baseURL";
import pic from "../../images/profilePic.jpeg";
import CashoutProfile from "../../components/CashoutProfile/CashoutProfile";
import {GridLoader} from "react-spinners";
import UserProfileForm from "../../components/UserProfileForm/UserProfileForm";


class  UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state= {
            editMode: false,
        }
    }

    renderEditButton = () => {
        const { user } = this.props;

        if (this.state.editMode) {
            return (
                <UserProfileForm
                    initialValues={
                        {
                            fullName: user.full_name,
                            email: user.email,
                        }
                    }
                    onSubmit={this.updateUserData}
                />
            )

        } else {
            return (
                <div className={style.link+" float-right"}
                     onClick={()=> this.setState({editMode: !this.state.edgeMode}) }>EDIT PROFILE
                </div>
            )
        }
    };

    updateUserData = (data) => {
        console.log('6666', data);
        let profileForm = new FormData();
        const {fullName, email, profilePic}= data;
        profileForm.set('profileEdit', JSON.stringify({
            full_name: fullName,
            email,
        }));
        if (profilePic) {
            console.log('have profile pic', profilePic);
            profileForm.append('profilePic', profilePic);
        }
        this.props.editUser(profileForm);
        this.setState({editMode: false})
    };

    renderProfilePic= (profilePic) => {
        if (profilePic) {
            return <div className={style.photo}><img key={profilePic} className={style.myImg} src={publicURL+profilePic} alt="img"/></div>
        } else {
            return <div className={style.photo}><img key={pic} className={style.myImg} src={pic} alt="img"/></div>
        }
    };

    renderProfileCard = (user) => {
        const { full_name, email, profile_picture, account, id } = user;
        const { editMode } = this.state;
        return (
            <div className={style.brief}>
                <div>
                    {
                        this.renderEditButton()
                    }
                </div>
                {!editMode &&
                <div>
                    {this.renderProfilePic(profile_picture)}
                    <div>
                        <div >#{id}</div>

                        <div className={style.brief__thick}>
                            <h5>Your name</h5>
                            <p>{full_name}</p>
                        </div>
                        <div className={style.brief__thin}>
                            <h5>Email</h5>
                            <p>{email}</p>
                        </div>
                        <div className={style.brief__wide}>
                            <div>
                                <h5>Your balance</h5>
                                <p>{account} $</p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    };

    renderUser = () => {
        const { isFetching, user } = this.props;
        if(!isFetching){
            return (
                <div className={style.container}>
                    <Row>
                        <Col className={style.contestContainer} md={{ span: 12}} >
                            <Tabs defaultActiveKey="profile" id="contest-tabs">
                                <Tab eventKey="profile" title="User info">
                                    {this.renderProfileCard(user)}
                                </Tab>
                                <Tab eventKey="checkout" title="Cashout">
                                    <CashoutProfile />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            );
        }
    };

    render() {
        const {isFetching, user} = this.props;  //editError
        if(!user && !isFetching){
            return (
                <Container>
                    <Row>User profile not found</Row>
                </Container>
            );
        }
        if(isFetching){
            return (
                <Row className={style.fullHeight}>
                    <Col className={style.clearLeft} xl={{ span: 4, offset:4}} lg={{ span: 6, offset:3}} md={{ span: 8, offset:2}} sm={{ span: 8, offset:2}}>
                        <div className={style.content}>
                            <div className={style.loader}>
                                <GridLoader loading={isFetching}
                                            color={'#28D2D1'}
                                            height={320} width={320}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row className={style.fullHeight}>
                    <Col className={style.clearLeft} xl={{ span: 4, offset:4}} lg={{ span: 6, offset:3}} md={{ span: 8, offset:2}} sm={{ span: 8, offset:2}}>
                        <div className={style.content}>
                            {this.renderUser()}
                        </div>
                    </Col>
                </Row>
            );
        }
    }
}

const mapStateToProps = (state) =>{
    const {user, editError, isFetching} = state.authReducer;
    const fields = state.form.userProfile;
    return { user, editError, fields, isFetching };
};

const mapDispatchToProps = (dispatch) => ({
    editUser: (id) => dispatch(editUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);


