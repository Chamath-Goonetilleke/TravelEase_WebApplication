import axios from "axios";

axios.defaults.baseURL = "http://localhost:5065/api/v1";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
export default http;
