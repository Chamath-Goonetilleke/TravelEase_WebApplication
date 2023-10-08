import React, { Component } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default class BackOfficeUserFunctions extends Component {
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
            <Typography fontSize={22}>
              Traveler Account Activation Requests
            </Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{ height: "5rem" }}
          >
            <Typography fontSize={22}>
              Traveler Account Deactivation Requests
            </Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </div>
    );
  }
}
