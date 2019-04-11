import React, { Component } from 'react';
import {GridLoader} from "react-spinners";
import {collectFormData, getSelects, setContestOrder} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";

class  TaglineContest extends Component {

    constructor(props) {
        super(props);
        let data ={};
        if (props.dataContest) {
            data = props.dataContest;
        }
        if (this.props.contestFormData.has("taglineForm")) {
            data = JSON.parse(this.props.contestFormData.getAll("taglineForm"));
        }
        this.state= {
            contestType: 'Tagline',
            contestName: '',
            industry: data.industry,
            ventureName: data.venture_name,
            typeOfWork: data.type_of_work,
            targetCustomer: data.target_customer,
            taglineSelectsValue: data.preferences,
            taglineSelects: [],
            nameFile: "",
            taglineFileValue: null
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
            taglineFileValue:e.target.files[0]
        });

    };

    sendContestData = () => {
        let bodyFormData;

        if (!this.props.contestFormData) {
            bodyFormData = new FormData();
        } else {
            bodyFormData = this.props.contestFormData;
        }

        bodyFormData.set("taglineForm", JSON.stringify({
            type: "Tagline",
            name: this.state.contestName,
            preferences: this.state.taglineSelectsValue,
            industry: this.state.industry,
            venture_name: this.state.ventureName,
            type_of_work: this.state.typeOfWork,
            target_customer: this.state.targetCustomer,
        }));
        if (this.state.taglineFileValue) {
            bodyFormData.append("TaglineFile", this.state.taglineFileValue);
        }

        if (!this.props.editMode) {
            this.props.collectFormData(bodyFormData);
            let order = this.props.contestsToInsert;
            let nextStep = order.indexOf('tagline')+1;
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

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    render() {
        const {isFetching} = this.props;
        return ( isFetching ? <GridLoader loading={isFetching}
                                          color={'#28D2D1'}/> :
            <div className="Users">
                <Header {...this.props}/>
                Creating title contest
                <div>
                    <input type="text"
                            placeholder="Contest name"
                            name="contestName"
                            value={this.state.contestName}
                            onChange={this.handleInputChange}/>
                </div>

                <div>
                    <input type="text"
                           placeholder="Industry"
                           name="industry"
                           value={this.state.industry}
                           onChange={this.handleInputChange}/>
                </div>

                <div>
                    <input type="text"
                           placeholder="Venture name"
                           name="ventureName"
                           value={this.state.ventureName}
                           onChange={this.handleInputChange}/>
                </div>
                <div>
                    <input type="text"
                           placeholder="Type Of Work"
                           name="typeOfWork"
                           value={this.state.typeOfWork}
                           onChange={this.handleInputChange}/>
                </div>
                <div>
                    <input type="text"
                           placeholder="Target customer"
                           name="targetCustomer"
                           value={this.state.targetCustomer}
                           onChange={this.handleInputChange}/>
                </div>

                <div>
                    <select value={this.state.taglineSelectsValue}
                            name="taglineSelectsValue"
                            onChange={this.handleInputChange}>
                        {
                            this.getSelects("tagline").map(select => ( <option key={select} value={select}>{select}</option>) )
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
        );
    }

}


const mapStateToProps =(state) => {
    let {contestsToInsert, contestFormData, selects, isFetching} = state.testReducer;
    return {contestsToInsert, contestFormData, selects, isFetching}
};

const mapDispatchToProps =(dispatch) => ({
    getSelects: () => dispatch(getSelects()),
    //setContestOrder: (arr) => dispatch(setContestOrder(arr)),
    collectFormData: (formData) => dispatch(collectFormData(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaglineContest);

