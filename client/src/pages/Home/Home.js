import { connect } from "react-redux";
import {logout, auth} from "../../actions/actionCreator";
import React, { Component } from 'react';
import style from "./Home.module.scss";
import { Container, Row, Col } from 'react-bootstrap';
import {Link} from "react-router-dom";


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
                <div className={style.container}>
                    <div className={style.headerBar}>
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
                        <div className={style.button}>
                            <Link className={style.button__link} to="/dashboard">DASHBOARD</Link>
                        </div>
                    </div>
                    <div className={style.greyContainer}>
                        Slider
                    </div>
                    <div className={style.container__description}>
                        <h2 className={style.blueUnderline}>Why Squadhelp?</h2>
                        <div className={style.cardContainer}>
                            <div className={style.card}>
                                <img src={require("../../images/home/more-benifits-world-icon.png")} alt="globe"/>
                                <h3>Largest Naming Community</h3>
                                <p>Our unique approach allows you to receive an unmatched breadth of business
                                    name ideas from world's largest community of naming experts.
                                    With 75,000+ creatives and 15,000+ successful naming projects,
                                    Squadhelp is by far the largest naming platform across the globe .</p>
                            </div>
                            <div className={style.card}>
                                <img src={require("../../images/home/more-benifits-high-quality-icon.png")} alt="desktop"/>
                                <h3>High Quality & Collaboration</h3>
                                <p>Using an advanced Quality Scoring Algorithm and Machine Learning,
                                    we ensure that you receive more ideas from our top-quality creatives,
                                    and Gamification best practices ensure two-way communication throughout your contest.</p>
                            </div>
                            <div className={style.card}>
                                <img src={require("../../images/home/more-benifits-trademark-icon.png")} alt="cards"/>
                                <h3>Agency-Level Features</h3>
                                <p>Squadhelp's high end Audience Testing service allows you to poll your target
                                    demographics to get unbiased feedback on your favorite names.
                                    Also receive Trademark support from our team of Licensed Trademark Attorneys,
                                    so you can pick your name with confidence.</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.greyContainer}>
                        <div className={style.adv}>
                            <div className={style.images}>
                                <img src={require("../../images/sponsors/Forbes-inactive.png")} alt="forbes"/>
                                <img src={require("../../images/sponsors/Forbes-active.png")} alt="forbes"/>
                            </div>
                            <div className={style.images}>
                                <img src={require("../../images/sponsors/the_next_web_inactive.png")} alt="web"/>
                                <img src={require("../../images/sponsors/the_next_web_active.png")} alt="web"/>
                            </div>
                            <div className={style.images}>
                                <img src={require("../../images/sponsors/mashable-inactive.png")} alt="mashable"/>
                                <img src={require("../../images/sponsors/mashable-active.png")} alt="mashable"/>
                            </div>
                        </div>
                        <div className={style.stats}>
                            <div className={style.vertical}>
                                <div>119,525</div>
                                <span>Creatives</span>
                            </div>
                            <div className={style.vertical}>
                                <div>21,875</div>
                                <span>Customers</span>
                            </div>
                            <div className={style.vertical}>
                                <div>85</div>
                                <span>Industries</span>
                            </div>
                        </div>
                    </div>
                    <h2>How Do Name Contest Work?</h2>
                    <div className={style.whiteContainer}>
                        <div className={style.stepReverse}>
                            <div>
                                <h3>Step 1: Launch a Naming Contest</h3>
                                <p>
                                    <i className="fas fa-check"/>
                                    <span>Start your project right with our proven Naming Brief template</span>
                                </p>
                                <p>
                                    <i className="fas fa-check"/>
                                    <span>We’ll walk you through exactly what you need to share about your project
                                    in order to get an awesome Name</span>
                                </p>
                            </div>
                            <img src={require("../../images/1-compressed.gif")} alt="compressed"/>
                        </div>
                    </div>
                    <div className={style.greenContainer}>
                        <div className={style.step}>
                            <img src={require("../../images/2-compressed-new.gif")} alt="compressed"/>
                            <div className={style.greenStep}>
                                <h3>Step 2: Ideas start pouring in within minutes</h3>
                                <p>
                                    <i className="fas fa-check"/>
                                    <span>100s of naming experts start submitting name ideas</span>
                                </p>
                                <p>
                                    <i className="fas fa-check"/>
                                    <span>Names automatically checked for URL availability</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={style.greyContainer}>
                        <div className={style.stepReverse}>
                            <div>
                                <h3>Step 3: Rate Entries & Brainstorm with Creatives</h3>
                                <p>
                                    <i className="fas fa-check"/>
                                    <span>Provide instant feedback on Names</span>
                                </p>
                                <p>
                                    <i className="fas fa-check"/>
                                    <span>Send private feedback or public messages to all creatives</span>
                                </p>
                                <p>
                                    <i className="fas fa-check"/>
                                    <span>The more entries you rate - the submissions get better and better</span>
                                </p>
                            </div>
                            <img src={require("../../images/3-compressed.gif")} alt="compressed"/>
                        </div>
                    </div>
                    <div className={style.headerBar}>
                        <h3>Names For Sale</h3>
                        <p className={style.blueUnderline}>Not interested in launching a contest?
                            Purchase a name instantly from our hand-picked
                            collection of premium names. Price includes a complimentary Trademark Report,
                            a Domain name as well as a Logo design</p>
                    </div>
                    {/*<SlideBar images={exampleSliderImages} exampleSlider/>*/}
                    <div className={style.button}>
                        <Link className={style.button__link} to="/dashboard">DASHBOARD</Link>
                    </div>
                    <div className={style.blueContainer}>
                        <h2 className={style.whiteUnderline}>What our customers say</h2>
                        {/*<SlideBar images={feedbackSliderImages} feedbackSlider/>*/}
                    </div>
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
