/*
------------------------------------------------------------------------------
File: CurrentReservations.js
Purpose: This file contains the CurrentReservations React component, which
displays the current reservations for a traveler.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React, { Component } from "react";
import { getReservationsByTraveler } from "../../services/reservationService";
import ReservationItem from "./relatedComponents/ReservationItem";

export default class CurrentReservations extends Component {
  state = {
    reservations: [],
  };

  componentDidMount = async () => {
    await getReservationsByTraveler(this.props.travelerNIC)
      .then(({ data }) => {
        this.setState({ reservations: data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { reservations } = this.state;
    return (
      <div style={{ padding: "0.5rem" }}>
        {reservations.length !== 0 ? (
          reservations.map((reservation) => (
            <ReservationItem
              reservation={reservation}
              travelerState={this.props.travelerState}
            />
          ))
        ) : (
          <div>
            <center>
              <h5>No Reservations Available</h5>
            </center>
          </div>
        )}
      </div>
    );
  }
}
