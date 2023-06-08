import {useEffect, useState} from "react";
import axios from "@/api/axios";
import {clientError, connectionError, getErrorMessages} from "@/api/utils";
import {useRouter} from "next/navigation";

export default function useLogin(payload) {
    const [tokens, setTokens] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function login() {
            try {
                setIsLoading(true);
                const response = await axios.post("/account/jwt/", JSON.stringify(payload), {
                        headers: {"Content-Type": "application/json"},
                    }
                )
                setTokens({access: response?.data?.access, refresh: response?.data?.refresh});
                router.push("/feed");
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
                    setErrors([connectionError]);
                } else {
                    console.log(error)
                    // Something happened in setting up the request that triggered an Error
                    setErrors([clientError]);
                }
            }
        }
        if (payload) {
            login();
        }
    }, [payload]);
    return {isLoading, errors};
}
