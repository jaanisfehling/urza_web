import Errors from "@/components/Errors";
import Button from "@/components/Button";
import Copy from "@/components/Copy";
import useFetch from "@/hooks/useFetch";
import {useState, useEffect} from "react";
import RefreshButton from "./RefreshButton";
import DeleteButton from "./DeleteButton";

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
            ? <div className="flex h-10">
                <div className="w-72 p-1.5 border rounded-sm bg-gray-200 dark:bg-gray-950 shadow-inner overflow-x-scroll">
                    <span>{token}</span>
                </div>
                <div className="flex ml-1 space-x-1 my-auto">
                    <Copy value={getTokenResult?.token}/>
                    <RefreshButton onClick={() => setRefreshTokenPayload({})}/>
                    <DeleteButton onClick={() => setDeleteTokenPayload({})}/>
                </div>
            </div>
            : <Button className="w-32" text="Get API Key" isLoading={getTokenIsLoading} onClick={() => setGetTokenPayload({})}/>}
        </>
    )
}
