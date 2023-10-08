import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://localhost:5065/api/v1";

// const token = Cookies.get("token");
// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + token || "token";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
export default http;
