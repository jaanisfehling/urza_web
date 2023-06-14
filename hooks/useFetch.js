import {useEffect, useState} from "react";
import axios from "@/api/axios";
import {clientError, connectionError, getErrorMessages} from "@/api/utils";

export default function useFetch(method, url, payload) {
    const [success, setSuccess] = useState(false);
    const [result, setResult] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                setIsLoading(true);
                let response;
                if (method === "GET") {
                    response = await axios.request({method: method, url: url});
                } else {
                    response = await axios.request({method: method, url: url, data: payload});
                }
                setSuccess(true);
                setResult(response.data);
                setErrors([]);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (error.response) {
                    setErrors(getErrorMessages(error.response.data));
                } else if (error.request) {
                    setErrors([connectionError]);
                } else {
                    setErrors([clientError]);
                }
            }
        }
        if (payload || method === "GET") {
            fetch();
        }
    }, [payload]);
    return {success, result, isLoading, errors, setSuccess, setResult, setIsLoading, setErrors};
}
