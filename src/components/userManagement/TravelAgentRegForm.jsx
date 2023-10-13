/*
------------------------------------------------------------------------------
File: TravelAgentRegForm.js
Purpose: This file contains the TravelAgentRegForm React component, which allows Travel Agents to register.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import Form from "../common/form";
import { createUser } from "../../services/userService";

export default class TravelAgentRegForm extends Form {
  state = {
    data: {
      title: "Mr.",
      firstName: "",
      lastName: "",
      nic: "",
      travelAgentId: "",
      email: "",
      phoneNumber: "",
      password: "",
      cPassword: "",
    },
    errors: {},
    isLoading: false,
  };

  schema = {
    title: Joi.string().required().label("Title"),
    firstName: Joi.string().min(5).required().label("First Name"),
    lastName: Joi.string().min(5).required().label("Last Name"),
    nic: Joi.string().min(5).required().label("NIC"),
    travelAgentId: Joi.string().min(5).required().label("Travel Agent Id"),
    email: Joi.string().required().email().label("Email"),
    phoneNumber: Joi.string().min(5).required().label("Phone Number"),
    password: Joi.string().required().min(5).label("Password"),
    cPassword: Joi.string().required().min(5).label("Conform Password"),
  };

  options = [
    { value: "Mr.", text: "Mr." },
    { value: "Mrs.", text: "Mrs." },
    { value: "Miss.", text: "Miss." },
    { value: "Rev.", text: "Rev." },
  ];

  onReset = () => {
    const data = {
      title: "Mr.",
      firstName: "",
      lastName: "",
      nic: "",
      travelAgentId: "",
      email: "",
      phoneNumber: "",
      password: "",
      cPassword: "",
    };

    this.setState({ data: data, errors: {} });
  };

  doSubmit = async () => {
    const { data } = this.state;
    data.role = this.props.role;
    delete data.cPassword;

    this.setState({ isLoading: true });
    await createUser(data)
      .then(({ data }) => {
        toast.success(data, { autoClose: 1000 });
        this.setState({ isLoading: false });
        setTimeout(async () => {
          this.onReset();
          window.location.reload();
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
          <div style={{ marginBottom: "3rem" }}>
            <h2>Travel Agent Registration</h2>
          </div>

          <form onSubmit={this.handleSubmit}>
            {this.renderDropDown("Title", "title", this.options)}
            {this.renderInputField(
              "First Name",
              "firstName",
              "text",
              { marginLeft: "1rem", width: "20%" },
              true
            )}
            {this.renderInputField(
              "Last Name",
              "lastName",
              "text",
              { marginLeft: "1rem", width: "20%" },
              true
            )}
            <br />
            <br />
            {this.renderInputField(
              "NIC",
              "nic",
              "text",
              { width: "22.9%" },
              true
            )}
            {this.renderInputField(
              "Travel Agent Id",
              "travelAgentId",
              "text",
              { marginLeft: "1rem", width: "22.9%" },
              true
            )}
            <br />
            <br />
            {this.renderInputField(
              "Email",
              "email",
              "email",
              { width: "22.9%" },
              true
            )}
            {this.renderInputField(
              "Phone Number",
              "phoneNumber",
              "text",
              { marginLeft: "1rem", width: "22.9%" },
              true
            )}
            <br />
            <br />
            {this.renderInputField(
              "Password",
              "password",
              "password",
              { width: "22.9%" },
              true
            )}
            {this.renderInputField(
              "Confirm Password",
              "cPassword",
              "password",
              { marginLeft: "1rem", width: "22.9%" },
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
            {this.renderButton("Submit", "contained", "submit", isLoading)}
          </form>
        </center>
      </div>
    );
  }
}
