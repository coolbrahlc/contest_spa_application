import React from "react";
import style from "./InputProfileEdit.module.scss";
import InputMask from 'react-input-mask';


export const InputProfileEdit =  ({ placeholder,input, type, meta: {touched, error} }) => {
    return (
        <div className={style.inputContainer}>
            <input {...input} placeholder={placeholder} type={type}/>

            {touched && (error && <span>{error}</span>)}
        </div>
    )
};

export const InputProfileCardEdit =  ({ label,input, type, mask, maskChar, meta: {touched, error} }) => {
    return (
        <div className={style.inputContainer}>
            <InputMask placeholder={label}
                       {...input}
                       name="cardNumber"
                       mask={mask} maskChar={maskChar}

            />
            {touched && (error && <span>{error}</span>)}
        </div>
    )
};

export const SelectInput =  ({ placeholder, input, typeSelect, selects, type, meta: {touched, error} }) => {
    const getSelects = () => {
        return selects.filter(name => (name.contest_type === typeSelect)).map(name =>name.name );
    };

    return (
        <div className={style.inputContainer}>
            <select {...input}  className={style.formcontrol}>
                {getSelects().map(select => (
                    <option key={select} value={select}>{select}</option>))
                }
            </select>
            {touched && (error && <span>{error}</span>)}
        </div>
    )
};


export const InputAuth =  ({ placeholder,input, type, classes:{inputDefault, warning, formError}, meta: {touched, error} }) => {
    return (
        <div className = {(error && touched) ? warning: inputDefault}>
            <input {...input} placeholder={placeholder} type={type}/>

            {touched && (error && <p className={formError}>{error}</p>)}
        </div>
    )
};
