/*
------------------------------------------------------------------------------
File: UpdateTravelAgent.js
Purpose: This file contains the UpdateTravelAgent React component, which allows travel agents to update their details.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import Joi from "joi-browser";
import React from "react";
import Form from "../../common/form";
import { updateUser } from "../../../services/userService";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default class UpdateTravelAgent extends Form {
  state = {
    data: {
      title: "Mr.",
      firstName: "",
      lastName: "",
      travelAgentId: "",
      phoneNumber: "",
    },
    errors: {},
    isLoading: false,
    EditDisabled: true,
  };

  schema = {
    title: Joi.string().label("Title"),
    firstName: Joi.string().min(5).label("First Name"),
    lastName: Joi.string().min(5).label("Last Name"),
    travelAgentId: Joi.string().min(5).label("Travel Agent Id"),
    phoneNumber: Joi.string().min(5).label("Phone Number"),
  };

  options = [
    { value: "Mr.", text: "Mr." },
    { value: "Mrs.", text: "Mrs." },
    { value: "Miss.", text: "Miss." },
    { value: "Rev.", text: "Rev." },
  ];

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const { data } = this.state;
    const { user } = this.props;

    data.title = user.title;
    data.firstName = user.firstName;
    data.lastName = user.lastName;
    data.travelAgentId = user.travelAgentId;
    data.phoneNumber = user.phoneNumber;

    this.setState({ data });
  };

  onReset = () => {
    this.getUser();
    this.setState({ EditDisabled: !this.state.EditDisabled, errors: {} });
  };

  doSubmit = async () => {
    const newUser = { ...this.state.data };
    const { user } = this.props;
    newUser.role = this.props.role;
    newUser.imageUrl = user.imageUrl;

    this.setState({ isLoading: true });
    window.history.pushState({}, "", "/profile");
    await updateUser(newUser)
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
          <div
            style={{
              marginBottom: "3rem",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <h5 style={{ flex: 1 }}>Update Your Details</h5>
            <div
              style={{ display: "flex", justifyContent: "flex-end", flex: 0 }}
            >
              <Button
                variant="contained"
                disabled={!this.state.EditDisabled}
                startIcon={<EditIcon />}
                onClick={() =>
                  this.setState({ EditDisabled: !this.state.EditDisabled })
                }
              >
                Edit
              </Button>
            </div>
          </div>

          <div disabled>
            <form onSubmit={this.handleSubmit}>
              {this.renderDropDown(
                "Title",
                "title",
                this.options,
                EditDisabled
              )}
              {this.renderInputField(
                "First Name",
                "firstName",
                "text",
                { marginLeft: "0.5rem" },
                true,
                EditDisabled
              )}
              {this.renderInputField(
                "Last Name",
                "lastName",
                "text",
                { marginLeft: "0.5rem" },
                true,
                EditDisabled
              )}
              <br />
              <br />
              {this.renderInputField(
                "Travel Agent Id",
                "travelAgentId",
                "text",
                {},
                true,
                EditDisabled
              )}
              {this.renderInputField(
                "Phone Number",
                "phoneNumber",
                "text",
                { marginLeft: "0.5rem" },
                true,
                EditDisabled
              )}
              <br />
              <br />
              <br />
              <span style={{ marginRight: "2rem" }}>
                {this.renderButton(
                  "Cancel",
                  "contained",
                  "reset",
                  false,
                  EditDisabled,
                  this.onReset
                )}
              </span>
              {this.renderButton(
                "Update",
                "contained",
                "submit",
                isLoading,
                EditDisabled
              )}
            </form>
          </div>
        </center>
      </div>
    );
  }
}
