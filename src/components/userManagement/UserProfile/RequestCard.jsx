/*
------------------------------------------------------------------------------
File: RequestCard.js
Purpose: This file contains the RequestCard React component, which displays request details and links to traveler profiles.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import { Button, Paper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function RequestCard({ request }) {
  function DisplayDate(dateStr) {
    // Parse the date string into a JavaScript Date object
    const date = new Date(dateStr);

    // Get the date components (year, month, day)
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const day = date.getDate();

    // Create a formatted date string
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  }
  return (
    <Paper elevation={5} sx={{ marginBottom: "1rem" }}>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          marginBottom: "0rem",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1 }}>NIC No: {request.travelerNIC}</div>
        <div style={{ flex: 1 }}>
          Requested Date: {DisplayDate(request.time)}
        </div>
        <Link to={`/traveler/${request.travelerNIC}`}>
          <Button variant="outlined">View Profile</Button>
        </Link>
      </div>
    </Paper>
  );
}
