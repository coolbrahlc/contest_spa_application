import React, {Component} from 'react';
import Header from "../Header/Header";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function (NestedComponent) {
    class HeaderHOC extends Component{

        render() {
            return(
                <div>
                    <Header {...this.props}/>
                    <ToastContainer autoClose={10000} />
                    <NestedComponent {...this.props}/>
                </div>
            )
        }
    }

    return HeaderHOC;
}
