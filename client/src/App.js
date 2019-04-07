import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import createContest from './pages/createContest';
import NotFound from './pages/old/NotFound';
import taglineContest from './pages/contestTypes/taglineContest';
import nameContest from './pages/contestTypes/nameContest';
import logoContest from './pages/contestTypes/logoContest';
import checkout from './pages/contestTypes/checkout';
import dashboard from './pages/dashboard';
import Home from './pages/Home/Home';
import contestPage from './pages/contestPage';
import authCheck from './components/authCheck/authCheck';
import Auth from './components/Auth/Auth';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class App extends Component {

  render() {

    return (
        <Router>
            <div>
                <Switch>
                    {/*<Route exact path="/users/"  component={ (props) => <Users {...props} test={"test"}/> }/>*/}
                    <Route exact path="/contest/:id" component={authCheck(contestPage)} />
                    <Route exact path="/" component={Auth(Home)} />

                    <Route exact path="/login/" component={Auth(Login)} />
                    <Route exact path="/register/" component={Auth(Register)} />
                    <Route exact path="/contest/" component={authCheck(createContest)} />

                    <Route exact path="/tagline/" component={authCheck(taglineContest)} />
                    <Route exact path="/logo/" component={authCheck(logoContest)} />
                    <Route exact path="/name/" component={authCheck(nameContest)} />
                    <Route exact path="/checkout/" component={authCheck(checkout)} />
                    <Route exact path="/dashboard/" component={authCheck(dashboard)} />

                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    );
  }
}

export default App;
