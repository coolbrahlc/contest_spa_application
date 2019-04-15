import { connect } from "react-redux";
import {logout, auth} from "../../actions/actionCreator";
import React, {useState, useEffect, Component } from 'react';
import style from "./Home.module.scss";
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

const homeText =[
    "a Company",
    "a Brand",
    "a Website",
    "a Service",
    "a Book",
    "a Business",
    "an App",
    "a Product",
    "a Startup"
];

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            styleName: style.headline__static
        }
    }
    renderHomeText()  {
        const text = homeText[this.state.index % homeText.length];
        return <span className={this.state.styleName}>{text}</span>;
    }


    componentDidMount() {
        this.timeout = setInterval(() => {
            this.setState({
                index: this.state.index+1,
                styleName: style.headline__static
            });
        }, 3000);

    }
    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    render() {
        return (
            <>
                <div>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className={style.content}>
                                    <div className={style.headline}>
                                        <span>Find the Perfect Name for</span>
                                        {
                                            this.renderHomeText()
                                        }
                                    </div>
                                    <p>Launch a naming contest to engage hundreds of naming
                                        experts as you’re guided through our agency-level naming process.
                                        Or, explore our hand-picked collection of premium names
                                        available for immediate purchase</p>
                                </div>
                            </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
