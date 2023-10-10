import { Paper } from '@mui/material'
import React, { Component } from 'react'
import ClassCard from '../ClassCard';
import TicketSummaryComponent from '../TicketSummaryComponent';

export default class ConfirmationAndPayment extends Component {
  render() {
    return (
      <div>
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <h3>Select Seat Class</h3>
        </div>
        <div style={{}}>
          <ClassCard
            className={"Air Conditioned Saloon"}
            price={"1000"}
            available={"100"}
          />
          <ClassCard
            className={"Air Conditioned Saloon"}
            price={"1000"}
            available={"100"}
          />
        </div>
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <h3>Summary</h3>
        </div>
        <div>
          <TicketSummaryComponent />
        </div>
      </div>
    );
  }
}
