import React, {Component} from 'react';
import Header from "../Header/Header";

export default function (NestedComponent) {
    class HeaderHOC extends Component{

        render() {
            return(
                <div>
                    <Header {...this.props}/>
                    <NestedComponent {...this.props}/>
                </div>
            )
        }
    }

    return HeaderHOC;
}
