/*
------------------------------------------------------------------------------
File: authService.js
Purpose: This file contains functions for authenticating users and retrieving the current user's information.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/

import Cookies from "js-cookie";
import http from "./httpService";

const endpoint = "/user";

/*
------------------------------------------------------------------------------
Method: authUser
Purpose: Authenticates a user by sending their credentials to the server.
Parameters:
- authUser (object): An object containing user authentication data.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function authUser(authUser) {
  return await http.post(endpoint + "/auth", authUser, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
}

/*
------------------------------------------------------------------------------
Method: currentUser
Purpose: Retrieves the current user's information from the server.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function currentUser() {
  // Retrieve the authentication token from cookies
  const token = Cookies.get("token");
  if (!token) {
    return Promise.reject("No access token set.");
  }
  // Send an HTTP GET request to retrieve the current user's profile
  return await http.get(endpoint + "/profile", {
    headers: { Authorization: "Bearer " + token },
  });
}
