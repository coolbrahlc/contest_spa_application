import React, { Component } from 'react';
import {GridLoader} from "react-spinners";
import {collectFormData, getSelects, setContestOrder} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

class  nameContest extends Component {

    constructor(props) {
        super(props);
        if (this.props.contestFormData){
            let data = JSON.parse(this.props.contestFormData.getAll("nameForm"));
            this.state= {
                contestType: 'Name',
                contestName: data.name,
                typeOfNameSelects: [],
                nameStyleSelects: [],
                typeOfName: data.type_of_title,
                nameStyle: data.preferences,
                industry: data.industry,
                typeOfWork: data.type_of_work,
                targetCustomer: data.target_customer,
                nameFile: '',
                nameFileValue: null
            }
        } else {
            this.state= {
                contestType: 'Name',
                contestName: '',
                typeOfNameSelects: [],
                nameStyleSelects: [],
                typeOfName: '',
                nameStyle: '',
                industry:'',
                typeOfWork:'',
                targetCustomer:'',
                nameFile: '',
                nameFileValue: null
            }
        }
    }

    componentDidMount() {
        if (!this.props.contestsToInsert) {
            this.props.history.push({
                pathname: '/contest'
            });
        } else {
            let selects = this.props.selects;
            let typeOfNameSelects = selects.filter(name => (name.contest_type === "name_type")).map(name =>name.name );
            let nameStyleSelects = selects.filter(name => (name.contest_type === "name_style")).map(name =>name.name );
            this.setState({
                typeOfNameSelects,
                nameStyleSelects
            });
        }
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
        //console.log(bodyFormData.getAll('files'));
        this.props.collectFormData(bodyFormData);

        // if (this.props.contestsToInsert.length===1) {
        //     this.props.history.push({
        //         pathname: '/checkout'
        //     });
        // } else {
        //     let editedOrder = this.props.contestsToInsert.slice(1);
        //     this.props.setContestOrder(editedOrder);
        //     this.props.history.push({
        //         pathname: '/'+ editedOrder[0],
        //     });
        // }

        let order = this.props.contestsToInsert;
        console.log(order, 'order in name');
        let nextStep = order.indexOf('name')+1;
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
                Creating NAME contest
                <div>
                    <input type="text"
                           placeholder="Contest name"
                           name="contestName"
                           value={this.state.contestName}
                           onChange={this.handleInputChange}/>
                </div>

                <div>
                    <select value={this.state.typeOfName}
                            name="typeOfName"
                            defaultValue={this.state.typeOfNameSelects[0]}

                            onChange={this.handleInputChange}>
                        {
                            this.state.typeOfNameSelects.map(select => ( <option key={select} value={select}>{select}</option>) )
                        }
                    </select>
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
                    <select value={this.state.nameStyle}
                            defaultValue={this.state.nameStyleSelects[0]}
                            name="nameStyle"

                            onChange={this.handleInputChange}>
                        {

                            this.state.nameStyleSelects.map(select => ( <option key={select} value={select}>{select}</option>) )
                        }
                    </select>
                </div>

                <div>
                    <input type="file"
                           name="nameFile"
                           onChange={this.onChangeFile} />
                </div>


                <button onClick={this.sendContestData} defaultValue={this.state.name} >Send</button>
            </div>
        );
    }
}


const mapStateToProps =(state) => {
    let {contestsToInsert, contestFormData, selects} = state.testReducer;
    return {contestsToInsert, contestFormData, selects}
};

const mapDispatchToProps =(dispatch) => ({
    getSelects: () => dispatch(getSelects()),
    setContestOrder: (arr) => dispatch(setContestOrder(arr)),
    collectFormData: (formData) => dispatch(collectFormData(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(nameContest);



