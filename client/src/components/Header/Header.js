import React, {Component} from "react";
import {Link} from "react-router-dom";
import style from "./Header.module.scss";
import { connect } from "react-redux";
import Logo from "../../images/squadhelp-logo-color.jpg";
import { Container, Row, Col, Navbar, Nav, Dropdown } from 'react-bootstrap';
import {logout, auth} from "../../actions/actionCreator";
import {publicURL} from "../../api/baseURL";
import pic from "../../images/profilePic.jpeg";

class Header extends Component{

    onClick = () => {
        if(window.localStorage){
            window.localStorage.removeItem('token');
            this.props.logout();
            this.props.history.push('/');
        }
    };

    toUserProfile = () => {
        this.props.history.push('/profile');
    };

    renderProfilePic= (profilePic) => {
        if (profilePic) {
            return <img key={profilePic} onClick={this.toUserProfile} className={style.myImg} src={publicURL+profilePic} alt="img"/>
        } else {
            return <img key={pic} className={style.myImg} src={pic} alt="img"/>
        }
    };

    renderTopBar = () => {
        const {user} = this.props;
        if(user){
            return (
                <>
                    <Col md={{size: 2, offset: 10}}>
                        <div className={style.headerActions}>
                            <div >
                                {this.renderProfilePic(user.profile_picture)}
                            </div>
                            <div>
                                <Dropdown className={style.headerMenu}>
                                    <Dropdown.Toggle id="dropdown-basic" className={style.headerButton}>
                                        {user.full_name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Header>Options</Dropdown.Header>
                                        <Dropdown.Divider />
                                        <Dropdown.Item><Link to={"/profile"}>Profile</Link></Dropdown.Item>
                                        <Dropdown.Item><Link to={"/dashboard"}>Dashboard</Link></Dropdown.Item>
                                        <Dropdown.Item><p onClick={this.onClick}>Logout</p></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                    </Col>
                </>
            );
        }
        else{
            return (
                <Col md={{size: 3, offset: 9}} className={style.fullHeight}>
                    <ul className={style.topHeaderElement}>
                        <li className={style.topHeaderElement__bordered}>
                            <Link to="/login">Login</Link>
                        </li>
                        <li className={style.topHeaderElement__bordered}>
                            <Link to="/register">Sign Up</Link>
                        </li>
                    </ul>
                </Col>
            );
        }
    };
    renderCreateLink () {
        var {user} = this.props;
        if (user) {
            if (user.role!==1) {
                return (
                    <div >
                        <Link className={style.link} to="/contest">CONTESTS</Link>
                    </div>
                )
            }
        }
    }

    render() {
        const {user} = this.props;
        return(
            <>
                <div className={style.announcement}>
                    <span>Squadhelp recognized as one of the Most Innovative Companies by Inc Magazine.</span>
                </div>
                <div className={style.topHeader}>
                    <Container className={style.fullHeight}>
                        <Row className={style.fullHeight}>
                            {
                                this.renderTopBar()
                            }
                        </Row>
                    </Container>
                </div>
                <div className={style.botHeader}>
                    <Container>
                        <Row>
                            <Navbar className={"container-fluid"}>
                                <Navbar.Brand className="mr-md-2" >
                                    <Link to={"/"}>
                                        <img className={style.logo} src={Logo} alt={"Logo"}/>
                                    </Link>
                                </Navbar.Brand>
                                <Nav className="ml-auto">
                                    {
                                        this.renderCreateLink()
                                    }

                                    <div>
                                        <Link className={style.link} to="/dashboard">DASHBOARD</Link>
                                    </div>
                                </Nav>
                            </Navbar>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    return {user};
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    auth: () => dispatch(auth())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
