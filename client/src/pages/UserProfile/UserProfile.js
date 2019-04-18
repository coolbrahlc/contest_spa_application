import React, { Component } from 'react';
import '../../App.css';
import {GridLoader} from "react-spinners";
import connect from "react-redux/es/connect/connect";
import style from "./UserProfile.module.scss";
import {editUser, updateContest, setEntryWinner, rejectEntry} from "../../actions/actionCreator"
import SingleEntry from "../../components/SingleEntry/SingleEntry";
import {ROLE} from "../../constants/constants";
import { Container, Row, Col } from 'react-bootstrap';
import moment from "moment";
import CreateEntry from "../../components/CreateEntry/CreateEntry";
import NameContest from "../ContestType/contestType";
import {publicURL} from "../../api/baseURL";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import userProfileReducer from "../../reducers/userProfileReducer";


class  UserProfile extends Component {

    constructor(props) {
        super(props);
        const {full_name, email} = props.user;
        this.state= {
            editMode: false,
            fullName: full_name? full_name :'',
            email: email? email :'',
            profilePic: null,
        }
    }

    componentDidMount() {
        //const id = this.props.match.params.id;
    }


    changeMode =  () => {
        this.setState({
            editMode: !this.state.edgeMode
        })
    };

    update = (data) => {
        this.props.updateContest(data);
        this.setState({
            editMode :false
        })
    };

    onChangeFile =  (e) => {
        this.setState({
            profilePic:e.target.files[0]
        });
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            [`${name}Error`]: null
        });
    };

    renderEdit =  () => {
        return (
            <div>
                <div className={style.inputDefault}>
                    <input type="text"
                           placeholder="Contest name"
                           name="contestName"
                           value={this.state.fullName}
                           onChange={this.handleInputChange}/>
                </div>
                <div className={style.inputDefault}>
                    <input type="text"
                           placeholder="Contest name"
                           name="contestName"
                           value={this.state.email}
                           onChange={this.handleInputChange}/>
                </div>
                <div className={style.formSection}>
                    <input type="file"
                           name="nameFile"
                           onChange={this.onChangeFile} />
                </div>
                <div onClick={this.submitEdit()}>Edit</div>
            </div>
        )
    };

    submitEdit = () => {
        let profileForm = new FormData();
        const {fullName, email, profilePic}= this.state;

        profileForm.set('profileEdit', JSON.stringify({
            full_name: fullName,
            email,
        }));
        if (profilePic) {
            profileForm.append('profilePic', profilePic);
        }
        editUser(profileForm);
    };

    renderEditButton = () => {
        const {user} = this.props;
        if (this.state.editMode) {
            return this.renderEdit()
        } else {
            return (
                <div className={style.link+' '+"float-right"}
                     onClick={()=>this.changeMode()}>EDIT PROFILE
                </div>
            )
        }
    };

    renderImage = (file) => {

        if(file) {
            return <div className={style.photo}><img src={`${publicURL}${file}`} alt="contestPic" className="img-fluid"/></div>
        }
    };


    renderProfileCard = (user) => {
        const { full_name, email, profile_picture, account, role, id } = user;
        const { editMode } = this.state;
        return (
            <div className={style.brief}>
                {
                    this.renderEditButton()
                }
                {!editMode &&
                <>
                    <ul>
                        <div >#{id}</div>

                        <li className={style.brief__thick}>
                            <h5>Your name</h5>
                            <p>{full_name}</p>
                        </li>
                        <li className={style.brief__thin}>
                            <h5>Email</h5>
                            <p>{email}</p>
                        </li>

                        <li className={style.brief__thin}>
                            <h5>profile pic</h5>
                            { this.renderImage(profile_picture) }
                        </li>
                        <li className={style.brief__thin}>
                            <h5>Your balance</h5>
                            <p>{account} $</p>
                        </li>

                    </ul>
                </>}
            </div>
        );
    };


    renderUser = () => {
        const {isFetching, user} = this.props;
        if(isFetching){
            return (
                <div className={style.loader}>
                    <GridLoader loading={isFetching}
                                color={'#28D2D1'}
                                height={320} width={320}
                    />
                </div>
            )
        }
        else{
            return (
                <div className={style.container}>
                    <Row>
                        <Col className={style.contestContainer} md={{ span: 10}}>
                            {this.renderProfileCard(user)}
                        </Col>
                    </Row>
                </div>
            );
        }
    };


    render() {
        if(!this.props.user){
            return (
                <Container>
                    <Row>User profile not found</Row>
                </Container>
            );
        } else {
            return (
                <Row className={style.fullHeight}>
                    <Col className={style.clearLeft} md={{ span: 6, offset:3}}>
                        <div className={style.content}>
                            {
                                this.renderUser()
                            }
                        </div>
                    </Col>
                </Row>
            );
        }
    }
}

const mapStateToProps = (state) =>{
    const {user, isFetching} = state.authReducer;
    console.log(user)

    return { user, isFetching };
};

const mapDispatchToProps = (dispatch) => ({
    editUser: (id) => dispatch(editUser(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);


