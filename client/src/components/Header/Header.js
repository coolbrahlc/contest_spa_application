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

    renderProfilePic= (profilePic) => {
        if (profilePic) {

            return <div className={style.image}><img key={profilePic} className="img-fluid h-100" src={publicURL+profilePic} alt="img"/></div>
        } else {
            return <div className={style.image}><img key={pic} className="img-fluid h-100" src={pic} alt="img"/></div>
        }
    };

    renderTopBar = () => {
        const {user} = this.props;
        if(user){
            return (
                <>
                    <Col md={{size: 2, offset: 10}}>
                        <Row>
                            <Col md={{size: 6}}>
                                {this.renderProfilePic(user.profile_picture)}
                            </Col>
                            <Col md={{size: 6}}>
                                <Dropdown className={style.headerMenu}>
                                    <Dropdown.Toggle id="dropdown-basic" className={style.headerButton}>
                                        {user.full_name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Header>Options</Dropdown.Header>
                                        <Dropdown.Divider />
                                        <Dropdown.Item>Profile</Dropdown.Item>
                                        <Dropdown.Item><Link to={"/dashboard"}>Dashboard</Link></Dropdown.Item>
                                        <Dropdown.Item><p onClick={this.onClick}>Logout</p></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>

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
        const {user} = this.props;
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
