/*
------------------------------------------------------------------------------
File: userService.js
Purpose: This file contains functions for managing user-related operations, including user registration and updating user information.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/

import Cookies from "js-cookie";
import http from "./httpService";

const endpoint = "/user";

/*
------------------------------------------------------------------------------
Method: createUser
Purpose: Creates a new user account by sending user data to the server.
Parameters:
- user (object): An object containing user data.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function createUser(user) {
  return await http.post(endpoint + "/register", user);
}

/*
------------------------------------------------------------------------------
Method: updateUser
Purpose: Updates an existing user's information by sending updated user data to the server.
Parameters:
- newUser (object): An object containing updated user data.
Returns: A promise that resolves to the response data.
------------------------------------------------------------------------------
*/
export async function updateUser(newUser) {
  const token = Cookies.get("token");
  return await http.put(endpoint + "/update", newUser, {
    headers: { Authorization: "Bearer " + token },
  });
}
