import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0",
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});
