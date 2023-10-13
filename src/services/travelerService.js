/*
------------------------------------------------------------------------------
File: travelerService.js
Purpose: This file contains functions for managing traveler-related operations, including creating, updating, and retrieving traveler information.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/

import Cookies from "js-cookie";
import http from "./httpService";

const endpoint = "/traveler";

/*
------------------------------------------------------------------------------
Method: createTraveler
Purpose: Creates a new traveler account by sending traveler data to the server.
Parameters:
- traveler (object): An object containing traveler data.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function createTraveler(traveler) {
  return await http.post(endpoint + "/register", traveler);
}

/*
------------------------------------------------------------------------------
Method: getAllTravelers
Purpose: Retrieves a list of all travelers from the server.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function getAllTravelers() {
  const token = Cookies.get("token");
  return await http.get(endpoint + "/getAllTravelers", {
    headers: { Authorization: "Bearer " + token },
  });
}

/*
------------------------------------------------------------------------------
Method: getTraveler
Purpose: Retrieves traveler information by NIC (National Identity Card number).
Parameters:
- nic (string): The NIC of the traveler to retrieve.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function getTraveler(nic) {
  const token = Cookies.get("token");
  return await http.get(endpoint + `/getTraveler/${nic}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

/*
------------------------------------------------------------------------------
Method: updateTraveler
Purpose: Updates an existing traveler's information by sending updated traveler data to the server.
Parameters:
- traveler (object): An object containing updated traveler data.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function updateTraveler(traveler) {
  const token = Cookies.get("token");
  return await http.put(endpoint + "/update", traveler, {
    headers: { Authorization: "Bearer " + token },
  });
}

/*
------------------------------------------------------------------------------
Method: deleteTraveler
Purpose: Deletes a traveler account by NIC (National Identity Card number).
Parameters:
- nic (string): The NIC of the traveler to delete.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function deleteTraveler(nic) {
  const token = Cookies.get("token");
  return await http.delete(endpoint + `/delete/${nic}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

/*
------------------------------------------------------------------------------
Method: activateAccount
Purpose: Activates a traveler's account by NIC (National Identity Card number).
Parameters:
- nic (string): The NIC of the traveler whose account will be activated.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function activateAccount(nic) {
  const token = Cookies.get("token");
  return await http.get(endpoint + `/activateAccount/${nic}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

/*
------------------------------------------------------------------------------
Method: deActivateAccount
Purpose: Deactivates a traveler's account by NIC (National Identity Card number).
Parameters:
- nic (string): The NIC of the traveler whose account will be deactivated.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function deActivateAccount(nic) {
  const token = Cookies.get("token");
  return await http.get(endpoint + `/deactivateAccount/${nic}`, {
    headers: { Authorization: "Bearer " + token },
  });
}
