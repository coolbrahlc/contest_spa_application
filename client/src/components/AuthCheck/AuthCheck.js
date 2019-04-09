import React, {Component} from 'react';
import { connect } from 'react-redux';
import {auth} from "../../actions/actionCreator";
import { GridLoader } from 'react-spinners';

export default function (NestedComponent) {
    class Authenticate extends Component{

        componentDidMount() {
            //this.props.auth();

            const token = localStorage.getItem('token');
            if (!token) {
                this.props.history.replace('/login');
            } else {
                this.props.auth();
            }
        }

        redirect =() => {
            this.props.history.replace('/login');
        };

        render() {
            if(this.props.isFetching){
                return <GridLoader loading={this.props.isFetching}
                                   color={'#28D2D1'}
                />
            }
            else{
                return(
                    <NestedComponent {...this.props}/>
                );
            }
        }
    }

    const mapStateToProps = (state) => {
        const {user, isFetching} = state.authReducer;
        return {user, isFetching};
    };

    const mapDispatchToProps = (dispatch) => ({
        auth: () => dispatch(auth())
    });

    return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
