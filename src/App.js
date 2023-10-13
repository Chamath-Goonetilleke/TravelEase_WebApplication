/*
------------------------------------------------------------------------------
File: App.js
Purpose: This file contains the main application component, including routing, user authentication, and rendering different pages.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import TrainPage from "./components/trainManagement/train/trainpage";
import { ToastContainer, Zoom } from "react-toastify";

import AppHeader from "./components/common/Header";

import LoginRegPage from "./components/userManagement/LoginRegPage";

import Footer from "./components/common/Footer";
import { currentUser } from "./services/authService";
import Cookies from "js-cookie";
import PrivateRoute from "./components/common/PrivateRoute";
import ProfilePage from "./components/userManagement/UserProfile/ProfilePage";
import TravelerProfilePage from "./components/travelerManagement/TravelerProfile/TravelerProfilePage";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
    };
    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
  }

  /*
  ------------------------------------------------------------------------------
  Method: loadCurrentlyLoggedInUser
  Purpose: Loads the currently logged-in user's information from the server.
  ------------------------------------------------------------------------------
  */
  loadCurrentlyLoggedInUser = async () => {
    await currentUser()
      .then(({ data }) => {
        this.setState({ currentUser: data, authenticated: true });
      })
      .catch((err) => console.log(err));
  };

  /*
  ------------------------------------------------------------------------------
  Method: handleLogout
  Purpose: Handles the logout action by removing the authentication token and redirecting to the login page.
  ------------------------------------------------------------------------------
  */
  handleLogout = () => {
    Cookies.remove("token");
    window.location = "/login";
  };

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    const { authenticated, currentUser } = this.state;
    console.log(currentUser);
    return (
      <div className="app">
        <div className="app-header">
          <AppHeader user={currentUser} onLogout={this.handleLogout} />
        </div>
        <div
          className="app-body"
          style={{
            height: "83vh",
          }}
        >
          <Switch>
            {!authenticated ? (
              <Route exact path="/login" component={LoginRegPage} />
            ) : (
              <>
                <PrivateRoute
                  path="/profile"
                  component={ProfilePage}
                  authenticated={authenticated}
                  user={currentUser}
                />
                <Route
                  path="/traveler/:nic"
                  render={(props) => (
                    <TravelerProfilePage user={currentUser} {...props} />
                  )}
                />
                <Route path="/schedule-train" component={TrainPage}></Route>
              </>
            )}
          </Switch>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Zoom}
          />
        </div>
        <div className="app-footer">
          <Footer />
        </div>
      </div>
    );
  }
}
