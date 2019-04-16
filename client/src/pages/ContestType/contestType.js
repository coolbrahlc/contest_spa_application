import React, { Component } from 'react';
import {GridLoader} from "react-spinners";
import {collectFormData, getSelects} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import style from "./contestType.module.scss";
import { Container, Row, Col } from 'react-bootstrap';
import {nameContestSchema, logoContestSchema, taglineContestSchema} from "../../utils/validation";
import ProgressBar from '../../components/ProgressBar/ProgressBar'


const contObj = {
    name: 'Name',
    logo: 'Logo',
    tagline: 'Tagline',
};

const validationObj = {
    name: nameContestSchema,
    logo: logoContestSchema,
    tagline: taglineContestSchema,
};


class  contestType extends Component {

    constructor(props) {
        super(props);
        let contestType;
        if (!props.editMode) {
            contestType = this.props.location.state.contestType;
        } else {
            contestType = props.type.toLowerCase()
        }

        let data ={};
        if (props.dataContest) {
            data = props.dataContest;
        }
        if (this.props.contestFormData) {
            if (this.props.contestFormData.has(`${contestType}Form`)) {
                data = JSON.parse(this.props.contestFormData.getAll(`${contestType}Form`));
            }
        }
        const {name, type_of_title, preferences, industry, type_of_work,
            target_customer, venture_name, days_passed } = data;
        this.state= {
            contestType: contestType,
            contestName: name? name : '',
            typeOfName: type_of_title? type_of_title : 'Company',
            preferences: preferences ? preferences : 'Classic',
            industry: industry? industry : '',
            typeOfWork: type_of_work ? type_of_work : '',
            targetCustomer: target_customer ? target_customer : '',
            nameFile: '',
            nameFileValue: null,
            length: days_passed ? days_passed : 0,
            ventureName: venture_name? venture_name: '',
        }
    }

    componentDidMount() {
        const order = this.props.contestsToInsert;
        const { editMode, history, selects, getSelects } =this.props;
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
        this.setState({
            nameFileValue:e.target.files[0]
        });
    };


    getErrorsFromValidationError = (validationError) => {
        const FIRST_ERROR = 0;
        return validationError.inner.reduce((errors, error) => {
            return {
                ...errors,
                [`${error.path}Error`]: error.errors[FIRST_ERROR],
            }
        }, {})
    };

    onClickNext = async () => {
        const {contestType} = this.state;
        try {
            const valid = await validationObj[contestType].validate(this.state, { abortEarly: false });
            if (valid) {
                this.sendContestData();
            }
        } catch (e) {
            const errObj = this.getErrorsFromValidationError(e);
            this.setState(errObj);
        }

    };


    sendContestData = () => {
        let bodyFormData;
        if (!this.props.contestFormData) {
            bodyFormData = new FormData();
        } else {
            bodyFormData = this.props.contestFormData;
        }
        const {contestType, contestName, typeOfName, preferences, industry,
            typeOfWork, targetCustomer, length, nameFileValue}= this.state;
        const {editMode, contestsToInsert, collectFormData, update, contest, history}= this.props;

        bodyFormData.set(`${contestType}Form`, JSON.stringify({
            type: contObj[contestType],
            name: contestName,
            type_of_title: typeOfName,
            preferences: preferences,
            industry: industry,
            type_of_work:typeOfWork,
            target_customer: targetCustomer,
            days_passed: length,
            venture_name: this.state.ventureName,
        }));
        if (nameFileValue) {
            bodyFormData.append(`${contestType}File`, nameFileValue);
        }

        if (!editMode) {
            collectFormData(bodyFormData);
            const order = contestsToInsert;
            const nextStep = order.indexOf(contestType)+1;

            if (nextStep === order.length) {
                history.push({ pathname: '/checkout' });
            } else {
                history.push({ pathname: '/'+ order[nextStep], state: { contestType: order[nextStep]} });
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
            [name]: value,
            [`${name}Error`]: null
    });
    };

