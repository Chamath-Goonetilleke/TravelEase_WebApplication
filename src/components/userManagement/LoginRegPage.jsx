import React, { Component } from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import TravelAgentRegForm from "./TravelAgentRegForm";
import TravelAgentLogForm from "./TravelAgentLogForm";
import BackOfficeLogForm from "./BackOfficeLogForm";
import BackOfficeRegForm from "./BackOfficeRegForm";

export default class LoginRegPage extends Component {
  state = {
    role: 2,
    isLogin: true,
  };

  handleRoleChange = (e) => {
    const { value } = e.target;
    this.setState({ role: value });
  };

  render() {
    const { role, isLogin } = this.state;
    return (
      <div
        style={{
          padding: "2rem",
        }}
      >
        <div className="regForm">
          <div
            style={{
              marginBottom: "2rem",
              display: "flex",
              flexDirection: "row",
              justifyContent:'space-between'
            }}
          >
            <div style={{ marginRight: "2rem" }}>
              <InputLabel id="demo-simple-select-label">
                Select the User Role
              </InputLabel>
              <Select
                value={this.state.role}
                label="Role"
                onChange={this.handleRoleChange}
              >
                <MenuItem value={1}>Travel Agent</MenuItem>
                <MenuItem value={2}>Back Office User</MenuItem>
              </Select>
            </div>
            {isLogin ? (
              <div>
                Don't you have an account?
                <Button onClick={() => this.setState({ isLogin: !isLogin })}>
                  Sign Up
                </Button>
              </div>
            ) : (
              <div>
                Already have an account?{" "}
                <Button onClick={() => this.setState({ isLogin: !isLogin })}>
                  Login
                </Button>
              </div>
            )}
          </div>
          {isLogin ? (
            role === 1 ? (
              <TravelAgentLogForm role={role} />
            ) : (
              role === 2 && <BackOfficeLogForm role={role} />
            )
          ) : role === 1 ? (
            <TravelAgentRegForm role={role} />
          ) : (
            role === 2 && <BackOfficeRegForm role={role} />
          )}
        </div>
      </div>
    );
  }
}
