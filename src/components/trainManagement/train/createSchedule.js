import React, { Component } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Chip from "@mui/material/Chip";

export default class createSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      trainNo: 0,
      open: false,
      startTime: "",
      startStation: "",
      endTime: "",
      endStation: "",
      weekType: "Weekday",
      trainNumbers: ["123", "456", "789"],
      weekOrWeekend: ["Weekday", "Weekend"],
      newStartStation: "",
      newEndStation: "",
      stationsArray: [
        {
          newStartStation: "",
          newEndStation: "",
          newStartTime: "",
          newEndTime: "",
          distance: 0,
        },
      ],
      newRecord: {
        newStartStation: "",
        newEndStation: "",
        newStartTime: "",
        newEndTime: "",
        distance: 0,
      },
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
  handleNewRecordToData = () => {
    const {
      newStartStation,
      newEndStation,
      distance,
      newStartTime,
      newEndTime,
    } = this.state.newRecord;
    const newFields = [
      ...this.state.stationsArray,
      { newStartStation, newEndStation, distance, newStartTime, newEndTime },
    ];
    this.setState({
      stationsArray: newFields,
      newRecord: {
        newStartStation: "",
        newEndStation: "",
        distance: 0,
        newStartTime: "",
        newEndTime: "",
      },
    });
  };
  handleDialogClose = () => {
    this.props.callMainTrainFunction();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleDialogOpen();
    const [, ...rest] = this.state.stationsArray;
    this.setState({ stationsArray: rest });
    const data = {
      trainNo: this.state.trainNo,
      weekType: this.state.weekType,
      startStation: this.state.startStation,
      startTime: this.state.startTime,
      endStation: this.state.endStation,
      endTime: this.state.endTime,
      stations: this.state.stationsArray
    };
    console.log("data: ", data);
    this.props.callMainTrainFunction();
  };
  render() {
    return (
      <div>
        <div style={{ margin: "30px", marginLeft: "100px" }}>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <DialogContent>
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <div>
                        <TextField
                          label="Train Number"
                          variant="standard"
                          select
                          name="trainNo"
                          value={this.state.trainNo}
                          onChange={this.handleInputChange}
                          SelectProps={{
                            native: true,
                          }}
                          required
                          style={{ width: "300px" }}
                        >
                          <option value="Train Number">Train Number</option>
                          {this.state.trainNumbers.map((number) => (
                            <option key={number} value={number}>
                              {number}
                            </option>
                          ))}
                        </TextField>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div>
                        <TextField
                          label="Weekend /Weekend"
                          variant="standard"
                          select
                          name="weekType"
                          value={this.state.weekType}
                          onChange={this.handleInputChange}
                          SelectProps={{
                            native: true,
                          }}
                          required
                          style={{ width: "300px" }}
                        >
                          <option value="Select Type">Select Type</option>
                          {this.state.weekOrWeekend.map((number) => (
                            <option key={number} value={number}>
                              {number}
                            </option>
                          ))}
                        </TextField>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <br />
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="startStation"
                        label="Start Station"
                        type="text"
                        name="startStation"
                        fullWidth
                        variant="standard"
                        value={this.state.startStation}
                        onChange={this.handleInputChange}
                        required
                        style={{ width: "300px" }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="startTime"
                        label="Start Time"
                        type="text"
                        name="startTime"
                        fullWidth
                        variant="standard"
                        value={this.state.startTime}
                        onChange={this.handleInputChange}
                        required
                        style={{ width: "300px" }}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="endStation"
                        label="End Station"
                        type="text"
                        name="endStation"
                        fullWidth
                        variant="standard"
                        value={this.state.endStation}
                        onChange={this.handleInputChange}
                        required
                        style={{ width: "300px" }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="endTime"
                        label="End Time"
                        type="text"
                        name="endTime"
                        fullWidth
                        variant="standard"
                        value={this.state.endTime}
                        onChange={this.handleInputChange}
                        required
                        style={{ width: "300px" }}
                      />
                    </Grid>
                  </Grid>
                </div>
                <hr style={{ width: "65%" }} />
                {/* Dynamic array */}
                <div style={{width: '90%'}}>
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="newStartStation"
                          label="Start Station"
                          type="text"
                          name="newStartStation"
                          fullWidth
                          value={this.state.newRecord.newStartStation}
                          onChange={(e) =>
                            this.setState({
                              newRecord: {
                                ...this.state.newRecord,
                                newStartStation: e.target.value,
                              },
                            })
                          }
                          style={{ width: "200px" }}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="newStartTime"
                          label="Start Time"
                          type="text"
                          name="newStartTime"
                          fullWidth
                          value={this.state.newRecord.newStartTime}
                          onChange={(e) =>
                            this.setState({
                              newRecord: {
                                ...this.state.newRecord,
                                newStartTime: e.target.value,
                              },
                            })
                          }
                          style={{ width: "200px" }}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="distance"
                          label="Distance(Km)"
                          type="text"
                          name="distance"
                          fullWidth
                          value={this.state.newRecord.distance}
                          onChange={(e) =>
                            this.setState({
                              newRecord: {
                                ...this.state.newRecord,
                                distance: e.target.value,
                              },
                            })
                          }
                          style={{ width: "135px" }}
                          size="small"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        style={{ marginTop: "16px" }}
                        onClick={this.handleNewRecordToData}
                      >
                        <LibraryAddIcon />
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="newEndStation"
                          label="End Station"
                          type="text"
                          name="newEndStation"
                          fullWidth
                          value={this.state.newRecord.newEndStation}
                          onChange={(e) =>
                            this.setState({
                              newRecord: {
                                ...this.state.newRecord,
                                newEndStation: e.target.value,
                              },
                            })
                          }
                          style={{ width: "200px" }}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="newEndTime"
                          label="End Time"
                          type="text"
                          name="newEndTime"
                          fullWidth
                          value={this.state.newRecord.newEndTime}
                          onChange={(e) =>
                            this.setState({
                              newRecord: {
                                ...this.state.newRecord,
                                newEndTime: e.target.value,
                              },
                            })
                          }
                          style={{ width: "200px" }}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </div>
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
              <div
                style={{ float: "right", marginTop: "-350px", width: "300px" }}
              >
                <div>
                  <h2>Records:</h2>
                  <ul>
                    {this.state.stationsArray.map((field, index) => (
                      <li key={index}>
                        {field.newStartStation} - {field.newEndStation} -{" "}
                        {field.distance} Km
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </form>
          </DialogContent>
        </div>
      </div>
    );
  }
}
