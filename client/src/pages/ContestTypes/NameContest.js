import React, { Component } from 'react';
import {GridLoader} from "react-spinners";
import {collectFormData, getSelects} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import style from "./NameContest.module.scss";
//import sheme from "../../utils/nameFormValidation";
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
        this.state= {
            contestType: 'Name',
            contestName: data.name,
            typeOfName: data.type_of_title,
            nameStyle: data.preferences,
            industry: data.industry,
            typeOfWork: data.type_of_work,
            targetCustomer: data.target_customer,
            nameFile: '',
            nameFileValue: null,
        }
    }

    componentDidMount() {
        const order = this.props.contestsToInsert;
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
            nameFileValue:e.target.files[0]
        });
    };

    sendContestData = () => {

        let bodyFormData = new FormData();

        bodyFormData.set("nameForm", JSON.stringify({
            type: "Name",
            name: this.state.contestName,
            type_of_title: this.state.typeOfName,
            preferences: this.state.nameStyle,
            industry: this.state.industry,
            type_of_work: this.state.typeOfWork,
            target_customer: this.state.targetCustomer,
        }));
        if (this.state.nameFileValue) {
            bodyFormData.append("NameFile", this.state.nameFileValue);
        }

        if (!this.props.editMode) {
            this.props.collectFormData(bodyFormData);
            
            let order = this.props.contestsToInsert;
            let nextStep = order.indexOf('name')+1;
            
            if (nextStep === order.length) {
                this.props.history.push({
                    pathname: '/checkout'
                });
            } else {
                this.props.history.push({
                    pathname: '/'+ order[nextStep],
                });
            }
            
        } else {
            this.props.update({
                data: bodyFormData,
                id: this.props.contest.id
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
                            defaultValue={'Company'}
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
                            defaultValue={'Classic'}
                            name="nameStyle"
                            onChange={this.handleInputChange}>
                        {
                            this.getSelects("name_style").map(select => ( <option key={select} value={select}>{select}</option>))
                        }
                    </select>
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
        const {isFetching} = this.props;

        return ( isFetching ?                 
                <div className={style.loader}>
                    <GridLoader loading={isFetching}
                                color={'#28D2D1'}
                                height={320} width={320}
                    />
                </div>
            :
            <>                
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

export default connect(mapStateToProps, mapDispatchToProps)(NameContest);



