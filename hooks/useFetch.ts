import {useEffect, useState} from "react";
import {axiosPrivate, axiosPublic} from "@/api/axios";
import {clientError, connectionError, badRequestError, getErrorMessages} from "@/api/utils";
import { AxiosError } from 'axios';

export default function useFetch<T>(method: string, url: string, payload?: object) {
    const [success, setSuccess] = useState(false);
    const [result, setResult] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

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
                setSuccess(true);
            } catch (e: unknown) {
                const error = e as AxiosError;
                setIsLoading(false);
                if (error.response) {
                    if (error.response.data) {
                        setErrors(getErrorMessages(error.response.data));
                    } else {
                        setErrors([badRequestError]);
                    }
                } else if (error.request) {
                    setErrors([connectionError]);
                } else {
                    setErrors([clientError]);
                }
                setSuccess(false);
            }
        }
        if (payload || method === "GET") {
            performFetch();
        }
    }, [method, url, payload]);
    
    return {success, result, isLoading, errors, setIsLoading, setErrors};
}
