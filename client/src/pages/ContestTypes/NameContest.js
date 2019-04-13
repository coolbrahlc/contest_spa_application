import React, { Component } from 'react';
import {GridLoader} from "react-spinners";
import {collectFormData, getSelects} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import style from "./NameContest.module.scss";
import { Container, Row, Col } from 'react-bootstrap';



class  NameContest extends Component {

    constructor(props) {
        super(props);
        let data ={};
        if (props.dataContest) {
            data = props.dataContest;
        }
        if (this.props.contestFormData) {
            data = JSON.parse(this.props.contestFormData.getAll("nameForm"));
        }
        const {name, type_of_title, preferences, industry, type_of_work, target_customer} = data;
        this.state= {
            contestType: 'Name',
            contestName: name? name : '',
            typeOfName: type_of_title? type_of_title : 'Company',
            nameStyle: preferences ? preferences : 'Classic',
            industry: industry? industry : '',
            typeOfWork: type_of_work ? type_of_work : '',
            targetCustomer: target_customer ? target_customer : '',
            nameFile: '',
            nameFileValue: null,
            length: 0
        }
    }

    componentDidMount() {
        const order = this.props.contestsToInsert;
        const {editMode, history, selects, getSelects} =this.props;
        if (!order  && !editMode) {
            history.push({pathname: '/' });
        } else {
            !selects && getSelects()
        }
    }

    getSelects(type) {
        const {selects} = this.props;
        return selects.filter(name => (name.contest_type === type)).map(name =>name.name );
    }

    onChangeFile =  (e) => {
        console.log(e.target.files[0]);
        this.setState({
            nameFileValue:e.target.files[0]
        });
    };

    sendContestData = () => {
        const bodyFormData = new FormData();
        const {contestName, typeOfName, nameStyle, industry, typeOfWork, targetCustomer, length, nameFileValue}= this.state;
        const {editMode, contestsToInsert, collectFormData, update, contest, history}= this.props;

        bodyFormData.set("nameForm", JSON.stringify({
            type: "Name",
            name: contestName,
            type_of_title: typeOfName,
            preferences:nameStyle,
            industry: industry,
            type_of_work:typeOfWork,
            target_customer: targetCustomer,
            days_passed: length,
        }));
        if (nameFileValue) {
            bodyFormData.append("NameFile", nameFileValue);
        }
        if (!editMode) {
            collectFormData(bodyFormData);
            let order = contestsToInsert;
            let nextStep = order.indexOf('name')+1;
            if (nextStep === order.length) {
                history.push({ pathname: '/checkout' });
            } else {
                history.push({ pathname: '/'+ order[nextStep] });
            }
        } else {
            update({
                data: bodyFormData,
                id: contest.id
            })
        }
    };

    handlePrevClick = () => {
        this.props.history.goBack();
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
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
                    <select value={this.state.typeOfName}
                            name="typeOfName"
                            className={style["form-control"]}
                            onChange={this.handleInputChange}>
                        {
                            this.getSelects("name_type").map(select => ( <option key={select} value={select}>{select}</option>) )
                        }
                    </select>
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
                           name="typeOfWork"
                           value={this.state.typeOfWork}
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
                    <select value={this.state.nameStyle}
                            className={style["form-control"]}
                            name="nameStyle"
                            onChange={this.handleInputChange}>
                        {
                            this.getSelects("name_style").map(select => ( <option key={select} value={select}>{select}</option>))
                        }
                    </select>
                </div>

                <div className={style.formSection}>
                    <input type="number"
                           placeholder="Contest length"
                           name="length"
                           value={this.state.length}
                           onChange={this.handleInputChange}/>
                </div>
                <div className={style.formSection}>
                    <input type="file"
                           name="nameFile"
                           onChange={this.onChangeFile} />
                </div>
            </div>
        )
    };


    render() {
        const {editMode, isFetching} =this.props;
        return ( isFetching ?
                <div className={style.loader}>
                    <GridLoader loading={isFetching}
                                color={'#28D2D1'}
                                height={320} width={320}
                    />
                </div>
            :
            <>
                {!editMode &&
                    <div className={style["heading-steps"]}>
                        <Container>
                            <Row>
                                <Col md={5}>
                                    <h2>Company {this.state.contestType}</h2>
                                    <p>Tell us a bit more about your business as well
                                        as your preferences so that creatives get a better
                                        idea about what you are looking for</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                }
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
                    {!editMode ?
                        <Row className={style.navigationMenu}>
                            <Col md={6}>
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
                        :
                        <Row className={style.navigationMenu}>
                            <Col md={6}>
                                <div className={style.navigationMenu__nextButton} onClick={this.sendContestData}>
                                    Submit editing
                                </div>
                            </Col>
                        </Row>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(NameContest);



