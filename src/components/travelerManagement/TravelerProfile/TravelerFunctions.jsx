/*
------------------------------------------------------------------------------
File: TravelerFunctions.js
Purpose: This file contains the TravelerFunctions React component, which
displays functionalities for managing reservations and traveler information.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React, { Component } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import ReservationStepper from "../../ticketBookingManagement/ReservationStepper";
import CurrentReservations from "../../ticketBookingManagement/CurrentReservations";
import ReservationHistory from "../../ticketBookingManagement/ReservationHistory";

export default class TravelerFunctions extends Component {
  render() {
    return (
      <div
        style={{
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{ height: "5rem" }}
          >
            <Typography fontSize={22}>Add New Reservation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ReservationStepper
              travelerNIC={this.props.travelerNIC}
              travelerState={this.props.travelerState}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{ height: "5rem" }}
          >
            <Typography fontSize={22}>Current Reservations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CurrentReservations
              travelerNIC={this.props.travelerNIC}
              travelerState={this.props.travelerState}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{ height: "5rem" }}
          >
            <Typography fontSize={22}>Reservation History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ReservationHistory travelerNIC={this.props.travelerNIC} />
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}
