import axios from "axios";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
});
service.interceptors.request.use(
  config => {
    config.headers.sessionId = localStorage.getItem(`sessionId`);
    // config.headers.sessionId = `8c2ffa9128794c548f1ecba25c3e35a0`;
    return config;
  },
  error => {
    return error;
  }
);
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error;
  }
);
export default service;