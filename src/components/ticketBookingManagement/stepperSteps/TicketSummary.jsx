/*
------------------------------------------------------------------------------
File: TicketSummary.js
Purpose: This file contains the TicketSummary React component, which displays
a booking summary after a successful train reservation.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export default function TicketSummary({ reservation }) {
  return (
    <div>
      <div
        style={{
          padding: "1rem",
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "green",
        }}
      >
        <TaskAltIcon
          style={{ color: "green", fontSize: "50px", marginRight: "1rem" }}
        />
        <h5>Booking Successful</h5>
      </div>
      <Paper elevation={6}>
        <div
          style={{
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          <center>
            <h3>Booking Summary</h3>
          </center>
          <br />
          <TableContainer>
            <Table
              sx={{ minWidth: 700 }}
              size="small"
              aria-label="spanning table"
            >
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
                <TableRow>
                  <TableCell>Train No & Name </TableCell>
                  <TableCell>
                    {reservation.trainNo + " " + reservation.trainName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Start Station</TableCell>
                  <TableCell>{reservation.from}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>End Station</TableCell>
                  <TableCell>{reservation.to}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Reservation Date</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Time Start - End</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>No of Passengers</TableCell>
                  <TableCell>{reservation.passengers.length + 1}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Train Class Selected</TableCell>
                  <TableCell>{reservation.trainClass}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={2} />
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", fontSize: "16px" }}
                    colSpan={2}
                  >
                    Price per ticket
                  </TableCell>
                  <TableCell align="right">
                    LKR {reservation.classPrice}.00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", fontSize: "16px" }}
                    colSpan={2}
                  >
                    Total
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    LKR {reservation.totalPrice}.00
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </div>
  );
}
