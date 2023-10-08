import React from 'react'
import Joi from "joi-browser";

import Form from "../common/form";
import { toast } from 'react-toastify';
import { authUser } from '../../services/authService';
export default class TravelAgentLogForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
    isLoading: false,
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  onReset = () => {
    const data = {
      email: "",
      password: "",
    };
    this.setState({ data });
  };

  doSubmit = async () => {
    const { data } = this.state;
    data.role = this.props.role;
    this.setState({ isLoading: true });
    await authUser(data)
      .then(({ data }) => {
        toast.success(data, { autoClose: 1000 });
        this.setState({ isLoading: false });
        setTimeout(async () => {
          this.onReset();
          window.location = "/profile";
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data);
        this.setState({ isLoading: false });
        this.onReset();
      });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <center>
          <div style={{ marginBottom: "4rem" }}>
            <h2>Travel Agent Login</h2>
          </div>

          <form onSubmit={this.handleSubmit}>
            {this.renderInputField(
              "Email",
              "email",
              "email",
              { width: "22.9%" },
              true
            )}
            <br />
            <br />
            <br />
            {this.renderInputField(
              "Password",
              "password",
              "password",
              { width: "22.9%" },
              true
            )}
            <br />
            <br />
            <br />
            <br />
            <span style={{ marginRight: "2rem" }}>
              {this.renderButton(
                "Reset",
                "contained",
                "reset",
                false,
                false,
                this.onReset
              )}
            </span>
            {this.renderButton("Login", "contained", "submit", isLoading)}
          </form>
        </center>
      </div>
    );
  }
}
