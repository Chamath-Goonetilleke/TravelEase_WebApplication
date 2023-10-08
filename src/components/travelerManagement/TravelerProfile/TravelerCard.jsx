import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Avatar} from "@mui/material";
import { Link } from "react-router-dom";

export default function TravelerCard({ traveler }) {

  const jsonTraveler = JSON.stringify(traveler);

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
            sx={{ width: 120, height: 120, marginBottom: ".6rem" }}
          />
          <div>NIC : {traveler.nic}</div>
        </div>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Link to={`/traveler/${jsonTraveler}`}>
          <Button size="small" variant="outlined" sx={{width:'100%'}} >View</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
