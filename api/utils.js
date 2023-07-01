export function login(result) {
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
}

export function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("accessExpiry");
    localStorage.removeItem("refreshExpiry");
}

export function accessTokenValid() {
    return new Date(localStorage.getItem("accessExpiry")) > new Date()
}

export function refreshTokenValid() {
    return new Date(localStorage.getItem("refreshExpiry")) > new Date()
}

export function capFirstLetterAndRemoveStop(string) {
    if (string.charAt((string.length-1)) === ".") {
        string = string.substring(0, string.length-1);
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getErrorMessages(data) {
    let messages = [];
    if (typeof data === "string" || data instanceof String) {
        if (data !== "") {
            messages.push(capFirstLetterAndRemoveStop(data));
        }
    } else if (Array.isArray(data)) {
        for (const field of data) {
            messages.push(...getErrorMessages(field));
        }
    } else if (typeof data === "object" && data !== null) {
        for (const [key, field] of Object.entries(data)) {
            messages.push(...getErrorMessages(field));
        }
    }
    return messages;
}

export const connectionError = "Cannot reach server";
export const clientError = "Error: Try a different browser";