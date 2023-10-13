/*
------------------------------------------------------------------------------
File: HistoryItem.js
Purpose: This file contains the HistoryItem React component, which represents an
item in the reservation history, displaying information about a past reservation.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import { Button, Paper } from "@mui/material";
import React from "react";
import ViewMoreDialog from "./ViewMoreDialog";

export default function HistoryItem({ reservation }) {
  const [openViewMore, setOpenViewMore] = React.useState(false);

  const handleViewMoreOpen = () => {
    setOpenViewMore(true);
  };
  const handleViewMoreClose = () => {
    setOpenViewMore(false);
  };

  return (
    <Paper elevation={6} style={{ marginBottom: "1rem" }}>
      <div style={{ padding: "1rem" }}>
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5>
            {reservation.from} to {reservation.to}
          </h5>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div>Departure Date </div>
            <div>{reservation.date} </div>
          </div>

          <div>
            <div>Departs From</div>
            <div>
              {reservation.from} - {(reservation.time + "").split(" ")[0]}
            </div>
          </div>

          <div>
            <div>Arrives At </div>
            <div>
              {reservation.to} - {(reservation.time + "").split(" ")[2]}
            </div>
          </div>

          <div>
            <Button
              size="small"
              variant="outlined"
              onClick={handleViewMoreOpen}
            >
              More Details
            </Button>
            <br />
          </div>
        </div>
      </div>
      <ViewMoreDialog
        open={openViewMore}
        handleClose={handleViewMoreClose}
        reservation={reservation}
      />
    </Paper>
  );
}
