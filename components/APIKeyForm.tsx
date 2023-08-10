import Errors from "@/components/Errors";
import Button from "@/components/Button";
import Copy from "@/components/Copy";
import useFetch from "@/hooks/useFetch";
import {useState, useEffect} from "react";

export default function APIKeyForm() {
    const [token, setToken] = useState<string>();
    const [showToken, setShowToken] = useState<Boolean>(false);
    const [getTokenPayload, setGetTokenPayload] = useState<any>();
    const [refreshTokenPayload, setRefreshTokenPayload] = useState<any>();
    const [deleteTokenPayload, setDeleteTokenPayload] = useState<any>();
    const {result: getTokenResult, errors: getTokenErrors, isLoading: getTokenIsLoading} = useFetch<{token: string}>("POST", "/account/token/", getTokenPayload);
    const {result: refreshTokenResult, errors: refreshTokenErrors, isLoading: refreshTokenIsLoading} = useFetch<{token: string}>("POST", "/account/token/refresh/", refreshTokenPayload);
    const {success: deleteTokenSuccess, errors: deleteTokenErrors, isLoading: deleteTokenIsLoading} = useFetch<{token: null}>("DELETE", "/account/token/", deleteTokenPayload);
    
    useEffect(() => {
        if (getTokenResult?.token) {
            setToken(getTokenResult?.token);
            setShowToken(true);
        }
    }, [getTokenResult]);

    useEffect(() => {
        if (refreshTokenResult?.token) {
            setToken(refreshTokenResult?.token);
        }
    }, [refreshTokenResult]);

    useEffect(() => {
        if (deleteTokenSuccess) {
            setShowToken(false);
        }
    }, [deleteTokenSuccess]);

    return (
        <>
            <Errors errors={[...getTokenErrors, ...refreshTokenErrors, ...deleteTokenErrors]}/>
            {showToken 
            ? <div className="relative h-10 w-80">
                <div className="p-1.5 h-10 border rounded-sm bg-gray-200 dark:bg-gray-950 shadow-inner overflow-x-scroll">
                    <span>{token}</span>
                </div>
                <Copy className="absolute right-0.5 top-1 bottom-1 bottom-0 z-10" value={getTokenResult?.token}/>
                <div className="flex justify-around mt-2">
                    <Button className="h-8 w-28 text-sm" text="Refresh Token" isLoading={refreshTokenIsLoading} onClick={() => setRefreshTokenPayload({})}/>
                    <Button className="h-8 w-28 text-sm text-red-800 border-red-800" text="Delete Token" isLoading={deleteTokenIsLoading} onClick={() => setDeleteTokenPayload({})}/>
                </div>
            </div>
            : <Button className="w-28 h-10" text="Get API Key" isLoading={getTokenIsLoading} onClick={() => setGetTokenPayload({})}/>}
        </>
    )
}
