/*
------------------------------------------------------------------------------
File: UpdateReservationDialog.js
Purpose: This file contains the UpdateReservationDialog React component, which
allows users to update their reservations, including selecting a new date.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function UpdateReservationDialog({
  open,
  handleClose,
  reservation,
  isLoading,
}) {
  const [date, setDate] = React.useState(dayjs(reservation.date));
  const shouldDisableDate = (date) => {
    const today = new Date();
    if (date < today) {
      return true;
    }

    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    if (date > maxDate) {
      return true;
    }

    return false;
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update Reservation
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
          <div>
            <h5>
              {reservation.from} to {reservation.to}
            </h5>
            <br />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(e) => {
                  setDate(e);
                }}
                shouldDisableDate={shouldDisableDate}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div style={{ marginTop: "2rem", fontStyle: "italic" }}>
            *If you want to change any other information, It's recommended to
            cancel the reservation and re-book.
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleClose(date)}>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="false"
              style={{ marginRight: "1rem" }}
              hidden={!isLoading}
            ></span>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
