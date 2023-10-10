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
import { checkTrainReservationById } from "../../../services/scheduleService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.train_status,
      train_id: this.props.train_id,
      isAlertMsg: false,
      alertseverity: "success"
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
  updateTrainReservation = () => {
    // try {
    //     const { data } = await checkTrainReservationById(this.props.train_id);
    //     console.log("this.state.schedules", data);
    //   } catch (error) {
    //     // Handle error if needed
    //     console.log(error);
    //   }
    this.setState({ alertseverity: "warning",isAlertMsg: true });
    // this.setState({ alertseverity: "warning" });
    // warning
    this.props.handleControlPanelDialogClose();
  };

  render() {
    const { checked } = this.state;
    const { train_status } = this.props;
    const { train_id } = this.props;

    return (
      <Box sx={{ width: "300px", maxWidth: 360, bgcolor: "background.paper" }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h6" component="div" style={{textAlign: "left"}}>
                Current Status
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">
                {train_status ? (
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
          <Button onClick={this.updateTrainReservation} variant="outlined">Update</Button>
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
      </Box>
    );
  }
}

export default ControlPanel;
