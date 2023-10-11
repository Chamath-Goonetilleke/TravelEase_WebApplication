import React, { Component } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CreateSchedule from "./createSchedule";
import CreateTrain from "./createTrain";
import TrainManagementTab from "../schedule/TrainManagementTab";
import ScheduleManagementTab from "../schedule/ScheduleManagementTab";



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class trainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      trainNo: 0,
      open: false,
      firstClassSeatNo: 0,
      firstClassPrice: 0,
      secondClassSeatNo: 0,
      secondClassPrice: 0,
      scheduleIsOpen: false,
      isAlertMsg: false,
      vertical: "top",
      horizontal: "right",
      stationsArray: [
        {
          className: "",
          seatCount: 0,
        },
      ],
      newRecord: {
        className: "",
        seatCount: 0,
      },
    };
  }
  handleInputChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleNewRecordToData = () => {
    const {className, seatCount} = this.state.newRecord;
    const newFields = [
      ...this.state.stationsArray,
      { className, seatCount },
    ];
    this.setState({
      stationsArray: newFields,
      newRecord: {
        className: "",
        seatCount: 0
      },
    });
  };

  handleDialogOpen = () => {
    this.setState({ open: true });
  };
  handleScheduleDialogOpen = () => {
    // this.setState({ isAlertMsg: true });
    this.setState({ scheduleIsOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  };
  handleScheduleDialogClose = () => {
    // this.setState({ isAlertMsg: true });
    this.setState({ scheduleIsOpen: false });
  };
  handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ isAlertMsg: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleDialogOpen();
    const data = {
      name: this.state.name,
      trainNo: this.state.trainNo,
      firstClassSeatNo: this.state.firstClassSeatNo,
      secondClassSeatNo: this.state.secondClassSeatNo,
      classes: this.state.stationsArray.slice(1)
    };
    console.log("data: ", data);
    this.handleDialogClose();
    this.setState({ isAlertMsg: true });
    this.handleScheduleDialogOpen();
  };
  render() {
    return (
      <div style={{margin: '80px'}}>
        <div>
          
          <div style={{float: 'right', marginRight: '30px'}}>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleDialogOpen}
          >
            Create Train
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleScheduleDialogOpen}
          >
            Create Schedule
          </Button>
          </div>
          <div>
            <TrainManagementTab/>
          </div>

          <Dialog
            open={this.state.open}
            onClose={this.handleDialogClose}
            maxWidth="md"
            fullWidth={true}
          >
            <DialogTitle>Create New Train</DialogTitle>
            <CreateTrain handleDialogClose={this.handleDialogClose} handleScheduleDialogOpen={this.handleScheduleDialogOpen}/>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={this.state.scheduleIsOpen}
            onClose={this.handleScheduleDialogClose}
            maxWidth="lg"
            fullWidth={true}
          >
            <DialogTitle>Create Schedule</DialogTitle>
            <CreateSchedule
              callMainTrainFunction={this.handleScheduleDialogClose}
            />
          </Dialog>
        </div>
        <Snackbar
          open={this.state.isAlertMsg}
          autoHideDuration={2000}
          onClose={this.handleAlertClose}
        >
          <Alert
            onClose={this.handleAlertClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully Created!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
