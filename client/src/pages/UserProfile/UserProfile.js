import React, { Component } from 'react';
import '../../App.css';
import {GridLoader} from "react-spinners";
import connect from "react-redux/es/connect/connect";
import style from "./UserProfile.module.scss";
import {editUser, creativeCheckout} from "../../actions/actionCreator"
import { Container, Row, Col } from 'react-bootstrap';
import {publicURL} from "../../api/baseURL";
import pic from "../../images/profilePic.jpeg";


class  UserProfile extends Component {

    constructor(props) {
        super(props);
        const {full_name, email} = props.user;
        this.state= {
            editMode: false,
            fullName: full_name ? full_name :'',
            email: email? email :'',
            profilePic: null,
            checkoutAmount: 0,
            cardNumber: ''
        }
    }

    componentDidMount() {
    }

    changeMode =  () => {
        this.setState({
            editMode: !this.state.edgeMode
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
                           name="fullName"
                           value={this.state.fullName}
                           onChange={this.handleInputChange}/>
                </div>
                <div className={style.inputDefault}>
                    <input type="text"
                           placeholder="Contest name"
                           name="email"
                           value={this.state.email}
                           onChange={this.handleInputChange}/>
                </div>
                <div className={style.formSection}>
                    <input type="file"
                           name="profilePic"
                           onChange={this.onChangeFile} />
                </div>
                <div onClick={this.submitEdit}>Edit</div>
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
        this.props.editUser(profileForm);
    };

    renderEditButton = () => {
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

    checkout = () => {
        const {checkoutAmount, cardNumber} = this.state;
        const {user, creativeCheckout} = this.props;
        if (cardNumber.length===19 && checkoutAmount>0) {
            creativeCheckout({
                checkoutAmount,
                cardNumber,
                id: user.id,
            });
            this.setState({
                checkoutAmount: 0,
                cardNumber: ''
            })
        } else {
            console.log('validation err')
        }
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
                        <li className={style.brief__wide}>
                            <div>
                                <h5>Your balance</h5>
                                <p>{account} $</p>
                            </div>
                        </li>
                        <li className={style.brief__wide}>
                            <div className="d-flex flex-column">
                                <h5>Checkout</h5>
                                <input type="number" name="checkoutAmount"
                                       placeholder='Amount'
                                       value={this.state.checkoutAmount}
                                       onChange={this.handleInputChange}/>

                                <input type="text" name="cardNumber"
                                       placeholder='Card number'
                                       value={this.state.cardNumber}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <div className={style.link} onClick={()=>this.checkout()}>Checkout</div>
                        </li>
                    </ul>
                </div>}
            </div>
        );
    };

    renderUser = () => {
        const {isFetching, user, editError} = this.props;
        if(!isFetching){
            return (
                <div className={style.container}>
                    <Row>
                        <Col className={style.contestContainer} md={{ span: 12}}>
                            {this.renderProfileCard(user)}
                            {editError && <div>{editError}</div>}
                        </Col>
                    </Row>
                </div>
            );
        }
    };

    render() {
        const {isFetching, user, editError} = this.props;
        if(!user){
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
    const {user, editError} = state.authReducer;
    return { user, editError };
};

const mapDispatchToProps = (dispatch) => ({
    editUser: (id) => dispatch(editUser(id)),
    creativeCheckout: (data) => dispatch(creativeCheckout(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);


