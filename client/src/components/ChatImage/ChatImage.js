import React, {useEffect, useState} from "react";
import style from "./ChatImage.module.scss";
import {publicURL} from "../../api/baseURL";
import randomColor from "randomcolor";



const DialogImage = props => {

    const [inlineStyle, setInlineStyle] = useState({backgroundColor: "#ef8de7"});

    useEffect(() => {
        setInlineStyle({
            backgroundColor: randomColor({
                luminosity: 'light',
                hue: 'random'
            })
        });
    },[]);


    const generateName = () => {
        const {firstName, lastName} = props;
        return <div>{firstName[0].toUpperCase()+lastName[0].toUpperCase()}</div>
    };

    const renderImage = () => {
        const {src} = props;
        if(src) {
            return (
                <div className={style.container}>
                    <img src={publicURL+src} alt="Avatar"/>
                </div>
            );
        } else {
            return (
                <div style={inlineStyle} className={style.container}>
                    {
                        generateName()
                    }
                </div>
            );
        }
    };

    return (
        renderImage()
    );

};
export default DialogImage;
