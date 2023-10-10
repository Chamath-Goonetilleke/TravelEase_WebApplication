import React, { Component } from "react";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import TextField from "@mui/material/TextField";
import { getScheduleById, updateTrainSchedule } from "../../../services/scheduleService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
export default class ScheduleManagementTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      trainNo: 0,
      tabValue: 2,
      schedules: {},
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
      names: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      trainNo: this.props.trainNo,
      schedule_id: "",
      status: 0,
      isAlertMsg: false,
    };
  }
  handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ isAlertMsg: false });
  };
  createData(name, trainNo, classes, reference) {
    return { name, trainNo, classes, reference };
  }
  handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // On autofill we get a stringified value.
    this.setState({
      dailytypes: typeof value === "string" ? value.split(",") : value,
    });
    console.log(">>>>>>>>>>>>>>>>>>>>", this.state.dailytypes);
  };
  handleInputChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleTabChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
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
  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  handleChangeIndex = (index) => {
    this.setState(index);
  };
  componentDidMount = () => {
    this.fetchSchedules();
    
  };

  fetchSchedules = async () => {
    try {
      const { data } = await getScheduleById(this.state.trainNo);
      console.log("this.state.schedules", data);
      this.setState({
        trainNo: data.trainNo,
        dailytypes: data.weekType,
        startStation: data.startStation,
        startTime: data.startTime,
        endStation: data.endStation,
        endTime: data.endTime,
        stationsArray: data.stations,
        schedule_id: data.id,
        trainObject: data.train,
        status: data.status
      });
      console.log("this.state.schedules", this.state.schedules);
    } catch (error) {
      // Handle error if needed
      console.log(error);
    }
    console.log("train_idtrain_idtrain_id=======",this.state.trainNo)
  };
  handleSubmit = (event) => {
    event.preventDefault();
    
    // this.handleDialogOpen();
    // this.getTrainDetails();
    console.log("___________2 ",this.state.trainObject)
    const [, ...rest] = this.state.stationsArray;
    this.setState({ isAlertMsg: true });
    this.setState({ stationsArray: rest });
    const data = {
      trainNo: this.state.trainNo,
      weekType: this.state.dailytypes,
      startStation: this.state.startStation,
      startTime: this.state.startTime,
      endStation: this.state.endStation,
      endTime: this.state.endTime,
      stations: this.state.stationsArray.slice(1),
      train: this.state.trainObject,
      Status: 0
    };
    console.log("data::::: ", data);
    updateTrainSchedule(this.state.schedule_id, data)
    .then(({ data }) => {
      console.log("train", data)
    })
    .catch((err) => {
      console.log(err)
    });
    this.setState({ isAlertMsg: true });
    this.props.callMainTrainFunction();
  };
  render() {
    const { train_id } = this.props;
    return (
      <div style={{ margin: "80px" }}>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div>
                    <TextField
                      label="Train Number"
                      variant="standard"
                      name="train_id"
                      value={this.state.trainNo}
                      required
                      style={{ width: "350px", marginTop: "5px" }}
                      disabled
                    ></TextField>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <InputLabel id="demo-multiple-name-label">Type</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={this.state.dailytypes}
                      onChange={this.handleChange}
                      input={<OutlinedInput label="Type" />}
                      MenuProps={MenuProps}
                      style={{ width: "350px", height: "40px" }}
                    >
                      {this.state.names.map((name) => (
                        <MenuItem key={name} value={name}>
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
                    style={{ width: "350px" }}
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
                    style={{ width: "350px" }}
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
                    style={{ width: "350px" }}
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
                    style={{ width: "350px" }}
                  />
                </Grid>
              </Grid>
            </div>
            <hr style={{ width: "65%" }} />
            {/* Dynamic array */}
            {this.state.stationsArray.map((station, index) =>(
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
                      value={station.newStartStation}
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
                      value={station.newStartTime}
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
                      value={station.distance}
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
                      value={station.newEndStation}
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
                      value={station.newEndTime}
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
            ))}
            <Button type="submit" color="primary">
              Submit
            </Button>
            <Button onClick={this.handleDialogClose} color="primary">
              Close
            </Button>
            <div
              style={{ float: "right", marginTop: "-350px", width: "300px" }}
            >
              
            </div>
          </form>
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
