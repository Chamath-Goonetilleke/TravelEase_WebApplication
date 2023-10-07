import React, { Component } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CreateSchedule from "./createSchedule";

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
      scheduleIsOpen: true,
      isAlertMsg: false,
      vertical: "top",
      horizontal: "right",
    };
  }
  handleInputChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleDialogOpen = () => {
    this.setState({ open: true });
  };
  handleScheduleDialogOpen = () => {
    this.setState({ scheduleIsOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  };
  handleScheduleDialogClose = () => {
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
    };
    console.log("data: ", data);
    this.handleDialogClose();
    this.setState({ isAlertMsg: true });
    this.handleScheduleDialogOpen();
  };
  render() {
    return (
      <div>
        hhhhh
        <div>
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

          <Dialog open={this.state.open} onClose={this.handleDialogClose}>
            <DialogTitle>Create New Train</DialogTitle>
            <DialogContent>
              <form onSubmit={this.handleSubmit}>
                <DialogContent>
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Train Name"
                          type="text"
                          name="name"
                          fullWidth
                          variant="standard"
                          value={this.state.name}
                          onChange={this.handleInputChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="trainNo"
                          label="Train No"
                          type="number"
                          name="trainNo"
                          fullWidth
                          variant="standard"
                          value={this.state.trainNo}
                          onChange={this.handleInputChange}
                          required
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <br />
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <DialogContentText>First Class</DialogContentText>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="firstClassSeatNo"
                          label="Seat count"
                          type="number"
                          name="firstClassSeatNo"
                          fullWidth
                          variant="standard"
                          value={this.state.firstClassSeatNo}
                          onChange={this.handleInputChange}
                          required
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <hr />
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <DialogContentText>Second Class</DialogContentText>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="secondClassSeatNo"
                          label="Seat count"
                          type="number"
                          name="secondClassSeatNo"
                          fullWidth
                          variant="standard"
                          value={this.state.secondClassSeatNo}
                          onChange={this.handleInputChange}
                          required
                        />
                      </Grid>
                    </Grid>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                  <Button onClick={this.handleDialogClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
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
            This is a success message!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
