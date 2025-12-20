import axios from "axios";

export const baseURL = `http://localhost:5000`;
const AxiosInstance = axios.create({
  baseURL,
});
// AxiosInstance.interceptors.request.use(
//   function (config) {
//     const token = sessionStorage.getItem("token");
//     console.log(token, "token");
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers["x-access-token"] = token;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
// export default AxiosInstance;

AxiosInstance.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");
    console.log(token, "token");

    if (token) {
      config.headers = config.headers || {};
      config.headers["x-auth-token"] = token; // ✅ FIXED
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
