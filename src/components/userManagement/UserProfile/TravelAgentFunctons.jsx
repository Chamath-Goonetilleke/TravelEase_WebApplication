import React, { Component } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TravelerRegForm from "../../travelerManagement/TravelerRegForm";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { getAllTravelers } from "../../../services/travelerService";
import TravelerCard from "../../travelerManagement/TravelerProfile/TravelerCard";
import { getAllRequests } from "../../../services/accountRequestService";
import RequestCard from "./RequestCard";
import { Chip } from "@mui/material";
import TrainPage from "../../trainManagement/train/trainpage";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export default class TravelAgentFunctions extends Component {
  state = {
    searchValue: null,
    travelers: [],
    filteredTravelers: [],
    requests: [],
  };

  componentDidMount = async () => {
    await getAllTravelers()
      .then(({ data }) => {
        this.setState({ travelers: data, filteredTravelers: data });
        this.filterTravelers(null, data);
      })
      .catch((err) => console.log(err));

    const role = this.props.role;
    if (role === "BackOfficeUser") {
      await getAllRequests().then(({ data }) => {
        this.setState({ requests: data });
      });
    }
  };

  handleInputChange = (e) => {
    const searchValue = e.target.value;
    const filteredTravelers = this.state.travelers.filter((traveler) =>
      traveler.nic.includes(searchValue)
    );

    this.setState({ searchValue, filteredTravelers });
  };

  render() {
    const { searchValue, filteredTravelers, requests } = this.state;
    const role = this.props.role;
    console.log(requests)
    return (
      <div
        style={{
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ height: "5rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography fontSize={22}>Managing Travelers</Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchValue}
                  onChange={this.handleInputChange}
                />
              </Search>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {filteredTravelers.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                {filteredTravelers.map((traveler) => (
                  <TravelerCard traveler={traveler} role={role} />
                ))}
              </div>
            ) : (
              <div>No Travelers Found</div>
            )}
          </AccordionDetails>
        </Accordion>
        {role === "TravelAgent" ? (
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ height: "5rem" }}
              >
                <Typography fontSize={22}>Create Traveler Account</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TravelerRegForm user={this.props.user} />
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ height: "5rem" }}
              >
                <Typography fontSize={22}>Traveler Reservations</Typography>
              </AccordionSummary>
              <AccordionDetails></AccordionDetails>
            </Accordion>
          </div>
        ) : (
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ height: "5rem" }}
              >
                <Typography fontSize={22}>
                  Traveler Account Activation Requests
                </Typography>
                <Chip
                  label={requests.length > 0 ? requests.length : "No Requests"}
                  color="primary"
                  variant="outlined"
                  sx={{ marginLeft: "1rem" }}
                />
              </AccordionSummary>
              <AccordionDetails>
                {requests.length !== 0 ? (
                  requests.map((req) => <RequestCard request={req} />)
                ) : (
                  <div>No Activation Requests</div>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                sx={{ height: "5rem" }}
              >
                <Typography fontSize={22}>Train Management</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TrainPage/>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </div>
    );
  }
}
