import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

import AppHeader from "./components/common/Header";

import LoginRegPage from "./components/userManagement/LoginRegPage";

import Footer from "./components/common/Footer";
import { currentUser } from "./services/authService";
import Cookies from "js-cookie";
import PrivateRoute from "./components/common/PrivateRoute";
import ProfilePage from "./components/userManagement/UserProfile/ProfilePage";
import Home from "./components/userManagement/Home";
import TravelerProfilePage from "./components/userManagement/TravelerProfile/TravelerProfilePage";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
    };
    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
  }
  loadCurrentlyLoggedInUser = async () => {
    await currentUser()
      .then(({ data }) => {
        this.setState({ currentUser: data, authenticated: true });
      })
      .catch((err) => console.log(err));
  };

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
            {!authenticated && (
              <Route exact path="/login" component={LoginRegPage} />
            )}
            <PrivateRoute
              path="/profile"
              component={ProfilePage}
              authenticated={authenticated}
              user={currentUser}
            />
            <Route path = '/traveler/:traveler' render={(props)=> <TravelerProfilePage user={currentUser} {...props} />} />
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
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
