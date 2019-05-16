import React, {Component} from 'react';
import { connect } from 'react-redux';
import {auth, logout} from "../../actions/actionCreator";
import { GridLoader } from 'react-spinners';
import style from "./AuthCheck.module.scss";
import Chat from "../Chat/Chat";

export default function (NestedComponent) {
    class Authenticate extends Component{

        componentDidMount() {
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

        render() {
            // const {isFetching} = this.props;
            // if(isFetching){
            //     return (
            //         <div className={style.loader}>
            //             <GridLoader loading={isFetching}
            //                         color={'#28D2D1'}
            //                         height={320} width={320}
            //             />
            //         </div>
            //     )
            // }
            // else{
                return(
                    <>
                        <Chat {...this.props}/>
                        <NestedComponent {...this.props}/>
                    </>

                );
           // }
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
