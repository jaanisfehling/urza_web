import {useEffect, useState} from "react";
import axios from "@/api/axios";

export default function useSignup(payload) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const registerUser = async () => {
            const response = await axios.post("/account/register/", JSON.stringify(payload), {
                    headers: {"Content-Type": "application/json"},
                }
            ).catch(err => {
                console.error(err);
            });
            if (response && response.status >= 200 && response.status <= 299) {
                setIsLoading(false);
                setData(await response.json());
                setErrors([]);
            } else {
                let msgs = [];
                for (const [key, value] of Object.entries(await response.json())) {
                    msgs.push(...value);
                }
                setErrors(msgs);
            }
        }
        registerUser();
    }, [payload]);
    return {data, isLoading, errors};
}