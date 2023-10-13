/*
------------------------------------------------------------------------------
File: ReservationHistory.js
Purpose: This file contains the ReservationHistory React component, which
displays the reservation history for a traveler.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React, { Component } from "react";
import { getReservationHistory } from "../../services/reservationService";
import HistoryItem from "./relatedComponents/HistoryItem";

export default class ReservationHistory extends Component {
  state = {
    reservations: [],
  };

  componentDidMount = async () => {
    await getReservationHistory(this.props.travelerNIC)
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
            <HistoryItem reservation={reservation} />
          ))
        ) : (
          <div>
            <center>
              <h5>No Reservations in History</h5>
            </center>
          </div>
        )}
      </div>
    );
  }
}