    renderForm = () => {
        const {contestType} =this.state;
        const {contestNameError, targetCustomerError, industryError, lengthError, ventureNameError} = this.state;

        return (
            <div>
                <div className={style.inputDefault}>
                    <input type="text"
                           placeholder="Contest name"
                           name="contestName"
                           value={this.state.contestName}
                           onChange={this.handleInputChange}/>
                </div>
                {contestNameError &&	<div className={style.error}>{contestNameError}</div>}


                { contestType!=='name' &&
                    <>
                        <div className={style.inputDefault}>
                            <input type="text"
                                   placeholder="Venture name"
                                   name="ventureName"
                                   value={this.state.ventureName}
                                   onChange={this.handleInputChange}/>
                        </div>
                        {ventureNameError &&	<div className={style.error}>{ventureNameError}</div>}
                    </>
                }


                <div className={style.inputDefault}>
                    <input type="text"
                           placeholder="Industry"
                           name="industry"
                           value={this.state.industry}
                           onChange={this.handleInputChange}/>
                </div>
                {industryError &&	<div className={style.error}>{industryError}</div>}

                {contestType === 'name' &&
                    <div className={style.formSection}>
                        <select value={this.state.typeOfName}
                                name="typeOfName"
                                className={style["form-control"]}
                                onChange={this.handleInputChange}>
                            {
                                this.getSelects("name_type").map(select => (
                                    <option key={select} value={select}>{select}</option>))
                            }
                        </select>
                    </div>
                }

                <div className={style.inputDefault}>
                    <input type="text"
                           placeholder="Target customer"
                           name="targetCustomer"
                           value={this.state.targetCustomer}
                           onChange={this.handleInputChange}/>
                </div>
                {targetCustomerError &&	<div className={style.error}>{targetCustomerError}</div>}


                {contestType === 'name' &&
                    <>
                        <div className={style.formSection}>
                            <select value={this.state.preferences}
                                    className={style["form-control"]}
                                    name="preferences"
                                    onChange={this.handleInputChange}>
                                {
                                    this.getSelects("name_style").map(select => (
                                        <option key={select} value={select}>{select}</option>))
                                }
                            </select>
                        </div>
                    </>

                }

                {contestType === 'tagline' &&
                    <div className={style.formSection}>
                        <select value={this.state.preferences}
                                name="preferences"
                                className={style["form-control"]}
                                onChange={this.handleInputChange}>
                            {
                                this.getSelects("tagline").map(select => (
                                    <option key={select} value={select}>{select}</option>))
                            }
                        </select>
                    </div>
                }

                {contestType === 'logo' &&
                    <div className={style.formSection}>
                        <select value={this.state.preferences}
                                name="preferences"
                                className={style["form-control"]}
                                onChange={this.handleInputChange}>
                            {
                                this.getSelects("logo").map(select => (
                                    <option key={select} value={select}>{select}</option>))
                            }
                        </select>
                    </div>
                }

                <div className={style.inputDefault}>
                    <input type="number"
                           placeholder="Contest length"
                           name="length"
                           value={this.state.length}
                           onChange={this.handleInputChange}/>
                </div>
                {lengthError &&	<div className={style.error}>{lengthError}</div>}

                <div className={style.formSection}>
                    <input type="file"
                           name="nameFile"
                           onChange={this.onChangeFile} />
                </div>
            </div>
        )
    };



    render() {
        const { editMode, isFetching } =this.props;
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
                                <div className={style.navigationMenu__nextButton} onClick={this.onClickNext}>
                                    Next
                                </div>
                            </Col>
                        </Row>
                        :
                        <Row className={style.navigationMenu}>
                            <Col md={6}>
                                <div className={style.navigationMenu__nextButton} onClick={this.onClickNext}>
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

export default connect(mapStateToProps, mapDispatchToProps)(contestType);



