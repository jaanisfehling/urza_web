export function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getErrorMessages(data) {
    let messages = [];
    if (typeof data === "string" || data instanceof String) {
        if (data !== "") {
            messages.push(capFirstLetter(data));
        }
    } else if (Array.isArray(data) && data.length !== 0) {
        for (const field of data) {
            messages.push(getErrorMessages(field));
        }
    } else if (typeof data === "object" && data !== null) {
        for (const [key, field] of Object.entries(data)) {
            messages.push(getErrorMessages(field));
        }
    }
    return messages;
}
