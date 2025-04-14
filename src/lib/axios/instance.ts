import axios from "axios";

const headers: Record<string, string> = {
 Accept: "application/json",
 "Content-Type": "application/json",
 "Cache-Control": "no-cache",
 Pragma: "no-cache",
 Expires: "0",
};

const instance = axios.create({
 baseURL: process.env.NEXT_PUBLIC_API_URL,
 headers,
 timeout: 60 * 1000,
});

instance.interceptors.request.use(
 (config) => {
  return config;
 },
 (error) => {
  return Promise.reject(error);
 }
);

instance.interceptors.response.use(
 (response) => {
  return response;
 },
 (error) => {
  if (error.response) {
   console.error("API Error:", error.response.status, error.response.data);
  } else if (error.request) {
   console.error("API No Response:", error.request);
  } else {
   console.error("API Setup Error:", error.message);
  }
  return Promise.reject(error);
 }
);

export default instance;
