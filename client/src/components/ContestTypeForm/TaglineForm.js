import React from 'react';
import connect from "react-redux/es/connect/connect";
import style from "../../pages/ContestType/contestType.module.scss";
import {GridLoader} from "react-spinners";
import { Field, reduxForm } from 'redux-form'
import {InputProfileEdit, SelectInput} from "../Inputs/InputProfileEdit";
import {InputFileField} from "../InputFileField/InputFileField";
import {required, maxLength15, minLength3, tooShort} from "../../utils/validation";



const TaglineForm = (props) => {
    const {handleSubmit, selects} = props;

    return (
        <form onSubmit={handleSubmit} >
            <div className={style.inputDefault}>
                <Field type={"text"}
                       placeholder={"Contest name"}
                       name={"name"}
                       component={InputProfileEdit}
                       validate={[required, maxLength15, minLength3]}
                />
            </div>
            <div className={style.inputDefault}>
                <Field type="text"
                       placeholder="Industry"
                       name="industry"
                       component={InputProfileEdit}
                       validate={[required, maxLength15, minLength3]}
                />
            </div>
            <div className={style.inputDefault}>
                <Field type={"text"}
                       placeholder={"Type of work"}
                       name={"type_of_work"}
                       component={InputProfileEdit}
                       validate={[required, maxLength15, minLength3]}
                />
            </div>
            <div className={style.inputDefault}>
                <Field type={"text"}
                       placeholder={"Target customer"}
                       name={"target_customer"}
                       component={InputProfileEdit}
                       validate={[required, maxLength15, minLength3]}
                />
            </div>
            <div className={style.formSection}>
                <Field
                    name="preferences"
                    className={style["form-control"]}
                    component={SelectInput}
                    selects={selects}
                    typeSelect={"tagline"}
                    validate={required}
                />
            </div>
            <div className={style.inputDefault}>
                <Field type={"number"}
                       placeholder={"Contest length"}
                       name={"days_passed"}
                       component={InputProfileEdit}
                       validate={[required, tooShort]}
                />
            </div>
            <div className={style.formSection}>
                <Field type={"file"}
                       name={"nameFile"}
                       component={InputFileField}
                />
            </div>
        </form>
    )
};


const mapStateToProps = (state) =>{
    let initialValues ={};
    const {contestFormData} = state.contestCreateReducer;
    if (contestFormData) {
        if (contestFormData.getAll('taglineForm')){
            initialValues=JSON.parse(contestFormData.getAll('taglineForm'));
        }
    }
    return { initialValues };
};

export default connect(mapStateToProps, null)( reduxForm({
    form: 'TaglineForm',
    enableReinitialize: true,
})(TaglineForm));


