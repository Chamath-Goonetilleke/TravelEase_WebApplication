import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function TicketSummaryComponent() {
  const trainInfo = {
    trainName: "8057 Express Train",
    startStation: "Colombo Fort",
    endStation: "Galle",
    departureDate: "2023-10-13",
    timeStartEnd: "07:14 - 09:29",
    numOfPassengers: 1,
    trainClassSelected: "Air Conditioned Saloon",
    priceOnePerson: 1100,
    total: 1000,
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
            <TableRow>
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
