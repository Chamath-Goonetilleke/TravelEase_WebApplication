import Cookies from "js-cookie";
import http from "./httpService";

const endpoint = "/reservation";

export async function getAllSchedules(){
const token = Cookies.get("token");
    return await http.get(endpoint + "/getReservations",{
    headers: { Authorization: "Bearer " + token },
  });
}
