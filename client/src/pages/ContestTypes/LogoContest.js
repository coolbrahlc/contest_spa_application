import React, { Component } from 'react';
import {GridLoader} from "react-spinners";
import {collectFormData, getSelects} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import style from "./NameContest.module.scss";
import { Container, Row, Col } from 'react-bootstrap';

class  LogoContest extends Component {
    
    constructor(props) {
        super(props);
        let data ={};
        if (props.dataContest) {
            data = props.dataContest;
        }
        if (this.props.contestFormData){
            if (this.props.contestFormData.has("logoForm")) {
                data = JSON.parse(this.props.contestFormData.getAll("logoForm"));
            }
        }

        this.state= {
            contestType: 'Logo',
            contestName: '',
            industry: data.industry,
            ventureName: data.venture_name,
            typeOfWork: data.type_of_work,
            targetCustomer: data.target_customer,
            logoSelectsValue: data.preferences,
            nameFile: "",
            logoFileValue: null
        }
    }

    componentDidMount() {
        let order = this.props.contestsToInsert;
        const {editMode} =this.props;
        if (!order  && !editMode) {
            this.props.history.push({
                pathname: '/'
            });
        } else {
            this.props.getSelects()
        }
    }

    getSelects(type) {
        const selects = this.props.selects;
        return selects.filter(name => (name.contest_type === type)).map(name =>name.name );
    }

    onChangeFile =  (e) => {
        console.log(e.target.files[0]);
        this.setState({
            logoFileValue:e.target.files[0]
        });

    };

    sendContestData = () => {

        let bodyFormData;

        if (!this.props.contestFormData) {
            bodyFormData = new FormData();
        } else {
            bodyFormData = this.props.contestFormData;
        }

        bodyFormData.set("logoForm", JSON.stringify({
            type: "Logo",
            name: this.state.contestName,
            preferences: this.state.logoSelectsValue,
            industry: this.state.industry,
            venture_name: this.state.ventureName,
            type_of_work: this.state.typeOfWork,
            target_customer: this.state.targetCustomer,
        }));

        if (this.state.logoFileValue) {
            bodyFormData.append("LogoFile", this.state.logoFileValue);
        }

        if (!this.props.editMode) {
            this.props.collectFormData(bodyFormData);
            let order = this.props.contestsToInsert;
            this.props.setContestOrder(order);
            this.props.history.push({
                pathname: '/checkout'
            });
        } else {
            this.props.update({
                data: bodyFormData,
                id: this.props.contest.id
            })
        }
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handlePrevClick = () => {
        this.props.history.goBack();
    };

    renderForm = () => {
        return (
            <div>
                <div className={style.formSection}>
                    <input type="text"
                           placeholder="Contest name"
                           name="contestName"
                           value={this.state.contestName}
                           onChange={this.handleInputChange}/>
                </div>

                <div className={style.formSection}>
                    <input type="text"
                           placeholder="Industry"
                           name="industry"
                           value={this.state.industry}
                           onChange={this.handleInputChange}/>
                </div>

                <div className={style.formSection}>
                    <input type="text"
                           placeholder="Venture name"
                           name="ventureName"
                           value={this.state.ventureName}
                           onChange={this.handleInputChange}/>
                </div>

                <div className={style.formSection}>
                    <input type="text"
                           placeholder="Target customer"
                           name="targetCustomer"
                           value={this.state.targetCustomer}
                           onChange={this.handleInputChange}/>
                </div>

                <div className={style.formSection}>
                    <input type="text"
                           placeholder="Type Of Work"
                           name="typeOfWork"
                           value={this.state.typeOfWork}
                           onChange={this.handleInputChange}/>
                </div>

                <div className={style.formSection}>
                    <select value={this.state.logoSelectsValue}
                            name="logoSelectsValue"
                            className={style["form-control"]}
                            onChange={this.handleInputChange}>
                        {
                            this.getSelects("logo").map(select => ( <option key={select} value={select}>{select}</option>) )
                        }
                    </select>
                </div>

                <div>
                    <input type="file"
                           name="nameFile"
                           onChange={this.onChangeFile} />
                </div>

                <button onClick={this.sendContestData} value={this.state.name} >Send</button>
            </div>
        )
    }

    render() {
        const {isFetching} = this.props;

        return ( isFetching ?
                <div className={style.loader}>
                    <GridLoader loading={isFetching}
                                color={'#28D2D1'}
                                height={320} width={320}
                    />
                </div> :
                <>
                    <div className={style["heading-steps"]}>
                        <Container>
                            <Row>
                                <Col md={5}>
                                    <h2>Company  {this.state.contestType}</h2>
                                    <p>Tell us a bit more about your business as well
                                        as your preferences so that creatives get a better
                                        idea about what you are looking for</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className={style.form}>
                        <Container>
                            <Row className={style.formPadding}>
                                {
                                    this.renderForm()
                                }
                            </Row>
                        </Container>
                    </div>
                    <Container>
                        <Row className={style.navigationMenu}>
                            <Col md = {6}>
                                <p>You are almost finished. Select a pricing package in the next step</p>
                            </Col>
                            <Col md={6} className={style.navigationMenu__buttons}>
                                <div className={style.navigationMenu__prevButton} onClick={this.handlePrevClick}>
                                    Prev
                                </div>
                                <div className={style.navigationMenu__nextButton} onClick={this.sendContestData}>
                                    Next
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </>
        );
    }
}

const mapStateToProps =(state) => {
    let {contestsToInsert, contestFormData, selects, isFetching} = state.testReducer;
    return {contestsToInsert, contestFormData, selects, isFetching}
};

const mapDispatchToProps =(dispatch) => ({
    getSelects: () => dispatch(getSelects()),
    collectFormData: (formData) => dispatch(collectFormData(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoContest);




