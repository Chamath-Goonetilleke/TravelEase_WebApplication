import Cookies from "js-cookie";
import http from "./httpService";

const endpoint = "/user";

export async function createUser(user) {
  return await http.post(endpoint + "/register", user);
}

export async function updateUser(newUser) {
  const token = Cookies.get("token");
  return await http.put(endpoint + "/update", newUser, {
    headers: { Authorization: "Bearer " + token },
  });
}
