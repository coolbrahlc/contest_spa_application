import React, { Component } from 'react';
import '../../App.css';
//import {GridLoader} from "react-spinners";
import {dataClear, setContestOrder} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import style from "./CreateContest.module.scss";
import { Container, Row, Col } from 'react-bootstrap';
import ContestCreateCard from "../../components/ContestCreateCard/ContestCreateCard";
import NameBlue from "../../images/Company-Names_blue.png";
import TagBlue from "../../images/Taglines_blue.png";
import LogoBlue from "../../images/Logos_blue.png";


class  CreateContest extends Component {


    componentDidMount() {
       const {user, history} = this.props;
       if (!user || (user.role===1)){
           history.push({
               pathname: '/',
           })
       }
    }

    clickHandler = (data) => {
        const arr = data.map(el => el.toLowerCase().trim());
        this.props.setContestOrder(arr);
        this.props.dataClear();
        this.props.history.push({
            pathname: '/'+arr[0],
            state: { contestType: arr[0]}
        })
    };


    render() {
        return (
                <>
                    <div className={style.mostPopularCategories}>
                        <Container>
                            <Row>
                                <Col md={12} sm={12} lg={12}>
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
                                            <ContestCreateCard type={['Name']}
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
                                            <ContestCreateCard type={['Tagline']}
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
                                            <ContestCreateCard type={['Logo']}
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
                                                type={['Name ', 'Tagline ', 'Logo ']}
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
                                                type={['Name ', 'Tagline']}
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
                                                type={['Name ', 'Logo']}
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
                                                type={['Tagline ', 'Logo']}
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
    const {user} = state.authReducer;
    return user
};

const mapDispatchToProps =(dispatch) => ({
    setContestOrder: (arr) => dispatch(setContestOrder(arr)),
    dataClear: () => dispatch(dataClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateContest);


