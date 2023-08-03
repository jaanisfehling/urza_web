import {useEffect, useRef, useState} from "react";
import {getAccessToken} from "@/api/utils";

export default function useWebSocket<T>(url: string | undefined) {
    const [isReady, setIsReady] = useState(false);
    const [messages, setMessages] = useState<T[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const ws = useRef(null);
      
    useEffect(() => {
        async function establishConnection() {
            const baseUrl = "ws://localhost:8000"
            const queryString = `?bearer=${await getAccessToken()}`;
            const socket = new WebSocket(baseUrl + url + queryString);

            socket.onopen = () => {
                setIsReady(true);
            };
        
            socket.onclose = () => {
                setIsReady(false);
            };

            socket.onerror = (event) => {
                console.log(event)
                setErrors(["An error occured when connecting to real-time stream."]);
            };
        
            socket.onmessage = (event) => {
                setMessages(prevState => [JSON.parse(event.data), ...prevState]);
            };
        
            ws.current = socket;
            return () => socket.close();
        }
        if (url) {
            establishConnection();
        }
    }, [url]);

    return {isReady, messages, errors};
}