import {useEffect, useRef, useState} from "react";
import {getAccessToken} from "@/api/utils";

export default function useWebSocket<T>(url: string | undefined) {
    const [isReady, setIsReady] = useState(false);
    const [messages, setMessages] = useState<T[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const ws = useRef<WebSocket | null>(null);
      
    useEffect(() => {
        async function establishConnection() {
            const baseUrl = "ws://localhost:8000"
            const queryString = `?bearer=${await getAccessToken()}`;
            ws.current = new WebSocket(baseUrl + url + queryString);

            ws.current.onopen = () => {
                setIsReady(true);
            };
        
            ws.current.onclose = () => {
                setIsReady(false);
            };

            ws.current.onerror = (event) => {
                console.log(event)
                setErrors(["An error occured when connecting to real-time stream"]);
            };
        
            ws.current.onmessage = (event) => {
                setMessages(prevState => [JSON.parse(event.data), ...prevState]);
            };
        
            const currentWs = ws.current;
            return () => currentWs.close();
        }
        if (url) {
            establishConnection();
        }
    }, [url]);

    return {isReady, messages, errors};
}