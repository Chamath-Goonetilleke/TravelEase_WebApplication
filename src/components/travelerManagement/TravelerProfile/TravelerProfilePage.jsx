import { Avatar, Button, Fab } from "@mui/material";
import React, { Component } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { updateUser } from "../../../services/userService";
import { toast } from "react-toastify";
import UpdateTravelerForm from "./UpdateTravelerForm";
import AlertDialog from "../../common/AlertDialog";
import { deleteTraveler } from "../../../services/travelerService";

export default class TravelerProfilePage extends Component {
  state = {
    avatarImage: null,
    isEnabled: false,
    deleteDialogOpen: false,
    deleteMessage: {
      title: "Delete Traveler Profile",
      text: "Are you sure you want to delete?",
    },
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ avatarImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialogOpen: false });
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

  handleDeleteTraveler = async () => {
    const traveler = JSON.parse(this.props.match.params.traveler);
     await deleteTraveler(traveler.nic)
       .then(({ data }) => {
         toast.success(data, { autoClose: 1000 });
         this.setState({ isLoading: false });
         setTimeout(async () => {
           window.location = "/profile";
         }, 2000);
       })
       .catch((err) => {
         toast.error(err.response.data);
         this.setState({ isLoading: false });
         this.onReset();
       });
  }

  render() {
    const traveler = JSON.parse(this.props.match.params.traveler);
    const { avatarImage, isEnabled, deleteDialogOpen, deleteMessage } =
      this.state;
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
                  src={avatarImage || traveler.imageUrl}
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
                  Traveler Account
                </div>
              </div>
              <div>
                <div style={{ fontSize: "18px", marginTop: "1rem", flex: 2 }}>
                  <div>
                    {traveler.title +
                      " " +
                      traveler.firstName +
                      " " +
                      traveler.lastName}
                  </div>
                  <div>{traveler.email}</div>
                  <div>{"NIC : " + traveler.nic}</div>
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
                display: "flex",
                flexDirection: "column",
                flex: 2.5,
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: "15px",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <UpdateTravelerForm traveler={traveler} />
              <Button
                variant="outlined"
                color="error"
                sx={{ marginTop: "4rem" }}
                onClick={() => this.setState({ deleteDialogOpen: true })}
              >
                Delete the traveler Profile
              </Button>
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
          ></div>
        </div>
        <AlertDialog
          open={deleteDialogOpen}
          handleClose={this.handleDeleteDialogClose}
          message={deleteMessage}
          onOKButton={this.handleDeleteTraveler}
        />
      </div>
    );
  }
}
