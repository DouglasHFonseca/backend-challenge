import axios from "axios";

const api = axios.create({
  baseURL: "https://countriesnow.space/api/v0.1/countries",
});

export { api }