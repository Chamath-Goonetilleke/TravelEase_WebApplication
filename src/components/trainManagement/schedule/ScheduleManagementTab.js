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
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';


import {
  getScheduleById,
  updateTrainSchedule,
} from "../../../services/scheduleService";
import ControlPanel from "../commonComponents/ControlPanel";
import ControlSchedulePanel from "../commonComponents/ControlSchedulePanel";

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
      scheduleId: "",
      status: 0,
      isAlertMsg: false,
      resevation: {
        resevationCount: 0,
        totalPrice: 0,
        isStatusChanged: false
      },
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
  handleDialogClose = ()=>{
    this.props.callMainTrainFunction();
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
        scheduleId: data.id,
        trainObject: data.train,
        status: data.isPublished,
      });
      console.log("this.state.schedulesss123", this.state.scheduleId);
      console.log("this.state.schedulesss123", this.state.status);
    } catch (error) {
      // Handle error if needed
      console.log(error);
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();

    // this.handleDialogOpen();
    // this.getTrainDetails();
    console.log("___________2 ", this.state.trainObject);
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
      stations: this.state.stationsArray,
      train: this.state.trainObject,
      Status: 0,
    };
    console.log("data::::: ", data);
    updateTrainSchedule(this.state.scheduleId, data)
      .then(({ data }) => {
        console.log("train", data);
        this.props.callMainTrainFunction();
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ isAlertMsg: true });
    
  };
  handleFieldChange = (index, field, value) => {
    const updatedStationsArray = [...this.state.stationsArray];
    updatedStationsArray[index][field] = value;
    this.setState({ stationsArray: updatedStationsArray });
    console.log("updatedStationsArray>>>>", updatedStationsArray);
    console.log("updatedStationsArray>>>>", this.state.stationsArray);
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
            {this.state.stationsArray.map((station, index) => (
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
                          this.handleFieldChange(
                            index,
                            "newStartStation",
                            e.target.value
                          )
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
                          this.handleFieldChange(
                            index,
                            "newStartTime",
                            e.target.value
                          )
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
                          this.handleFieldChange(
                            index,
                            "distance",
                            parseInt(e.target.value, 10)
                          )
                        }
                        style={{ width: "135px" }}
                        size="small"
                      />
                    </Grid>
                    {/* <Grid item xs={1} style={{ marginTop: "6px" }}>
                    <IconButton
                      aria-label="Example"
                      onClick={this.handleNewRecordToData}
                    >
                      <LibraryAddIcon />
                    </IconButton>
                  </Grid> */}
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
                          this.handleFieldChange(
                            index,
                            "newEndStation",
                            e.target.value
                          )
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
                          this.handleFieldChange(
                            index,
                            "newEndTime",
                            e.target.value
                          )
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
              style={{ float: "right", marginTop: "-40%", width: "300px" }}
            >
              <div
              >
                <p style={{ textAlign: "center" }}>
                  {/* Available Reservation Summary */}
                </p>
                <div>
                  {/* {this.state.resevation != null ? (
                    <div>
                      <Paper
                        elevation={3}
                        style={{
                          padding: "20px",
                          textAlign: "center",
                          margin: "20px auto",
                          maxWidth: "300px",
                        }}
                      >
                        <Typography variant="h6">
                          Reservation Details
                        </Typography>
                        <Typography variant="body1" style={{textAlign: 'left'}}>
                          Reservation Count: <span style={{textAlign: 'right'}}>{this.state.resevation.resevationCount}</span>
                        </Typography>
                      </Paper>
                    </div>
                  ) : (
                    <div>test</div>
                  )} */}
                  <div style={{margin: '0px'}}>
                {/* ,pointerEvents: this.state.resevation.isStatusChanged ? '': 'none' */}
                <Paper elevation={3}
                        style={{
                          textAlign: "center", width: '300px', padding: '1px', marginBottom: '30px'
                        }}><ControlSchedulePanel scheduleId={this.state.scheduleId} status={this.state.status} fetchSchedules={this.fetchSchedules}/></Paper>
                </div>
                </div>
                <div style={{margin: '0px'}}>
                {/* ,pointerEvents: this.state.resevation.isStatusChanged ? '': 'none' */}
                <Paper elevation={3}
                        style={{
                          textAlign: "center", width: '300px', padding: '1px'
                        }}><ControlPanel scheduleId={this.state.scheduleId} status={this.state.status} handleControlPanelDialogClose={this.handleControlPanelDialogClose}/></Paper>
                </div>
              </div>
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
