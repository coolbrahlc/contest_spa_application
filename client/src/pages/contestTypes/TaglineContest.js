import React, { Component } from 'react';
//import {GridLoader} from "react-spinners";
import {collectFormData, setContestOrder} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";

class  taglineContest extends Component {

    constructor(props) {
        super(props);
        this.state= {
            contestType: 'Tagline',
            contestName: '',
            industry:'',
            ventureName:'',
            typeOfWork:'',
            targetCustomer:'',
            taglineSelectsValue: '',
            taglineSelects: [],
            nameFile: "",
            taglineFileValue: null

        }
    }

    componentDidMount() {

        if (!this.props.contestsToInsert) {
            this.props.history.push({
                pathname: '/contest'
            });
        } else {
            let selects = this.props.selects;
            let taglineSelects = selects.filter(name => (name.contest_type === "tagline")).map(name =>name.name );
            this.setState({
                taglineSelects
            });
        }
    }

    onChangeFile =  (e) => {
        console.log(e.target.files[0]);
        this.setState({
            taglineFileValue:e.target.files[0]
        });

    }

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

        this.props.collectFormData(bodyFormData);


        let order = this.props.contestsToInsert;
        console.log(order, 'order in tagline')
        let nextStep = order.indexOf('tagline')+1;
        if (nextStep === order.length) {
            this.props.history.push({
                pathname: '/checkout'
            });
        } else {
            this.props.setContestOrder(order);
            this.props.history.push({
                pathname: '/'+ order[nextStep],
            });
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
        return (
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
                            this.state.taglineSelects.map(select => ( <option key={select} value={select}>{select}</option>) )
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
    let {contestsToInsert, contestFormData, selects} = state.testReducer;
    return {contestsToInsert, contestFormData, selects}
};

const mapDispatchToProps =(dispatch) => ({
    setContestOrder: (arr) => dispatch(setContestOrder(arr)),
    collectFormData: (formData) => dispatch(collectFormData(formData))

});

export default connect(mapStateToProps, mapDispatchToProps)(taglineContest);



