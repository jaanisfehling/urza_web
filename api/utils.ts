import {axiosPublic} from "@/api/axios";

export function login(result: {access: string, refresh: string}) {
    localStorage.setItem("access", result.access);
    localStorage.setItem("refresh", result.refresh);

    const accessExpiry = new Date();
    accessExpiry.setMinutes(accessExpiry.getMinutes() + 5);
    accessExpiry.setSeconds(accessExpiry.getSeconds() - 10);
    localStorage.setItem("accessExpiry", accessExpiry.toISOString());

    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 1);
    refreshExpiry.setSeconds(refreshExpiry.getSeconds() - 10);
    localStorage.setItem("refreshExpiry", refreshExpiry.toISOString());

    sessionStorage.removeItem("email");
}

export function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("accessExpiry");
    localStorage.removeItem("refreshExpiry");
}

export function accessTokenValid() {
    return new Date(localStorage.getItem("accessExpiry")||0) > new Date();
}

export function refreshTokenValid() {
    return new Date(localStorage.getItem("refreshExpiry")||0) > new Date();
}

export async function newAccessToken() {
    if (typeof document !== "undefined" && !refreshTokenValid()) {
        logout();
        return;
    }
    try {
        const response = await axiosPublic.request({method: "POST", url: "/account/jwt/refresh/", data: {
                refresh: localStorage.getItem("refresh"),
            }});
        const result = response.data;
        if (result) {
            localStorage.setItem("access", result.access);

            const accessExpiry = new Date();
            accessExpiry.setMinutes(accessExpiry.getMinutes() + 5);
            accessExpiry.setSeconds(accessExpiry.getSeconds() - 10);
            localStorage.setItem("accessExpiry", accessExpiry.toISOString());

            return result.access;
        }
    }
    catch (error) {
        logout();
    }
}

export async function getAccessToken() {
    if (accessTokenValid()) {
        return localStorage.getItem("access");
    } else {
        return await newAccessToken();
    }
}

export function capFirstLetterAndRemoveStop(sentence: string) {
    if (sentence.charAt((sentence.length-1)) === ".") {
        sentence = sentence.substring(0, sentence.length-1);
    }
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export function getErrorMessages(data: any): string[] {
    let messages = [];
    if (typeof data === "string" || data instanceof String) {
        if (data !== "") {
            messages.push(capFirstLetterAndRemoveStop(data as string));
        }
    } else if (Array.isArray(data)) {
        for (const field of data) {
            messages.push(...getErrorMessages(field));
        }
    } else if (typeof data === "object" && data !== null) {
        for (const [key, field] of Object.entries(data)) {
            if (key == "detail") {
                messages.push(`${getErrorMessages(field)}`);
            } else {
                messages.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${getErrorMessages(field)}`);
            }
        }
    }
    return messages;
}

export const passwordsDontMatch = "Passwords do not match";
export const emailsDontMatch = "Emails do not match";
export const connectionError = "Cannot reach server";
export const clientError = "Error: Try a different browser";
export const badRequestError = "Error: Cannot make that request";