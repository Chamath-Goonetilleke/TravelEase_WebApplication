/*
------------------------------------------------------------------------------
File: ConfirmationAndPayment.js
Purpose: This file contains the ConfirmationAndPayment React component, which
allows users to select a seat class and displays a summary of the reservation.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React, { Component } from "react";
import ClassCard from "../relatedComponents/ClassCard";
import TicketSummaryComponent from "../relatedComponents/TicketSummaryComponent";

export default class ConfirmationAndPayment extends Component {
  state = {
    selectedClass: { name: "-", price: 0 },
  };
  handleSelectClass = (cls, price) => {
    const selectedClass = this.state.selectedClass;
    selectedClass.name = cls.className;
    selectedClass.price = price;

    this.setState({ selectedClass: selectedClass });
    const schedule = this.props.schedule[0];

    const reservation = {
      scheduleId: schedule.id,
      from: schedule.from,
      to: schedule.to,
      time: schedule.departs + " - " + schedule.arrives,
      date: schedule.date,
      passengers: [{ type: "", nic: "" }],
      trainName: schedule.name,
      trainNo: schedule.trainNo,
      trainClass: cls.className,
      classPrice: price,
      totalPrice: price * (this.props.passengers + 1),
    };

    this.props.getReservation(reservation);
  };

  render() {
    const schedule = this.props.schedule[0];
    console.log(schedule);
    return (
      <div>
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <h3>Select Seat Class</h3>
        </div>
        <div style={{}}>
          {schedule.classes.map((cls) => (
            <ClassCard
              className={cls.className}
              price={schedule.totalDistance * 10}
              available={cls.availableCount}
              onClick={this.handleSelectClass}
            />
          ))}
        </div>
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <h3>Summary</h3>
        </div>
        <div>
          <TicketSummaryComponent
            schedule={schedule}
            passengers={this.props.passengers}
            selectedClass={this.state.selectedClass}
          />
        </div>
      </div>
    );
  }
}
