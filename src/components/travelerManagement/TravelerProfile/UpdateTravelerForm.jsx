import React from "react";
import Joi from "joi-browser";

import Form from "../../common/form";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { updateTraveler } from "../../../services/travelerService";

export default class UpdateTravelerForm extends Form {
  state = {
    data: {
      title: "Mr.",
      firstName: "",
      lastName: "",
      city: "",
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
    city: Joi.string().min(5).label("City"),
    phoneNumber: Joi.string().min(5).label("Phone Number"),
  };

  options = [
    { value: "Mr.", text: "Mr." },
    { value: "Mrs.", text: "Mrs." },
    { value: "Miss.", text: "Miss." },
    { value: "Rev.", text: "Rev." },
  ];

  componentDidMount() {
    this.getTraveler();
  }

  getTraveler = () => {
    const { data } = this.state;
    const { traveler } = this.props;

    data.title = traveler.title;
    data.firstName = traveler.firstName;
    data.lastName = traveler.lastName;
    data.city = traveler.city;
    data.phoneNumber = traveler.phoneNumber;

    this.setState({ data });
  };

  onReset = () => {
    this.getTraveler();
    this.setState({ EditDisabled: !this.state.EditDisabled, errors: {} });
  };

  doSubmit = async () => {
    const newTraveler = { ...this.state.data };
    const { traveler } = this.props;
    newTraveler.role = this.props.role;
    newTraveler.imageUrl = traveler.imageUrl;
    newTraveler.nic = traveler.nic;

    this.setState({ isLoading: true });

    await updateTraveler(newTraveler)
      .then(({ data }) => {
        toast.success(data, { autoClose: 1000 });
        this.setState({ isLoading: false });
        setTimeout(async () => {
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
            <h5 style={{ flex: 1 }}>Update Traveler Details</h5>
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
                "City",
                "city",
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
