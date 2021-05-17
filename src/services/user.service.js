import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/qsend/v1";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const payment = () => {
  return axios.get(API_URL + "/transactions", { headers: authHeader() });
};

const client =()=>{
  return axios.get(API_URL+"/clients",{headers:authHeader()})
}
export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  payment,
  client
};
