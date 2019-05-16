import React, { Component } from 'react';
import {GridLoader} from "react-spinners";
import {collectFormData, dataClear, getSelects} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import style from "./contestType.module.scss";
import { Container, Row, Col } from 'react-bootstrap';
//import ProgressBar from '../../components/ProgressBar/ProgressBar'
import NameForm from '../../components/ContestTypeForm/NameForm'
import LogoForm from '../../components/ContestTypeForm/LogoForm'
import TaglineForm from '../../components/ContestTypeForm/TaglineForm'
import { submit } from 'redux-form'

const formType = {
    name: NameForm,
    logo: LogoForm,
    tagline: TaglineForm,
};

class  contestType extends Component {

    constructor(props) {
        super(props);
        let contestType;
        if (props.editMode) {
            contestType = props.type.toLowerCase();
        } else {
            contestType = this.props.location.state.contestType;
        }
        this.state= {
            contestType
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
    // getErrorsFromValidationError = (validationError) => {
    //     const FIRST_ERROR = 0;
    //     return validationError.inner.reduce((errors, error) => {
    //         return {
    //             ...errors,
    //             [`${error.path}Error`]: error.errors[FIRST_ERROR],
    //         }
    //     }, {})
    // };
    // onClickNext = async () => {
    //     const {contestType} = this.state;
    //     try {
    //         const valid = await validationObj[contestType].validate(this.state, { abortEarly: false });
    //         if (valid) {
    //             this.sendContestData();
    //         }
    //     } catch (e) {
    //         const errObj = this.getErrorsFromValidationError(e);
    //         this.setState(errObj);
    //     }
    // };
    onClickNext = () => {
        const { nameSubmit, logoSubmit, taglineSubmit } = this.props;
        const { contestType } = this.state;
        const submitObj =  {
            'name': nameSubmit,
            'logo': logoSubmit,
            'tagline': taglineSubmit,
        };
        submitObj[contestType]();
    };

    collectData = (data) =>{
        const { contestType } = this.state;
        const {contestsToInsert, history, collectFormData, contestFormData, editMode, update, contest, dataClear}= this.props;
        const { nameFile }= data;
        let bodyFormData;
        if (!contestFormData) {
            bodyFormData = new FormData();
        } else {
            bodyFormData = contestFormData;
        }
        data.type = contestType.charAt(0).toUpperCase() + contestType.slice(1);
        bodyFormData.set(`${contestType}Form`, JSON.stringify(data));
        if (nameFile) {
            bodyFormData.append(`${contestType}File`, nameFile);
        }
        if (editMode) {
             update({
                data: bodyFormData,
                id: contest.id
            });
            return dataClear();
        }
        collectFormData(bodyFormData);
        const order = contestsToInsert;
        const nextStep = order.indexOf(contestType) + 1;
        if (nextStep === order.length) {
            history.push({pathname: '/checkout'});
        } else {
            history.push({pathname: '/' + order[nextStep], state: {contestType: order[nextStep]}});
        }
    };

    renderForm = () => {
        const {contestType} = this.state;
        const Form = formType[contestType];

        return (
            <div className={style.formStyle}>
                <Form
                    contestType={contestType}
                    selects={this.props.selects}
                    onSubmit={ (data)=> this.collectData(data)}
                />
            </div>
        )
    };

    render() {
        const { editMode, isFetching } = this.props;
        return ( isFetching ?
                <div className={style.loader}>
                    <GridLoader loading={isFetching}
                                color={'#28D2D1'}
                                height={160} width={160}
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
                                <div className={style.navigationMenu__prevButton} onClick={()=>this.props.history.goBack()}>
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
    let {contestsToInsert, contestFormData, selects, isFetching} = state.contestCreateReducer;
    const formReducer = state.form;
    return {contestsToInsert, contestFormData, selects, isFetching, formReducer}
};

const mapDispatchToProps =(dispatch) => ({
    dataClear: () => dispatch(dataClear()),
    getSelects: () => dispatch(getSelects()),
    collectFormData: (formData) => dispatch(collectFormData(formData)),
    nameSubmit: () => dispatch(submit('NameForm')),
    logoSubmit: () => dispatch(submit('LogoForm')),
    taglineSubmit: () => dispatch(submit('TaglineForm')),
});

export default connect(mapStateToProps, mapDispatchToProps)(contestType);



