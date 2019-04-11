import React from "react";
import style from "./ContestCreateCard.module.scss";

export default function ContestCreateCard(props) {

    const renderImages = () => {
        return props.img.map(i => {
            return <img key={i} src={i} alt="img"/>
        });
    };

    const handleClick = () => {
        const {click, type} = props;
        click(type);
    };
    
    let containerTheme;
    if(props.theme){
        containerTheme = style["container-dark"];
    }
    else{
        containerTheme = style["container-white"];
    }
    
    return(
        <div className={containerTheme}
             onClick={handleClick}>
            <div className={style.imgRow}>
                {
                    renderImages()
                }
            </div>
            <h5>{props.type}</h5>
            <hr/>
            <p>{props.text}</p>
        </div>
    );

}
