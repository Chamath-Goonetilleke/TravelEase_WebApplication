/*
------------------------------------------------------------------------------
File: TravelAgentReservations.js
Purpose: This file contains the TravelAgentReservations React component, which displays reservations for a travel agent.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React, { Component } from "react";

import { getReservationsByTravelAgent } from "../../../services/reservationService";
import ReservationItem from "../../ticketBookingManagement/relatedComponents/ReservationItem";

export default class TravelAgentReservations extends Component {
  state = {
    reservations: [],
  };

  componentDidMount = async () => {
    await getReservationsByTravelAgent()
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
            <ReservationItem reservation={reservation} />
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
