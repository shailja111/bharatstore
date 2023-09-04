import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://storebh.bhaaraterp.com/api/",
});
