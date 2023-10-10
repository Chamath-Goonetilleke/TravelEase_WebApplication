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
import { getTrainById, getAllTrains } from "../../../services/trainService";
import { createNewSchedule } from "../../../services/scheduleService";

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
      weekType: "",
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
      trainObject: null,
      trainList: [],
      dailytypes: [],
      names: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      train_id: "",
    };
  }
  handleChange = (event) => {
    const {
      target: { value },
    } = event;
    
    // On autofill we get a stringified value.
    this.setState({
      dailytypes: typeof value === 'string' ? value.split(',') : value,
    });
    console.log(">>>>>>>>>>>>>>>>>>>>", this.state.dailytypes);
  };
  getTrainDetails = (value) => {
    // alert(">>> >>> ",this.state.train_id);
    getTrainById(value)
      .then(({ data }) => {
        console.log("___________::::: ",data)
        this.setState({ trainObject: data });
        console.log("::::::::",this.state.trainObject )
        console.log("::::::::",this.state.trainObject )
      })
      .catch((err) => console.log("Train Details Fetching Failed", err));
  };
  handleInputChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleInputChangeTrain = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    console.log("mmmmmmmmm", value)
    // this.getTrainDetails();
    this.getTrainDetails(value);
  };
  componentDidMount = async () => {
    await getAllTrains()
      .then(({ data }) => {
        console.log(">>>>>>>>>>>", data);
        this.setState({ trainList: data });
        // this.getTrainDetails();
      })
      .catch((err) => console.log(err));
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
    this.getTrainDetails();
    console.log("___________2 ",this.state.trainObject)
    const [, ...rest] = this.state.stationsArray;
    this.setState({ stationsArray: rest });
    const data = {
      trainNo: this.state.trainObject.trainNo,
      weekType: this.state.dailytypes,
      startStation: this.state.startStation,
      startTime: this.state.startTime,
      endStation: this.state.endStation,
      endTime: this.state.endTime,
      stations: this.state.stationsArray.slice(1),
      train: this.state.trainObject,
      Status: 0
    };
    console.log("data: ", data);
    createNewSchedule(data)
    .then(({ data }) => {
      console.log("train", data);
      this.props.callMainTrainFunction();
    })
    .catch((err) => {
      console.log(err)
    });
    
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
                          name="train_id"
                          value={this.state.train_id}
                          onChange={this.handleInputChangeTrain}
                          SelectProps={{
                            native: true,
                          }}
                          required
                          style={{ width: "300px", marginTop: '10px' }}
                        >
                          <option value="Train Number">Train Number</option>
                          {this.state.trainList.map((number) => (
                            <option key={number.id} value={number.id}>
                              {number.trainNo}
                            </option>
                          ))}
                        </TextField>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div>
                        <InputLabel id="demo-multiple-name-label">
                          Type
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={this.state.dailytypes}
                          onChange={this.handleChange}
                          input={<OutlinedInput label="Type" />}
                          MenuProps={MenuProps}
                          style={{width: '300px', height: '40px'}}
                        >
                          {this.state.names.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
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
                <div style={{ width: "90%" }}>
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
                      <Grid item xs={1} style={{ marginTop: "6px" }}>
                        <IconButton
                          aria-label="Example"
                          onClick={this.handleNewRecordToData}
                        >
                          <LibraryAddIcon />
                        </IconButton>
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
                    {this.state.stationsArray.slice(1).map((field, index) => (
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
