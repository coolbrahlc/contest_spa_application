import React from 'react';
import style from './Input.module.scss';

export default function (props){

    const {type, name, value, onChange, onClick, placeholder, morph, danger, onFocus} = props;
    let styleClass = style.container;
    switch (morph) {
        case "login":
            styleClass = style.logContainer;
            break;
        case "input":
            styleClass = style.containerDanger;
            if(!danger) {
                styleClass = style.container;
            }
            break;
        default:
            styleClass = style.container;
            break;
    }

    return(
        <div className = { styleClass }>
            <input type = { type }
                   value = {value}
                   name = { name }
                   onChange = { onChange }
                   onClick = { onClick }
                   placeholder= { placeholder }
                   onFocus = { onFocus }
            />
        </div>
    );
};
