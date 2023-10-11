import Cookies from "js-cookie";
import http from "./httpService";

const endpoint = "/reservation";

export async function getAllSchedules() {
  const token = Cookies.get("token");
  return await http.get(endpoint + "/getReservations", {
    headers: { Authorization: "Bearer " + token },
  });
}

export async function getReservationsByTraveler(id) {
  const token = Cookies.get("token");
  return await http.get(endpoint + `/reservationByTraveler/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

export async function getReservationsByTravelAgent(id) {
  const token = Cookies.get("token");
  return await http.get(endpoint + `/reservationByTravelAgent/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

export async function getReservationHistory(id) {
  const token = Cookies.get("token");
  return await http.get(endpoint + `/reservationHistory/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

export async function createNewReservation(reservation) {
  const token = Cookies.get("token");
  return await http.post(endpoint + "/addReservation", reservation, {
    headers: { Authorization: "Bearer " + token },
  });
}
