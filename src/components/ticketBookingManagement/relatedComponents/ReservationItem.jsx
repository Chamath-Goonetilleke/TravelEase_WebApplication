/*
------------------------------------------------------------------------------
File: ReservationItem.js
Purpose: This file contains the ReservationItem React component, representing a
single item in the reservation history, displaying information about a past reservation.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import { Button, IconButton, Paper, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import ViewMoreDialog from "./ViewMoreDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "../../common/AlertDialog";
import UpdateReservationDialog from "./UpdateReservationDialog";
import dayjs from "dayjs";
import { updateReservation } from "../../../services/reservationService";
import { toast } from "react-toastify";
import { getTraveler } from "../../../services/travelerService";

export default function ReservationItem({ reservation }) {
  const [openViewMore, setOpenViewMore] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [travelerState, setTravelerState] = React.useState(0);
  const deleteMessage = {
    title: "Cancel Reservation",
    text: "Are you sure you want to cancel?",
  };

  useEffect(() => {
    const getUser = async () => {
      await getTraveler(reservation.travelerNIC).then(({ data }) => {
        setTravelerState(data.state);
      });
    };
    getUser();
  }, [reservation.travelerNIC]);

  function isDateWithin5DaysFromToday(date) {
    const today = dayjs();
    const differenceInDays = date.diff(today, "day");
    return differenceInDays >= 0 && differenceInDays < 5;
  }

  const handleViewMoreOpen = () => {
    setOpenViewMore(true);
  };
  const handleViewMoreClose = () => {
    setOpenViewMore(false);
  };

  const handleUpdateOpen = () => {
    setOpenUpdate(true);
  };
  const handleUpdateClose = async (date) => {
    const res = {
      isCancel: false,
      date: date.format("YYYY-MM-DD"),
      id: reservation.id,
    };
    setIsLoading(true);
    await updateReservation(res)
      .then(({ data }) => {
        toast.success(data, { autoClose: 1000 });
        setIsLoading(false);
        setTimeout(async () => {
          setOpenUpdate(false);
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setIsLoading(false);
        setOpenUpdate(false);
      });
  };

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleCancelReservation = async () => {
    const res = {
      isCancel: true,
      date: null,
      id: reservation.id,
    };
    await updateReservation(res)
      .then(({ data }) => {
        toast.success(data, { autoClose: 1000 });
        setTimeout(async () => {
          setOpenDelete(false);
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setOpenDelete(false);
      });
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
          {isDateWithin5DaysFromToday(dayjs(reservation.date)) ||
          travelerState === 1 ? (
            <Tooltip
              title={
                travelerState === 1
                  ? "Account is Inactive Can't make ant changes"
                  : "Cannot cancel or update, if the reservation is in 5days"
              }
              placement="top"
            >
              <div>
                <IconButton onClick={handleDeleteOpen} disabled={true}>
                  <DeleteIcon />
                </IconButton>

                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  onClick={handleUpdateOpen}
                  disabled={true}
                >
                  Update
                </Button>
              </div>
            </Tooltip>
          ) : (
            <div>
              <IconButton onClick={handleDeleteOpen}>
                <DeleteIcon />
              </IconButton>
              <Button
                size="small"
                variant="outlined"
                color="warning"
                onClick={handleUpdateOpen}
              >
                Update
              </Button>
            </div>
          )}
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
      <UpdateReservationDialog
        open={openUpdate}
        handleClose={handleUpdateClose}
        reservation={reservation}
        isLoading={isLoading}
      />
      <AlertDialog
        open={openDelete}
        handleClose={handleDeleteClose}
        message={deleteMessage}
        onOKButton={handleCancelReservation}
      />
    </Paper>
  );
}
