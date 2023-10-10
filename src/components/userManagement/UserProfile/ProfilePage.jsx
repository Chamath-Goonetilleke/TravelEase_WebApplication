import { Avatar, Button, Fab } from "@mui/material";
import React, { Component } from "react";
import UpdateBackOfficeUser from "./UpdateBackOfficeUser";
import EditIcon from "@mui/icons-material/Edit";
import { updateUser } from "../../../services/userService";
import { toast } from "react-toastify";
import UpdateTravelAgent from "./UpdateTravelAgent";
import TravelAgentFunctions from "./TravelAgentFunctons";
//import BackOfficeUserFunctions from "./BackOfficeUserFunctions";

export default class ProfilePage extends Component {
  state = {
    avatarImage: null,
    isEnabled: false,
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Read the selected file as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update the state with the selected image
        this.setState({ avatarImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  handleSaveImage = async () => {
    const { user } = this.props;
    user.imageUrl = this.state.avatarImage;

    await updateUser(user)
      .then(({ data }) => {
        toast.success(data, { autoClose: 1000 });
        this.setState({ isLoading: false });
        setTimeout(async () => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  render() {
    const { user } = this.props;
    const { avatarImage, isEnabled } = this.state;

    return (
      <div style={{ backgroundColor: "#ebebeb" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "1rem",
            height: "83vh",
          }}
        >
          <div
            className="userInfo"
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              className="profileImage"
              style={{
                display: "flex",
                flexDirection: "row",
                borderRadius: "15px",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
                flex: 1,
                padding: "1rem",
                paddingLeft: "2rem",
                marginBottom: "1rem",
                backgroundColor: "white",
              }}
            >
              <div style={{ marginRight: "1rem", flex: 1 }}>
                <Avatar
                  alt=""
                  src={avatarImage || user.imageUrl}
                  sx={{ width: 120, height: 120 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  style={{ display: "none" }}
                  onChange={this.handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Fab
                    component="span"
                    color="secondary"
                    size="small"
                    sx={{
                      backgroundColor: "gray",
                      bottom: 35,
                      right: -100,
                    }}
                    onClick={() => this.setState({ isEnabled: !isEnabled })}
                  >
                    <EditIcon />
                  </Fab>
                </label>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginTop: "-1rem",
                  }}
                >
                  {user.role === "BackOfficeUser"
                    ? "Back Office User"
                    : "Travel Agent"}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "18px", marginTop: "1rem", flex: 2 }}>
                  <div>
                    {user.title + " " + user.firstName + " " + user.lastName}
                  </div>
                  <div>{user.email}</div>
                  <div>
                    {user.role === "BackOfficeUser"
                      ? "Emp ID : " + user.employeeId
                      : "Agent ID : " + user.travelAgentId}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "2rem",
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    disabled={!isEnabled}
                    sx={{ marginRight: "1rem" }}
                    onClick={() => this.setState({ isEnabled: !isEnabled })}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    disabled={!isEnabled}
                    onClick={() => this.handleSaveImage()}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
            <div
              className="userData"
              style={{
                flex: 2.5,
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: "15px",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              {user.role === "BackOfficeUser" ? (
                <UpdateBackOfficeUser user={user} role={user.role} />
              ) : user.role === "TravelAgent" ? (
                <UpdateTravelAgent user={user} role={user.role} />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div
            className="orders"
            style={{
              flex: 1.7,
              marginLeft: "1rem",
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
              display: "flex",
            }}
          >
            {/* {user.role === "BackOfficeUser" ? (
              <BackOfficeUserFunctions/>
            ) : user.role === "TravelAgent" ? (
              <TravelAgentFunctions user={user} role={user.role} />
            ) : (
              <></>
            )} */}
            <TravelAgentFunctions user={user} role={user.role} />
          </div>
        </div>
      </div>
    );
  }
}
