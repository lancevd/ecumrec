import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5670/api"
      : "https://voxance-backend.vercel.app/",
  withCredentials: true,
});