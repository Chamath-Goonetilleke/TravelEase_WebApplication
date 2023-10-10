import http from "./httpService";

const endpoint = "/train";

export async function getTrainById(id) {
  return await http.get(endpoint + "/trains/"+id);
}
export async function getAllTrains(id) {
    return await http.get(endpoint + "/trains");
}
export async function createNewTrain(data) {
    return await http.post(endpoint + "/new-train", data);
}


