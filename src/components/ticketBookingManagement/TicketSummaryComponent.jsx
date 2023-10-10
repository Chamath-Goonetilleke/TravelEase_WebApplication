import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function TicketSummaryComponent({ schedule, passengers, selectedClass }) {
  const trainInfo = {
    trainName: schedule.name,
    startStation: schedule.from,
    endStation: schedule.to,
    departureDate: schedule.date,
    timeStartEnd: schedule.departs + "-" + schedule.arrives,
    numOfPassengers: passengers + 1,
    trainClassSelected: selectedClass.name,
    priceOnePerson: selectedClass.price,
    total: selectedClass.price * (passengers + 1),
  };
  const rowStyles = {
    // Adjust the height as needed
    height: "5px", // Set your desired row height here
  };

  return (
    <Paper elevation={5}>
      <TableContainer>
        <Table aria-label="Train Information">
          <TableHead>
            <TableRow
              style={{
                height: 20,
              }}
            >
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Information
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={rowStyles}>
              <TableCell>Train Name & No</TableCell>
              <TableCell>{trainInfo.trainName}</TableCell>
            </TableRow>
            <TableRow sx={rowStyles}>
              <TableCell>Start Station</TableCell>
              <TableCell>{trainInfo.startStation}</TableCell>
            </TableRow>
            <TableRow sx={rowStyles}>
              <TableCell>End Station</TableCell>
              <TableCell>{trainInfo.endStation}</TableCell>
            </TableRow>
            <TableRow sx={rowStyles}>
              <TableCell>Departure Date</TableCell>
              <TableCell>{trainInfo.departureDate}</TableCell>
            </TableRow>
            <TableRow sx={rowStyles}>
              <TableCell>Time Start - End</TableCell>
              <TableCell>{trainInfo.timeStartEnd}</TableCell>
            </TableRow>
            <TableRow sx={rowStyles}>
              <TableCell>No of Passengers</TableCell>
              <TableCell>{trainInfo.numOfPassengers}</TableCell>
            </TableRow>
            <TableRow sx={rowStyles}>
              <TableCell>Train Class Selected</TableCell>
              <TableCell>{trainInfo.trainClassSelected}</TableCell>
            </TableRow>
            <TableRow sx={rowStyles}>
              <TableCell>Price One Person</TableCell>
              <TableCell>LKR {trainInfo.priceOnePerson}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "10px",
          textAlign: "right",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Total Price : LKR {trainInfo.total}.00
      </div>
    </Paper>
  );
}
