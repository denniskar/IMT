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

const client = () => {
  return axios.get(API_URL + "/clients", { headers: authHeader() });
};

const schemes = (id) => {
  return axios.get(API_URL + "/clients/schemes/" + id, {
    headers: authHeader(),
  });
};

const loans = (id) => {
  console.log(id);
  console.log(API_URL + "/clients/loanTypes" + id);
  return axios.get(API_URL + "/clients/loanTypes/" + id, {
    headers: authHeader(),
  });
};

const states = (code) => {
  return axios.get(API_URL + "/country/" + code + "/states", {
    headers: authHeader(),
  });
};

const country = () => {
  return axios.get(API_URL + "/country", { headers: authHeader() });
};

const currencyPair = () => {
  return axios.get(API_URL + "/currency/pair", { headers: authHeader() });
};
const exchangeRate = () => {
  return axios.get(API_URL + "/currency/rates", { headers: authHeader() });
};
export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  payment,
  client,
  loans,
  schemes,
  states,
  country,
  currencyPair,
  exchangeRate,
};
