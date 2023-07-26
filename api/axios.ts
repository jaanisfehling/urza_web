import axios from "axios";
import {getAccessToken, newAccessToken} from "@/api/utils";

export const axiosPrivate = axios.create({
    baseURL: "http://localhost:8000",
    headers: {"Content-Type": "application/json"}
});

export const axiosPublic = axios.create({
    baseURL: "http://localhost:8000",
    headers: {"Content-Type": "application/json"}
});

axiosPrivate.interceptors.request.use(async function (config) {
    const access = await getAccessToken();
    if (access) {
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});

// This should not be needed under normal circumstances
axiosPrivate.interceptors.response.use((response) => response, async function (error) {
    const originalRequest  = error?.config ;
    if (error?.response?.status === 401 && !originalRequest?.sent) {
        originalRequest.sent = true;
        const access = await newAccessToken();
        if (access) {
            originalRequest.headers.Authorization = `Bearer ${access}`;
        }
        return axiosPrivate(originalRequest);
    }
    return Promise.reject(error);
});
