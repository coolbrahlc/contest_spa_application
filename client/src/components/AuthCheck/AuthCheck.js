import React, {Component} from 'react';
import { connect } from 'react-redux';
import {auth, logout} from "../../actions/actionCreator";
import { GridLoader } from 'react-spinners';

export default function (NestedComponent) {
    class Authenticate extends Component{

        componentDidMount() {
            console.log('HOC')
            if (!this.props.user) {
                const token = localStorage.getItem('token');
                if (token) {
                    this.props.auth();
                } else {
                    this.props.logout();
                    this.props.history.replace('/login');
                }
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
        auth: () => dispatch(auth()),
        logout: () => dispatch(logout())
    });

    return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
