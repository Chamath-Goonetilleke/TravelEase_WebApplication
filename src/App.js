import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import Trainpage from './components/trainManagement/train/trainpage';


export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
        <Route path="/schedule-train" component={Trainpage}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

