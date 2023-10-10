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
import IconButton from "@mui/material/IconButton";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import {createNewTrain} from "../../../services/trainService"

export default class createTrain extends Component {
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
          availableCount: 0
        },
      ],
      newRecord: {
        className: "",
        seatCount: 0,
        availableCount: 0
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
    const availableCount = 0
    const newFields = [
      ...this.state.stationsArray,
      { className, seatCount, availableCount },
    ];
    this.setState({
      stationsArray: newFields,
      newRecord: {
        className: "",
        seatCount: 0,
        availableCount: 0
      },
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
    this.props.handleDialogClose();
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
      classes: this.state.stationsArray.slice(1)
    };
    console.log("data: ", data);
    createNewTrain(data)
    .then(({ data }) => {
      console.log("train", data)
    })
    .catch((err) => {
      console.log(err)
    });
    this.handleDialogClose();
    this.props.handleScheduleDialogOpen();
  };
  render() {
    return (
      <div>
        <div style={{ margin: "30px", marginLeft: "100px" }}>
            <DialogContent>
              <form onSubmit={this.handleSubmit}>
                <DialogContent>
                  <div style={{width: '90%'}}>
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
                  {/* class component */}
                  <div>
                    <div>
                        {this.state.stationsArray.slice(1).map((field, index) => (
                          <div style={{width: '90%'}} key={index}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Class Name"
                                type="text"
                                fullWidth
                                value={field.className}
                                size="small"
                                disabled
                              />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Seat count"
                                type="text"
                                fullWidth
                                value={field.seatCount}
                                size="small"
                                disabled
                              />
                            </Grid>
                          </Grid>
                        </div>
                        ))}
                    </div>
                  </div>
                  <div style={{width: '90%'}}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                      <TextField
                          autoFocus
                          margin="dense"
                          id="className"
                          label="Class Name"
                          type="text"
                          name="className"
                          fullWidth
                          value={this.state.newRecord.className}
                          onChange={(e) =>
                            this.setState({
                              newRecord: {
                                ...this.state.newRecord,
                                className: e.target.value,
                              },
                            })
                          }
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="seatCount"
                          label="Seat count"
                          type="number"
                          name="seatCount"
                          fullWidth
                          value={this.state.newRecord.seatCount}
                          onChange={(e) =>
                            this.setState({
                              newRecord: {
                                ...this.state.newRecord,
                                seatCount: e.target.value,
                              },
                            })
                          }
                          size="small"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        style={{ marginTop: "8px" }}
                      >
                        <IconButton aria-label="Example" onClick={this.handleNewRecordToData}>
                        <LibraryAddIcon />
                        </IconButton>
                        
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
            </div>
      </div>
    )
  }
}
