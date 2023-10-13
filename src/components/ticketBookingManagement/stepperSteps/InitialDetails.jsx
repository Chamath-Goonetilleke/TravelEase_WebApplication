/*
------------------------------------------------------------------------------
File: InitialDetails.js
Purpose: This file contains the InitialDetails React component, which
allows users to enter initial details for a train reservation.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import stations from "../../common/trainStations";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default class InitialDetails extends Form {
  state = {
    data: this.props.initial,
    errors: {},
  };

  schema = {
    from: Joi.string().required().min(5).label("From"),
    to: Joi.string().required().min(5).label("To"),
    date: Joi.label("Date"),
    noOfPassengers: Joi.number()
      .required()
      .min(1)
      .max(4)
      .label("No of Passengers"),
  };

  options = stations.map((station) => ({
    value: station,
    text: station,
  }));

  shouldDisableDate = (date) => {
    // Disable dates before today
    const today = new Date();
    if (date < today) {
      return true;
    }

    // Disable dates more than 30 days in the future
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    if (date > maxDate) {
      return true;
    }

    return false;
  };

  doSubmit = () => {
    const data = this.state.data;
    this.props.onChangeData(data);
  };

  render() {
    const { data } = this.state;
    return (
      <div style={{ marginTop: "2rem" }}>
        <form onSubmit={this.handleSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            {this.renderDropDown("From", "from", this.options, false, "35%")}
            {this.renderDropDown("To", "to", this.options, false, "35%")}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Date"
                  value={data.date}
                  onChange={(e) => {
                    data.date = e;
                    this.setState({ data: data });
                  }}
                  shouldDisableDate={this.shouldDisableDate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {this.renderInputField(
                "No of Passengers",
                "noOfPassengers",
                "number",
                { width: "100%", marginRight: "2rem" },
                true
              )}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            {this.renderButton("Search", "outlined", "submit")}
          </div>
        </form>
      </div>
    );
  }
}
