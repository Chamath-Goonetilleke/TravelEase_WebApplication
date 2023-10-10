import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Avatar, Chip } from "@mui/material";
import { Link } from "react-router-dom";

export default function TravelerCard({ traveler,role }) { 

  return (
    <Card sx={{ minWidth: 200, marginRight: "1rem" }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            alt=""
            src={"avatarImage || user.imageUrl"}
            sx={{ width: 100, height: 100, marginBottom: ".6rem" }}
          />
          <div>NIC : {traveler.nic}</div>
          <div style={{ marginTop: "10px", marginBottom: "-12px" }}>
            {traveler.state === 1 ? (
              <Chip label="Inactive" color="error" variant="outlined" />
            ) : (
              <Chip label="Active" color="primary" variant="outlined" />
            )}
          </div>
        </div>
      </CardContent>
      <div style={{ justifyContent: "center", margin: "10px" }}>
        {traveler.state === 1 && role !== "BackOfficeUser" ? (
          <Button
            size="small"
            variant="outlined"
            sx={{ width: "100%" }}
            disabled={true}
          >
            View
          </Button>
        ) : (
          <Link to={`/traveler/${traveler.nic}`}>
            <Button size="small" variant="outlined" sx={{ width: "100%" }}>
              View
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
