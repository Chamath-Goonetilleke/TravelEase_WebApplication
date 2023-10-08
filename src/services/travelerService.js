import Cookies from "js-cookie";
import http from "./httpService";

const endpoint = "/traveler";

export async function createTraveler(traveler) {
  return await http.post(endpoint + "/register", traveler);
}

export async function getAllTravelers(){
    const token = Cookies.get("token");
    return await http.get(endpoint + "/getAllTravelers", {
      headers: { Authorization: "Bearer " + token },
    });
}