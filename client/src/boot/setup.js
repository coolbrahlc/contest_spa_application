import React, { Component } from 'react';
import configureStore from './configureStore';
import {Provider} from 'react-redux';
import App from '../App';


class Setup extends Component{

    constructor(props) {
        super(props);
        this.state = {
            store: configureStore()
        }
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <App/>
            </Provider>

        );
    }
}

export default Setup;