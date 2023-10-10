import React, { Component } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  width: "100%",
};

export default class PassengerInformation extends Component {
  render() {
    const { numOfPassengers } = this.props;
    const items = Array.from(
      { length: numOfPassengers - 1 },
      (_, index) => index
    );
    return (
      <div>
        <h5>Other passengers details</h5>
        {numOfPassengers <= 1 ? (
          <div>No Passengers</div>
        ) : (
          <div>
            <List sx={style} component="nav" aria-label="mailbox folders">
              {items.map((item) => (
                <ListItem button divider key={item}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>Passenger {item + 1}</div>
                    <FormControl sx={{ width: "25%" }}>
                      <InputLabel id="demo-simple-select-label">
                        Passenger Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Passenger Type"
                        name={"passenger" + (item + 1)}
                        // onChange={handleChange}
                      >
                        <MenuItem value={"Adult"}>Adult</MenuItem>
                        <MenuItem value={"Dependent"}>Dependent</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      id="outlined-basic"
                      label="NIC Number"
                      variant="outlined"
                      name={"passenger" + (item + 1)}
                    />
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    );
  }
}
