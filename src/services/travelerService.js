import Cookies from "js-cookie";
import http from "./httpService";

const endpoint = "/traveler";

export async function createTraveler(traveler) {
  return await http.post(endpoint + "/register", traveler);
}

export async function getAllTravelers() {
  const token = Cookies.get("token");
  return await http.get(endpoint + "/getAllTravelers", {
    headers: { Authorization: "Bearer " + token },
  });
}

export async function updateTraveler(traveler) {
  const token = Cookies.get("token");
  return await http.put(endpoint + "/update", traveler, {
    headers: { Authorization: "Bearer " + token },
  });
}

export async function deleteTraveler(nic) {
  const token = Cookies.get("token");
  return await http.delete(endpoint + `/delete/${nic}`, {
    headers: { Authorization: "Bearer " + token },
  });
}