import axios from "axios";
import pMemoize from "p-memoize";
import ExpiryMap from "expiry-map";
import {accessTokenValid, login, logout, refreshTokenValid} from "@/api/utils";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {"Content-Type": "application/json"}
});

async function newAccessToken() {
    if (!refreshTokenValid) {
        logout();
        return;
    }
    try {
        const response = await axiosInstance.request({method: "POST", url: "/account/jwt/refresh/", data: {
            refresh: localStorage.getItem("refresh"),
        }});
        const result = response.data;
        if (result) {
            localStorage.setItem("access", result.access);

            const accessExpiry = new Date();
            accessExpiry.setSeconds(accessExpiry.getSeconds() + 5);
            localStorage.setItem("accessExpiry", accessExpiry.toISOString());

            return result.access;
        }
    } 
    catch (error) {
        logout();
    }
}
const cache = new ExpiryMap(2000);
const memNewAccessToken = pMemoize(newAccessToken, {cache});

axiosInstance.interceptors.request.use(async function (config) {
    let access;
    if (accessTokenValid) {
        access = localStorage.getItem("access");
    } else {
        access = await memNewAccessToken();
    }
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
