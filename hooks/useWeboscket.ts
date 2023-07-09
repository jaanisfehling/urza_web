import {useEffect, useState} from "react";
import * as querystring from "querystring";
import {getAccessToken} from "@/api/utils";

export default async function useWebsocket(url: string) {
    const [messages, setMessages] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        async function establishConnection() {
            const baseUrl = "ws://localhost:8000"
            const queryString = `?token=${await getAccessToken()}`;
            const ws = new WebSocket(baseUrl + url + queryString);
            ws.onmessage = (event) => {
                setMessages([event.data, ...messages]);
            };
            ws.onerror = (error) => {
                setErrors(error)
            };
        }
        if (url) {
            establishConnection();
        }
    }, [url]);
    return {messages, errors}
}