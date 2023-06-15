import axios from 'axios';
import mem from "mem";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {"Content-Type": "application/json"}
});

async function newAccessToken() {
    try {
        const response = await axiosPublic.post("/account/jwt/refresh/", {
            refresh: localStorage.getItem("refresh"),
        });
        const result = response.data;
        if (result) {
            localStorage.setItem("access", result.access);
            return result.access;
        }
    } 
    catch (error) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    }
};
const maxAge = 250;
const memNewAccessToken = mem(newAccessToken, {maxAge});

axiosInstance.interceptors.request.use(function (config) {
    const access = localStorage.getItem("access");
    if (access) {
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});

axios.interceptors.response.use((response) => response, async function (error) {
      const config = error?.config;
      if (error?.response?.status === 401 && !config?.sent) {
        config.sent = true;
        const access = await memNewAccessToken();
        if (access) {
            config.headers.Authorization = `Bearer ${access}`;
        }
        return axios(config);
      }
      return Promise.reject(error);
    }
);
