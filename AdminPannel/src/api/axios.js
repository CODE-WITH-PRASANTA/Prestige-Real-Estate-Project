import axios from "axios";

// 👉 API for backend
export const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 👉 Image Base URL
export const IMG_URL = "http://localhost:5000";