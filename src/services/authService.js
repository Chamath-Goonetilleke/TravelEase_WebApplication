import Cookies from "js-cookie";
import http from "./httpService";

const endpoint = "/user";

export async function authUser(authUser) {
  return await http.post(endpoint + "/auth", authUser, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
}

export async function currentUser() {
  const token = Cookies.get("token");
  if (!token) {
    return Promise.reject("No access token set.");
  }
  return await http.get(endpoint + "/profile", {
    headers: { Authorization: "Bearer " + token },
  });
}
