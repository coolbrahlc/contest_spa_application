import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import createContest from './pages/CreateContest/CreateContest';
import NotFound from './pages/old/NotFound';
import taglineContest from './pages/ContestTypes/TaglineContest';
import nameContest from './pages/ContestTypes/NameContest';
import logoContest from './pages/ContestTypes/LogoContest';
import checkout from './pages/ContestTypes/Checkout';
import dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import contestPage from './pages/ContestsPage/contestPage';
import authCheck from './components/AuthCheck/AuthCheck';
import Auth from './components/Auth/Auth';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class App extends Component {

  render() {

    return (
        <Router>
            <div>
                <Switch >
                    {/*<Route exact path="/users/"  component={ (props) => <Users {...props} test={"test"}/> }/>*/}
                    <Route exact path="/contest/:id" component={authCheck(contestPage)} />
                    <Route exact path="/" component={authCheck(Home)} />
                    <Route exact path="/login/" component={Login} />
                    <Route exact path="/register/" component={Register} />
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
