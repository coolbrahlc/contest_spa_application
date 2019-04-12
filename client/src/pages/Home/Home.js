import { connect } from "react-redux";
import {logout, auth} from "../../actions/actionCreator";
import React, {useState, useEffect, Component } from 'react';
import style from "./Home.module.scss";
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
//import {TEXT_LOOP_TEXT} from "../../constants/constants";

const TEXT_LOOP_TEXT =[
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
    renderLoopText()  {
        const text = TEXT_LOOP_TEXT[this.state.index % TEXT_LOOP_TEXT.length];
        return <span className={this.state.styleName}>{text}</span>;
    }


    componentDidMount() {
        const timeout = setInterval(() => {
            this.setState({
                index: this.state.index+1,
                styleName: style.headline__isloading
            });
        }, 3000);

        return () => {
            this.setState({
                styleName: style.headline__static
            });
            clearInterval(timeout);
        };
    }

    render() {
        //const {style} = this.state;
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
                                            this.renderLoopText()
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


/*
import React, {useState, useEffect} from 'react';
import style from "./Home.module.scss";
import Header from "../../components/Header/Header";
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import {TEXT_LOOP_TEXT} from "../../constants/constants";

export default function Home(props) {

    const [index, setIndex] = useState(0);
    const [styleName, setStyle] = useState(style.headline__static);
    let timeout;

    useEffect(() => {

        timeout = setInterval(() => {
            setIndex(index + 1);
            setStyle(style.headline__isloading);
        }, 3000);
        return () => {
            setStyle(style.headline__static);
            clearInterval(timeout);
        };
    });

    const renderLoopText = () => {
        const text = TEXT_LOOP_TEXT[index % TEXT_LOOP_TEXT.length];
        return <span className={styleName}>{text}</span>;
    };

    return (
        <>
            <Header {...props}/>
            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className={style.content}>
                                <div className={style.headline}>
                                    <span>Find the Perfect Name for</span>
                                    {
                                        renderLoopText()
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
};

*/