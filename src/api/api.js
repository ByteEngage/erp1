import axios from "axios";

// 🔥 IMPORTANT: VITE_ prefix mandatory
const baseURL = import.meta.env.VITE_API_URL;

// (optional) debug
// console.log("API URL:", baseURL);

const API = axios.create({
  baseURL,
  withCredentials: false,
});

// 🔐 attach JWT automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;