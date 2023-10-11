import React, { Component } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Chip from "@mui/material/Chip";
import { getTrainById, getAllTrains } from "../../../services/trainService";
import ScheduleManagementTab from "./ScheduleManagementTab";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ControlPanel from "../commonComponents/ControlPanel";
import { getScheduleById } from "../../../services/scheduleService";
import TrainStatusControl from "../commonComponents/TrainStatusControl";



function createData(name, trainNo, classes, reference) {
  return { name, trainNo, classes, reference };
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
export default class TrainManagementTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      trainNo: 0,
      tabValue: 2,
      rows: [
        createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
        createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
        createData("Eclair", 262, 16.0, 24, 6.0),
        createData("Cupcake", 305, 3.7, 67, 4.3),
        createData("Gingerbread", 356, 16.0, 49, 3.9),
      ],
      trainList: [],
      scheduleIsOpen: false,
      controlPanelIsOpen: false,
      train_id: 0,
      train_status: 0,
      trainNo: 0,
    };
  }
  componentDidMount = async () => {
    await getAllTrains()
      .then(({ data }) => {
        console.log(">>>>>>>>>>>", data);
        this.setState({ trainList: data });
      })
      .catch((err) => console.log(err));
  };

  handleTabChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };
  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  handleChangeIndex = (index) => {
    this.setState(index);
  };
  handleScheduleDialogOpen = (trainNo) => {
    console.log("first: train_id======222",trainNo)
    this.setState({trainNo: trainNo})
    console.log("first: train_id======",this.state.trainNo)
    this.setState({ scheduleIsOpen: true });
  };
  handleScheduleDialogClose = () => {
    this.setState({ scheduleIsOpen: false });
  };
  handleControlPanelDialogOpen = async () => {
    // this.setState({train_id: id, train_status: status})
    this.setState({ controlPanelIsOpen: true });
  };
  handleControlPanelDialogClose = () => {
    this.setState({ controlPanelIsOpen: false });
  };
  receiveDataFromChild = (data) => {
    this.setState({ controlPanelIsOpen: data });
  };
  handleControlPanelDialogClicked = (id, status)=>{
    this.setState({train_id: id, train_status: status})
    console.log("first")
    this.handleControlPanelDialogOpen();
  }
  render() {
    return (
      <div style={{ margin: "5px" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Train Number</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.trainList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.trainNo}</TableCell>
                  
                  <TableCell align="right">{row.name}</TableCell>
                  
                  <TableCell align="right">{row.classes.map((classItem, index) => (
                      <Chip
                        key={index}
                        label={`${classItem.className} - Seats: ${classItem.seatCount}`}
                        color="primary" variant="outlined"
                        style={{ margin: "5px",marginTop: '15px',width: '150px' }}
                      />
                    ))}</TableCell>
                    <TableCell component="th" scope="row">
                    {row.status ? (
                  <Chip color="success" label="ACTIVE" style={{width: '100px'}} />
                ) : (
                  <Chip color="warning" label="INACTIVE" style={{width: '100px'}} />
                )}
                  </TableCell>
                  <TableCell align="right">
                    <div>
                      {/* <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        style={{marginRight: '5px'}}
                      ></Button> */}
                      <Button
                        variant="outlined"
                        startIcon={<RemoveRedEyeIcon />}
                        onClick={()=> this.handleScheduleDialogOpen(row.trainNo)}
                        style={{marginRight: '5px'}}
                      ></Button>
                      <Button
                        variant="outlined"
                        startIcon={<SettingsApplicationsIcon />}
                        onClick={()=> this.handleControlPanelDialogClicked(row.id, row.status)}
                        
                      ></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Dialog
            open={this.state.scheduleIsOpen}
            onClose={this.handleScheduleDialogClose}
            maxWidth="lg"
            fullWidth={true}
          >
            <DialogTitle>View Schedule</DialogTitle>
            <ScheduleManagementTab
            trainNo={this.state.trainNo}
              callMainTrainFunction={this.handleScheduleDialogClose}
            />
          </Dialog>
        </div>
        <div>
          <Dialog
            open={this.state.controlPanelIsOpen}
            onClose={this.handleControlPanelDialogClose}
            maxWidth="sm"
          >
            <DialogTitle></DialogTitle>
            <TrainStatusControl train_id={this.state.train_id} train_status={this.state.train_status} handleControlPanelDialogClose={this.handleControlPanelDialogClose}/>
          </Dialog>
        </div>
      </div>
    );
  }
}
