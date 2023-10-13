/*
------------------------------------------------------------------------------
File: accountRequestService.js
Purpose: This file contains functions for making HTTP requests related to account requests.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import Cookies from "js-cookie";
import http from "./httpService";

const endpoint = "/accountRequest";

/*
------------------------------------------------------------------------------
Method: getAllRequests
Purpose: Retrieves all account requests from the server.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function getAllRequests() {
  // Retrieve the authentication token from cookies
  const token = Cookies.get("token");

  // Send an HTTP GET request to retrieve all account requests
  return await http.get(endpoint + "/getAllRequests", {
    headers: { Authorization: "Bearer " + token },
  });
}
