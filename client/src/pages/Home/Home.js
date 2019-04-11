import React, {Component} from "react";
import { connect } from "react-redux";
import {logout, auth} from "../../actions/actionCreator";

class Home extends Component{

    render() {
        return(
            <div>
                Homepage
            </div>


        );
    }
}

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    return {user};
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    auth: () => dispatch(auth())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
