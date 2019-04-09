import React, { Component } from 'react';
import '../../App.css';
import {GridLoader} from "react-spinners";
import {setContestOrder, getSelects} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import style from "./CreateContest.module.scss";
import { Container, Row, Col } from 'react-bootstrap';
import ContestCreateCard from "../../components/ContestCreateCard/ContestCreateCard";
import NameBlue from "../../images/Company-Names_blue.png";
import NameGrey from "../../images/Company-Names_grey.png";
import TagBlue from "../../images/Taglines_blue.png";
import TagGrey from "../../images/Taglines_grey.png";
import LogoBlue from "../../images/Logos_blue.png";
import LogoGrey from "../../images/Logos_grey.png";


class  CreateContest extends Component {

    constructor(props) {
        super(props);
        this.state= {
            //contestsToInsert: []
        }
    }

    componentDidMount() {
        this.props.getSelects();
        this.setState({isFetching: true});
    }

    clickHandler = (arr) => {
        this.props.setContestOrder(arr);
        this.props.history.push({
            pathname: '/'+arr[0],
        })
    };


    render() {
        return (
                <>
                    <Header {...this.props}/>
                    
                    <div className={style.mostPopularCategories}>
                        <Container>
                            <Row>
                                <Col md={12}>
                                    <div className={style.heading}>
                                        <h3>Our Most Popular <b>Categories</b></h3>
                                        <p>Pick from our most popular categories,
                                            launch a contest and begin receiving
                                            submissions right away</p>
                                        <hr/>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <ul className={style.cardHolder}>
                                        <li>
                                            <ContestCreateCard type={['name']}
                                                 img={[
                                                     NameBlue
                                                 ]}

                                                 click={this.clickHandler}
                                                 text={
                                                     "Get up and running " +
                                                     "with the perfect name"
                                                 }

                                            />
                                        </li>
                                        <li>
                                            <ContestCreateCard type={['tagline']}
                                                   img={[
                                                     TagBlue
                                                 ]}

                                                 click={this.clickHandler}
                                                 text={
                                                     "Connect deeply with your " +
                                                     "target audience with an " +
                                                     "on-target tagline"
                                                 }
                                                               
                                            />
                                        </li>
                                        <li>
                                            <ContestCreateCard type={['logo']}
                                                       img={[
                                                     LogoBlue
                                                 ]}

                                                 click={this.clickHandler}
                                                 text={
                                                     "Kickstart your venture " +
                                                     "with a unique, memorable logo"
                                                 }

                                            />
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className={style.otherCategories}>
                        <Container>
                            <Row>
                                <Col md={12}>
                                    <div className={style.otherHeading}>
                                        <h3>Save With Our Bundle Packages</h3>
                                        <p>Launch multiple contests and pay
                                            a discounted bundle price</p>
                                        <hr/>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <ul className={style.cardHolder}>
                                        <li>
                                            <ContestCreateCard
                                                type={['name', 'tagline', 'logo']}
                                                img={[
                                                     NameBlue,
                                                     TagBlue,
                                                     LogoBlue
                                                 ]}

                                                 click={this.clickHandler}

                                                 text={
                                                     "Establish your entire " +
                                                     "brand identity and save " +
                                                     "with this bundle"
                                                 }
                                                 theme={'dark'}

                                            />
                                        </li>
                                        <li>
                                            <ContestCreateCard
                                                type={['name', 'tagline']}
                                                img={[
                                                     NameBlue,
                                                     TagBlue
                                                 ]}

                                                 click={this.clickHandler}
                                                 text={
                                                     "Establish your entire " +
                                                     "brand identity and save " +
                                                     "with this bundle"
                                                 }
                                                 theme={'dark'}
                                                         
                                            />
                                        </li>
                                        <li>
                                            <ContestCreateCard
                                                type={['name', 'logo']}
                                                img={[
                                                     NameBlue,
                                                     LogoBlue
                                                 ]}

                                                 click={this.clickHandler}
                                                 text={
                                                     "Get the essentials needed " +
                                                     "to establish your brand " +
                                                     "together and save"
                                                 }
                                                 theme={'dark'}
                                                         
                                            />
                                        </li>
                                        <li>
                                            <ContestCreateCard
                                                type={['tagline', 'logo']}
                                                img={[
                                                     TagBlue,
                                                     LogoBlue
                                                 ]}

                                                 click={this.clickHandler}
                                                 text={
                                                     "Best Logo and Tagline " +
                                                     "for your business"
                                                 }
                                                 theme={'dark'}
                                            />
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </>
        );
    }

}


const mapStateToProps =(state) => {
    return {
        isFetchingUser: state.testReducer.isFetchingUser,
        user: state.testReducer.user
    }
};

const mapDispatchToProps =(dispatch) => ({
    setContestOrder: (arr) => dispatch(setContestOrder(arr)),
    getSelects: () => dispatch(getSelects())

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateContest);


