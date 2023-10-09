import React, { Component } from "react";
import InitialDetails from "./stepperSteps/InitialDetails";
import CheckAvailability from "./stepperSteps/CheckAvailability";
import ConfirmationAndPayment from "./stepperSteps/ConfirmationAndPayment";
import PassengerInformation from "./stepperSteps/PassengerInformation";
import TicketSummary from "./stepperSteps/TicketSummary";
import Form from "../common/form";

export default class StepperBody extends Component {
  state = {
    initialDetails: { from: "", to: "", date: null, noOfPassengers: 1 },
  };

  handleInitialDetails = (data) => {
    this.setState({ initialDetails: data });
    console.log(data)
  };

  render() {
    const { activeStep } = this.props;
    const{initialDetails}= this.state;
    return (
      <div
        style={{
          border: "1px solid black",
          padding: "1rem",
          marginTop: "2rem",
        }}
      >
        {activeStep === 0 ? (
          <InitialDetails initial={initialDetails} onChangeData={this.handleInitialDetails} />
        ) : activeStep === 1 ? (
          <CheckAvailability />
        ) : activeStep === 3 ? (
          <ConfirmationAndPayment />
        ) : activeStep === 2 ? (
          <PassengerInformation numOfPassengers={4} />
        ) : activeStep === 4 ? (
          <TicketSummary />
        ) : (
          <></>
        )}
      </div>
    );
  }
}
