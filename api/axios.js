import axios from 'axios';
import mem from "mem";
import {refreshTokenValid, setTokens} from "@/api/utils";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {"Content-Type": "application/json"}
});

async function newAccessToken() {
    try {
        const response = await axiosInstance.request({method: "POST", url: "/account/jwt/refresh/", data: {
            refresh: localStorage.getItem("refresh"),
        }});
        const result = response.data;
        if (result) {
            setTokens(result);
            return result.access;
        }
    } 
    catch (error) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    }
}
const maxAge = 10;
const memNewAccessToken = mem(newAccessToken, {maxAge});

axiosInstance.interceptors.request.use(async function (config) {
    if (refreshTokenValid()) {
        const access = await memNewAccessToken();
        config.headers.Authorization = `Bearer ${access}`;
        return config;
    }
    const access = localStorage.getItem("access");
    if (access) {
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});

// axiosInstance.interceptors.response.use((response) => response, async function (error) {
//     const originalRequest  = error?.config ;
//     if (error?.response?.status === 401 && !originalRequest?.sent) {
//         originalRequest.sent = true;
//         const access = await memNewAccessToken();
//         if (access) {
//             originalRequest.headers.Authorization = `Bearer ${access}`;
//         }
//         return axiosInstance(originalRequest);
//     }
//     return Promise.reject(error);
// });
