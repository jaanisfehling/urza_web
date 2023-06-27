import axios from "axios";
import pMemoize from "p-memoize";
import ExpiryMap from "expiry-map";
import {accessTokenValid, login, logout, refreshTokenValid} from "@/api/utils";

export const axiosPrivate = axios.create({
    baseURL: "http://localhost:8000",
    headers: {"Content-Type": "application/json"}
});

export const axiosPublic = axios.create({
    baseURL: "http://localhost:8000",
    headers: {"Content-Type": "application/json"}
});

async function newAccessToken() {
    if (!refreshTokenValid()) {
        console.log("refresh token not valid")
        logout();
        return;
    }
    try {
        const response = await axiosPublic.request({method: "POST", url: "/account/jwt/refresh/", data: {
            refresh: localStorage.getItem("refresh"),
        }});
        console.log(result)
        const result = response.data;
        if (result) {
            console.log(result)
            localStorage.setItem("access", result.access);

            const accessExpiry = new Date();
            accessExpiry.setSeconds(accessExpiry.getSeconds() + 8);
            localStorage.setItem("accessExpiry", accessExpiry.toISOString());

            return result.access;
        }
    }
    catch (error) {
        console.log("error")
        logout();
    }
}
const cache = new ExpiryMap(2000);
const memNewAccessToken = pMemoize(newAccessToken, {cache});

axiosPrivate.interceptors.request.use(async function (config) {
    console.log("intercepting request")
    let access;
    if (accessTokenValid()) {
        console.log("access token valid")
        access = localStorage.getItem("access");
    } else {
        console.log("getting new access token")
        access = await memNewAccessToken();
    }
    if (access) {
        config.headers.Authdorization = `Bearer ${access}`;
    }
    console.log(config.headers)
    return config;
});

// axiosPrivate.interceptors.response.use((response) => response, async function (error) {
//     const originalRequest  = error?.config ;
//     if (error?.response?.status === 401 && !originalRequest?.sent) {
//         originalRequest.sent = true;
//         const access = await memNewAccessToken();
//         if (access) {
//             originalRequest.headers.Authorization = `Bearer ${access}`;
//         }
//         return axiosPrivate(originalRequest);
//     }
//     return Promise.reject(error);
// });
