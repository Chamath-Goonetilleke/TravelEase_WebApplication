import { Button, Chip, Paper } from "@mui/material";
import React from "react";

export default function ClassCard ({className, price, available, onClick}){

    return (
      <Paper
        elevation={6}
        sx={{ display: "inline-block", marginRight: "1rem" }}
      >
        <Button
          sx={{ padding: 0 }}
          onClick={() => onClick({ className: className }, price)}
        >
          <div>
            <div
              style={{
                padding: "10px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              {className}
            </div>
            <Chip
              label={"LKR. " + price + ".00"}
              color="success"
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "lightblue",
                padding: "0.5rem",
                alignItems: "center",
              }}
            >
              <div style={{ color: "black", fontWeight: "bold" }}>
                Available
              </div>
              <div
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "5px",
                }}
              >
                {available}
              </div>
            </div>
          </div>
        </Button>
      </Paper>
    );
  }

