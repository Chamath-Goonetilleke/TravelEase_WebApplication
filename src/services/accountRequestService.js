import Cookies from "js-cookie";
import http from "./httpService";

const endpoint = "/accountRequest";

export async function getAllRequests(){
    const token = Cookies.get("token");
    return await http.get(endpoint + "/getAllRequests", {
      headers: { Authorization: "Bearer " + token },
    });
}

