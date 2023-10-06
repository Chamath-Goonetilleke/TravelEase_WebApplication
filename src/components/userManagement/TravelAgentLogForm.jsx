import React from 'react'
import Joi from "joi-browser";

import Form from "../common/form";
export default class TravelAgentLogForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
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

  doSubmit = () => {
    console.log("sumbmitted");
  };

  render() {
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
                this.onReset
              )}
            </span>
            {this.renderButton("Login", "contained", "submit")}
          </form>
        </center>
      </div>
    );
  }
}
