/*
------------------------------------------------------------------------------
File: ViewMoreDialog.js
Purpose: This file contains the ViewMoreDialog React component, which displays
additional details of a reservation.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function ViewMoreDialog({ open, handleClose, reservation }) {
  return (
    <div>
      <Dialog onClose={handleClose} open={open} fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Reservation Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <div style={{ paddingBottom: "2rem" }}>
            <TableContainer>
              <Table size="small" aria-label="spanning table">
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
                    <TableCell>Price per Ticket</TableCell>
                    <TableCell>LKR {reservation.classPrice}.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Price</TableCell>
                    <TableCell>LKR {reservation.totalPrice}.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
