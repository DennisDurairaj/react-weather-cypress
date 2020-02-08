import axios from "axios";

const API_URL = "http://localhost:3050";
export const mockAPI = name =>
  axios.get(`${API_URL}/cities?name=${name}`).then(res => res.data[0]);
