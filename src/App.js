import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AppHeader from "./components/common/Header";

import LoginRegPage from "./components/userManagement/LoginRegPage";

import Footer from "./components/common/Footer";


export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <AppHeader />
        </div>
        <div
          className="app-body"
          style={{ height: "79.2vh", margin: "1rem", border: "1px solid black" }}
        >
          <Switch>
            <Route path="/" component={LoginRegPage} />
          </Switch>
        </div>
        <div className="app-footer">
          <Footer />
        </div>
      </div>
    );
  }
}
