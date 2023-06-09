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
