/*
------------------------------------------------------------------------------
File: ReservationStepper.js
Purpose: This file contains the ReservationStepper React component, which
provides a step-by-step reservation process for travelers.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import StepperBody from "./StepperBody";
import TicketSummary from "./stepperSteps/TicketSummary";

const steps = [
  "Initial Details",
  "Check Availability",
  "Passenger Information",
  "Confirmation",
  "Payment & Checkout",
];

export default function ReservationStepper({ travelerNIC, travelerState }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [reservationSummary, setReservationSummary] = React.useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    window.location.reload();
  };

  const handleWithoutNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleGetReservation = (reservation) => {
    setReservationSummary(reservation);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <TicketSummary reservation={reservationSummary} />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" onClick={handleReset}>
              Done
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <StepperBody
            activeStep={activeStep}
            nextHandle={handleWithoutNext}
            travelerNIC={travelerNIC}
            travelerState={travelerState}
            getReservationSummary={handleGetReservation}
          />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep !== 0 && activeStep !== 4 && (
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
