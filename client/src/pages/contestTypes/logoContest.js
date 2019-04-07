import React, { Component } from 'react';
//import {GridLoader} from "react-spinners";
import {collectFormData, setContestOrder} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

class  logoContest extends Component {

    constructor(props) {
        super(props);
        this.state= {
            contestType: 'Logo',
            contestName: '',
            industry:'',
            ventureName:'',
            typeOfWork:'',
            targetCustomer:'',
            logoSelectsValue: '',
            logoSelects: [],
            logoFileValue: null
        }
    }
    componentDidMount() {
        if (!this.props.contestsToInsert) {
            this.props.history.push({
                pathname: '/contest'
            });
        } else {
            let logoSelects = this.props.selects
                .filter(name => (name.contest_type === "logo"))
                .map(name =>name.name );
            this.setState({
                logoSelects
            });
        }
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

        this.props.collectFormData(bodyFormData);

        let order = this.props.contestsToInsert;
        this.props.setContestOrder(order);
        this.props.history.push({
            pathname: '/checkout'
        });
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
                Creating LOGO contest
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
                           name="typeOfWork"
                           value={this.state.ventureName}
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
                    <input type="text"
                           placeholder="Type Of Work"
                           name="typeOfWork"
                           value={this.state.typeOfWork}
                           onChange={this.handleInputChange}/>
                </div>

                <div>
                    <select value={this.state.logoSelectsValue}
                            name="logoSelectsValue"
                            onChange={this.handleInputChange}>
                        {
                            this.state.logoSelects.map(select => ( <option key={select} value={select}>{select}</option>) )
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

export default connect(mapStateToProps, mapDispatchToProps)(logoContest);



