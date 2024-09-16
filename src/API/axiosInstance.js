import axios from "axios";

const instance = axios.create({
  baseURL: "https://",

  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
