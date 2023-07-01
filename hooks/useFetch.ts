import {useEffect, useState} from "react";
import {axiosPrivate, axiosPublic} from "@/api/axios";
import {clientError, connectionError, getErrorMessages} from "@/api/utils";

export default function useFetch(method: string, url: string, payload?: object) {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        async function performFetch() {
            try {
                setIsLoading(true);

                let actualAxios;
                if (url.endsWith("jwt/") || url.endsWith("users/")) {
                    actualAxios = axiosPublic;
                } else {
                    actualAxios = axiosPrivate;
                }

                let response;
                if (method === "GET") {
                    response = await actualAxios.request({method: method, url: url});
                } else {
                    response = await actualAxios.request({method: method, url: url, data: payload});
                }

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
            performFetch();
        }
    }, [method, url, payload]);
    return {result, isLoading, errors, setResult, setIsLoading, setErrors};
}
