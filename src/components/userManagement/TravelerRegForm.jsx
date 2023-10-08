import React from "react";
import Joi from "joi-browser";

import Form from "../common/form";
import { toast } from "react-toastify";
import { createTraveler } from "../../services/travelerService";
import { Remove } from "@mui/icons-material";

export default class TravelerRegForm extends Form {
  state = {
    data: {
      title: "Mr.",
      firstName: "",
      lastName: "",
      nic: "",
      city: "",
      email: "",
      phoneNumber: "",
      password: "",
      cPassword: "",
    },
    errors: {},
    isLoading: false,
    EditDisabled: true,
  };

  schema = {
    title: Joi.string().required().label("Title"),
    firstName: Joi.string().min(5).required().label("First Name"),
    lastName: Joi.string().min(5).required().label("Last Name"),
    nic: Joi.string().min(5).required().label("NIC"),
    city: Joi.string().min(5).required().label("City"),
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

  componentDidMount() {}

  onReset = () => {
    this.setState({ EditDisabled: !this.state.EditDisabled, errors: {} });
  };

  doSubmit = async () => {
    const traveler = { ...this.state.data };
    traveler.role = "Traveler";
    delete traveler.cPassword;

    this.setState({ isLoading: true });

    await createTraveler(traveler)
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
    const { isLoading, EditDisabled } = this.state;
    return (
      <div>
        <center>
          <div>
            <form onSubmit={this.handleSubmit}>
              {this.renderDropDown("Title", "title", this.options)}
              {this.renderInputField(
                "First Name",
                "firstName",
                "text",
                { marginLeft: "1rem", width: "40%" },
                true
              )}
              {this.renderInputField(
                "Last Name",
                "lastName",
                "text",
                { marginLeft: "1rem", width: "40%" },
                true
              )}
              <br />
              <br />
              {this.renderInputField(
                "NIC",
                "nic",
                "text",
                { width: "45%" },
                true
              )}
              {this.renderInputField(
                "City",
                "city",
                "text",
                { marginLeft: "1rem", width: "45%" },
                true
              )}
              <br />
              <br />
              {this.renderInputField(
                "Email",
                "email",
                "email",
                { width: "45%" },
                true
              )}
              {this.renderInputField(
                "Phone Number",
                "phoneNumber",
                "text",
                { marginLeft: "1rem", width: "45%" },
                true
              )}
              <br />
              <br />
              {this.renderInputField(
                "Password",
                "password",
                "password",
                { width: "45%" },
                true
              )}
              {this.renderInputField(
                "Confirm Password",
                "cPassword",
                "password",
                { marginLeft: "1rem", width: "45%" },
                true
              )}
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
          </div>
        </center>
      </div>
    );
  }
}
