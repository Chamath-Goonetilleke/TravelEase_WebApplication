/*
------------------------------------------------------------------------------
File: reservationService.js
Purpose: This file contains functions for managing reservations, including creating, updating, and retrieving reservations.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/

import Cookies from "js-cookie";
import http from "./httpService";

const endpoint = "/reservation";

/*
------------------------------------------------------------------------------
Method: getAllSchedules
Purpose: Retrieves all reservations from the server.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function getAllSchedules() {
  const token = Cookies.get("token");
  return await http.get(endpoint + "/getReservations", {
    headers: { Authorization: "Bearer " + token },
  });
}

/*
------------------------------------------------------------------------------
Method: createNewReservation
Purpose: Creates a new reservation by sending reservation data to the server.
Parameters:
- reservation (object): An object containing reservation data.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function createNewReservation(reservation) {
  const token = Cookies.get("token");
  return await http.post(endpoint + "/addReservation", reservation, {
    headers: { Authorization: "Bearer " + token },
  });
}

/*
------------------------------------------------------------------------------
Method: updateReservation
Purpose: Updates an existing reservation by sending updated reservation data to the server.
Parameters:
- reservation (object): An object containing updated reservation data.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function updateReservation(reservation) {
  const token = Cookies.get("token");
  return await http.put(endpoint + "/updateReservation", reservation, {
    headers: { Authorization: "Bearer " + token },
  });
}

/*
------------------------------------------------------------------------------
Method: getReservationsByTraveler
Purpose: Retrieves reservations for a specific traveler by traveler ID.
Parameters:
- id (string): The ID of the traveler.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function getReservationsByTraveler(id) {
  const token = Cookies.get("token");
  return await http.get(endpoint + `/reservationByTraveler/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

/*
------------------------------------------------------------------------------
Method: getReservationsByTravelAgent
Purpose: Retrieves reservations for a travel agent.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function getReservationsByTravelAgent() {
  const token = Cookies.get("token");
  return await http.get(endpoint + `/reservationByTravelAgent`, {
    headers: { Authorization: "Bearer " + token },
  });
}

/*
------------------------------------------------------------------------------
Method: getReservationHistory
Purpose: Retrieves the reservation history for a specific traveler by traveler ID.
Parameters:
- id (string): The ID of the traveler.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function getReservationHistory(id) {
  const token = Cookies.get("token");
  return await http.get(endpoint + `/reservationHistory/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}
