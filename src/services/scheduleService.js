import http from "./httpService";

const endpoint = "/schedule";

export async function createNewSchedule(data) {
    return await http.post(endpoint + "/new-schedule", data);
}
export async function getAllSchedule(id) {
    return await http.get(endpoint + "/schedules");
}
export async function getScheduleById(id) {
  return await http.get(endpoint + "/schedule/"+id);
}
export async function checkTrainReservationById(id) {
    return await http.get(endpoint + "/train-status/"+id);
}
export async function updateTrainSchedule(id, data) {
    return await http.post(endpoint + "/update-schedule/"+id, data);
}
export async function updateScheduleTrainSchedule(id, data) {
    return await http.post(endpoint + "/update-schedule/"+id, data);
}
export async function updateTrainStatus(id, status) {
    return await http.patch(endpoint + "/update-schedules-status/"+id+"/"+status);
}
export async function updateResevationScheduleTrainStatus(id, IsCancled) {
    return await http.patch(endpoint + "/update-schedules-status-cancled/"+id+"/"+IsCancled);
}
export async function updateNewScheduleTrainStatus(id, IsPublished) {
    return await http.patch(endpoint + "/update-schedules-status/"+id+"/"+IsPublished);
}

