import React, { Component } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Fab, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";

const style = {
  width: "100%",
};

export default class PassengerInformation extends Component {
  state = {
    passenger: {
      type: "",
      nic: null,
    },
    passengers: [],
  };

  handleInputChange = (e) => {
    let target = {};
    if (e.currentTarget) {
      target = e.currentTarget;
    } else {
      target = e.target;
    }
    const { name, value } = target;
    const passenger = { ...this.state.passenger };
    passenger[name] = value;
    this.setState({ passenger: passenger });
  };

  handleAdd = () => {
    let passenger = this.state.passenger;
    let passengers = [...this.state.passengers];
    passengers.push(passenger);
    passenger = {
      type: "",
      nic: null,
    };
    this.props.onAddPassenger(passengers)
    this.setState({ passengers: passengers, passenger: passenger });
  };

  render() {
    const { numOfPassengers } = this.props;
    const items = Array.from(
      { length: numOfPassengers - 1 },
      (_, index) => index
    );
    const { passengers, passenger } = this.state;
    return (
      <div>
        <h5>Other passengers details</h5>
        {numOfPassengers <= 1 ? (
          <div>No Passengers</div>
        ) : (
          <div>
            <List sx={style} component="nav" aria-label="mailbox folders">
              {items.length !== passengers.length ? (
                <ListItem button divider key={passengers.length}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>Passenger {passengers.length + 1}</div>
                    <FormControl sx={{ width: "25%" }}>
                      <InputLabel id="demo-simple-select-label">
                        Passenger Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={passenger.type}
                        label="Passenger Type"
                        name="type"
                        onChange={this.handleInputChange}
                      >
                        <MenuItem value={"Adult"}>Adult</MenuItem>
                        <MenuItem value={"Dependent"}>Dependent</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      id="outlined-basic"
                      label="NIC Number"
                      variant="outlined"
                      name="nic"
                      value={passenger.nic}
                      onChange={this.handleInputChange}
                    />
                    <Fab
                      color="primary"
                      aria-label="add"
                      size="small"
                      onClick={this.handleAdd}
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                </ListItem>
              ) : (
                <div>All Passengers are Added.</div>
              )}
            </List>
          </div>
        )}
      </div>
    );
  }
}
