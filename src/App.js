import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header"></div>
        <div className="app-body">
          <Switch>
            <div>Hello world</div>
          </Switch>
        </div>
        <div className="app-footer"></div>
      </div>
    );
  }
}

