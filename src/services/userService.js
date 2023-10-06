import http from "./httpService";

const endpoint = "/register";

export async function createUser(user) {
  return await http.post(endpoint, user, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
}
