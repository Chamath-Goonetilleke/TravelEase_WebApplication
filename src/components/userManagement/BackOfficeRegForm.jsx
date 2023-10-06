import React from "react";
import Joi from "joi-browser";

import Form from "../common/form";
import { createUser } from "../../services/userService";
import { toast } from "react-toastify";

export default class BackOfficeRegForm extends Form {
  state = {
    data: {
      title: "Mr.",
      firstName: "",
      lastName: "",
      nic: "",
      employeeId: "",
      email: "",
      phoneNumber: "",
      password: "",
      cPassword: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    firstName: Joi.string().min(5).required().label("First Name"),
    lastName: Joi.string().min(5).required().label("Last Name"),
    nic: Joi.string().min(5).required().label("NIC"),
    employeeId: Joi.string().min(5).required().label("Employee Id"),
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
      employeeId: "",
      email: "",
      phoneNumber: "",
      password: "",
      cPassword: "",
    };
    this.setState({ data });
  };

  doSubmit = async () => {
    const { data } = this.state;
    data.role = this.props.role;
    delete data.cPassword;

     await toast.promise(
       createUser(data),
       {
         pending: "Registering...",
         success: "Registered Successfully",
         error: "Something Went Wrong",
       },
       { autoClose: 1000 }
     );
     setTimeout(() => {
       window.location.reload();
     }, 2000);
  };

  render() {
    return (
      <div>
        <center>
          <div style={{ marginBottom: "3rem" }}>
            <h2>Back Office User Registration</h2>
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
              "Employee Id",
              "employeeId",
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
                this.onReset
              )}
            </span>
            {this.renderButton("Submit", "contained", "submit")}
          </form>
        </center>
      </div>
    );
  }
}
