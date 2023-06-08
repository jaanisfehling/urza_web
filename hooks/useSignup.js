import {useEffect, useState} from "react";
import axios from "@/api/axios";
import {getErrorMessages} from "@/api/utils";

export default function useSignup(payload) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        async function registerUser() {
            try {
                setIsLoading(true);
                const response = await axios.post("/account/register/", JSON.stringify(payload), {
                        headers: {"Content-Type": "application/json"},
                    }
                )
                setData(response);
                setIsLoading(false);
                setErrors([]);
            } catch (error) {
                setIsLoading(false);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setErrors(getErrorMessages(error.response.data));
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    setErrors(["Cannot reach server"]);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setErrors(["Error: Try a different browser"]);
                }
            }
        }
        if (payload) {
            registerUser();
        }
    }, [payload]);
    return {data, isLoading, errors};
}
