import React, { Component } from "react";
import InitialDetails from "./stepperSteps/InitialDetails";
import CheckAvailability from "./stepperSteps/CheckAvailability";
import ConfirmationAndPayment from "./stepperSteps/ConfirmationAndPayment";
import PassengerInformation from "./stepperSteps/PassengerInformation";
import {
  createNewReservation,
  getAllSchedules,
} from "../../services/reservationService";
import PaymentForm from "./stepperSteps/PaymentForm";
import { toast } from "react-toastify";
import { Paper } from "@mui/material";

export default class StepperBody extends Component {
  state = {
    initialDetails: { from: "", to: "", date: null, noOfPassengers: 1 },
    schedules: [],
    filteredSchedules: [],
    selectedSchedule: {},
    passengers: [],
    reservation: {},
    isLoading: false,
  };

  componentDidMount = async () => {
    await getAllSchedules()
      .then(({ data }) => {
        this.setState({ schedules: data });
      })
      .catch((err) => console.log(err));
  };

  handleInitialDetails = (data) => {
    const { schedules } = this.state;
    console.log("sx", schedules);
    this.setState({ initialDetails: data });

    const availableSchedules = [];
    schedules.forEach((schedule) => {
      let stations = [...schedule.stations];
      if (stations.includes(data.from) && stations.includes(data.to)) {
        if (stations.indexOf(data.from) < stations.indexOf(data.to)) {
          const scheduleDetails = {
            id: schedule.trainSchedule.id,
            ...schedule.trainSchedule.train,
            from: data.from,
            to: data.to,
            date: data.date.format("YYYY-MM-DD"),
            departs:
              schedule.trainSchedule.stations[stations.indexOf(data.from)]
                .newStartTime,
            arrives:
              schedule.trainSchedule.stations[stations.indexOf(data.to)]
                .newStartTime,
            totalDistance: this.calculateTotalDistance(
              stations.indexOf(data.from),
              stations.indexOf(data.to),
              schedule.trainSchedule.stations
            ),
          };
          availableSchedules.push(scheduleDetails);
        }
      }
    });
    this.setState({ filteredSchedules: availableSchedules });
    this.props.nextHandle();
  };

  calculateTotalDistance(startIndex, endIndex, stations) {
    let totalDistance = 0;

    for (let i = startIndex; i <= endIndex; i++) {
      if (stations[i] && stations[i].distance) {
        totalDistance += stations[i].distance;
      }
    }
    return totalDistance;
  }
  handleSelectSchedule = (name) => {
    const schedule = this.state.filteredSchedules.filter(
      (s) => s.trainNo + "" === (name + "").split(" ")[0]
    );
    this.setState({ selectedSchedule: schedule });
    console.log(schedule);
  };

  handlePassengers = (passengers) => {
    this.setState({ passengers: passengers });
  };

  getReservation = (reservation) => {
    reservation.passengers = this.state.passengers;
    console.log("res", reservation);

    this.setState({ reservation: reservation });
  };

  handleSubmitReservation = async (paymentData) => {
    this.setState({ isLoading: true });

    const reservation = this.state.reservation;
    reservation.isTravelerCreated = false;
    reservation.travelerNIC = this.props.travelerNIC;
    reservation.trainNo = reservation.trainNo + "";
    reservation.classPrice = reservation.classPrice + "";
    reservation.totalPrice = reservation.totalPrice + "";

    await createNewReservation(reservation)
      .then(({ data }) => {
        toast.success(data, { autoClose: 1000 });
        this.setState({ isLoading: false });
        setTimeout(async () => {
          this.props.getReservationSummary(reservation);
          this.props.nextHandle();
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { activeStep } = this.props;
    const {
      initialDetails,
      filteredSchedules,
      selectedSchedule,
      passengers,
      reservation,
      isLoading,
    } = this.state;
    return (
      <Paper elevation={8} >
        <div
          style={{
            padding: "1rem",
            marginTop: "2rem",
          }}
        >
          {activeStep === 0 ? (
            <InitialDetails
              initial={initialDetails}
              onChangeData={this.handleInitialDetails}
            />
          ) : activeStep === 1 ? (
            <CheckAvailability
              schedules={filteredSchedules}
              onSelectSchedule={this.handleSelectSchedule}
            />
          ) : activeStep === 3 ? (
            <ConfirmationAndPayment
              schedule={selectedSchedule}
              passengers={passengers.length}
              getReservation={this.getReservation}
            />
          ) : activeStep === 2 ? (
            <PassengerInformation
              numOfPassengers={initialDetails.noOfPassengers}
              onAddPassenger={this.handlePassengers}
            />
          ) : activeStep === 4 ? (
            <PaymentForm
              reservation={reservation}
              isButtonLoading={isLoading}
              handleSubmit={this.handleSubmitReservation}
            />
          ) : (
            <></>
          )}
        </div>
      </Paper>
    );
  }
}
