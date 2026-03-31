import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const loginUser = async (data) => {
  return await axios.post(`${API}/auth/login`, data);
};