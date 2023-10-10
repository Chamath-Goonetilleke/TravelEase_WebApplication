import { Button, Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

export default function RequestCard({request}) {
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
    <Paper elevation={5}>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>NIC No: {request.travelerNIC}</div>
        <div>Requested Date: {DisplayDate(request.time)}</div>
        <Link to={`/traveler/${request.travelerNIC}`}>
          <Button variant='outlined' >View Profile</Button>
        </Link>
      </div>
    </Paper>
  );
}
