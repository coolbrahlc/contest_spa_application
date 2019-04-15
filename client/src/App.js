import React, { Component } from 'react';
import './App.css';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import createContest from './pages/CreateContest/CreateContest';
import NotFound from './pages/old/NotFound';
import contestType from './pages/ContestType/contestType';
import checkout from './pages/Checkout/Checkout';
import dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import contestPage from './pages/ContestsPage/contestPage';
import authCheck from './components/AuthCheck/AuthCheck';
import HeaderHOC from './components/HeaderHOC/HeaderHOC';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App extends Component {

  render() {

    return (
        <Router>
            <div>
                <Switch >
                    <Route exact path="/contest/:id" component={authCheck(HeaderHOC(contestPage))} />
                    <Route exact path="/" component={HeaderHOC(authCheck(Home))} />
                    <Route exact path="/login/" component={Login} />
                    <Route exact path="/register/" component={Register} />
                    <Route exact path="/contest/" component={authCheck(HeaderHOC(createContest))} />
                    <Route exact path="/tagline/" component={authCheck(HeaderHOC( contestType))} />
                    <Route exact path="/logo/" component={authCheck(HeaderHOC( contestType))} />
                    <Route exact path="/name/" component={authCheck(HeaderHOC( contestType ))} />
                    <Route exact path="/checkout/" component={authCheck(HeaderHOC(checkout))} />
                    <Route exact path="/dashboard/" component={authCheck(HeaderHOC(dashboard))} />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    );
  }
}

export default App;
