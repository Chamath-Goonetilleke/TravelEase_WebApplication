import React, { Component } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { updateResevationScheduleTrainStatus, updateNewScheduleTrainStatus } from "../../../services/scheduleService";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.status,
      train_id: props.train_id,
      isAlertMsg: false,
      alertseverity: "success",
      scheduleId: props.scheduleId,
      status: props.status,
      open: false,
    };
  }
  handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ isAlertMsg: false });
  };

  handleChange = (event) => {
    this.setState({ checked: event.target.checked });
  };
  //   warning
  updateTrainReservation = async () => {
    try {
      const { data } = await updateNewScheduleTrainStatus(
        this.props.scheduleId,
        this.state.checked
      );
      this.setState({ train_status: this.state.checked });
      console.log("oooooooooooooooooooo",data);

      console.log("this.state.schedulessssss", this.state.scheduleId);

      // this.props.handleControlPanelDialogClose();
    } catch (error) {
      // Handle error if needed
      console.log(error);
    }
  };
  handleClose = () => {
    this.setState({open: false})
  };

  render() {
    const { checked } = this.state;
    // const { train_status } = this.props;
    // const { train_id } = this.props;

    return (
      <Box sx={{ width: "300px", maxWidth: 360, bgcolor: "background.paper" }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{ textAlign: "left" }}
              >
                Current Status
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">
                {this.props.status ? (
                  <Chip color="success" label="PUBLISHED" />
                ) : (
                  <Chip color="warning" label="CANCELED" />
                )}
              </Typography>
            </Grid>
          </Grid>
          {/* <Typography color="text.secondary" variant="body2">
            Update trains for reservations
          </Typography> */}
        </Box>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>
          <Typography gutterBottom variant="body1">
            Select Status{" "}
            <Switch
              checked={checked}
              onChange={this.handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            {checked ? (
              <Chip
                color="success"
                label="PUBLISHED"
                style={{ float: "right" }}
              />
            ) : (
              <Chip
                color="warning"
                label="CANCELED"
                style={{ float: "right" }}
              />
            )}
          </Typography>
          <Stack direction="row" spacing={1}></Stack>
        </Box>
        <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
          <Button onClick={this.updateTrainReservation} variant="outlined">
            Update
          </Button>
        </Box>
        <Snackbar
          open={this.state.isAlertMsg}
          autoHideDuration={6000}
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
        <Dialog
            open={this.state.open}
            onClose={this.handleDialogClose}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Cannot Cancled Train. You have Resevations</DialogTitle>
          </Dialog>
      </Box>
    );
  }
}

export default ControlPanel;
