"use client";

import Link from "next/link";
import {logout} from "@/api/utils";
import {refreshTokenValid} from "@/api/utils";
import {redirect} from "next/navigation";
import useFetch from "@/hooks/useFetch";
import {useContext, useEffect, useState} from "react";
import Button from "@/components/Button";
import Copy from "@/components/Copy";
import Errors from "@/components/Errors";
import { LoggedInContext, LoggedInContextType } from "@/context_providers/logged-in-provider";

export default function Account() {
    if (typeof document !== "undefined" && !refreshTokenValid()) {
        redirect("/login");
    }

    const [token, setToken] = useState<string>();
    const [showToken, setShowToken] = useState<Boolean>(false);
    const [getTokenPayload, setGetTokenPayload] = useState<any>();
    const [refreshTokenPayload, setRefreshTokenPayload] = useState<any>();
    const [deleteTokenPayload, setDeleteTokenPayload] = useState<any>();
    const loggedInContext = useContext<LoggedInContextType>(LoggedInContext);
    const {result: accountResult, errors: accountErrors} = useFetch<{email: string}>("GET", "/account/users/me/");
    const {result: getTokenResult, errors: getTokenErrors, isLoading: getTokenIsLoading} = useFetch<{token: string}>("POST", "/account/token/", getTokenPayload);
    const {result: refreshTokenResult, errors: refreshTokenErrors, isLoading: refreshTokenIsLoading} = useFetch<{token: string}>("POST", "/account/token/refresh/", refreshTokenPayload);
    const {success: deleteTokenSuccess, errors: deleteTokenErrors, isLoading: deleteTokenIsLoading} = useFetch<{token: string}>("DELETE", "/account/token/", deleteTokenPayload);

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
            <Errors errors={accountErrors}/>
            <div className="flex justify-between m-6">
                <h1 className="text-lg">Logged in as: {accountResult?.email}</h1>
                <Link href="/" onClick={() => {loggedInContext?.setIsLoggedIn(false); logout()}} className="flex items-center place-content-center h-8 px-2.5 bg-white dark:bg-std-blue border rounded-sm border-std-blue dark:border-transparent hover:bg-sky-100 dark:hover:bg-std-blue-hover">Logout</Link>
            </div>
            <div className="mx-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2 p-4 overflow-auto rounded-sm border-2 border-gray-400 dark:border-gray-700">
                    <p>Upgrade</p>
                </div>
                <div className="flex flex-col space-y-2 p-4 overflow-auto rounded-sm border-2 border-gray-400 dark:border-gray-700">
                    <p>Profile Settings</p>
                </div>
                <div className="flex flex-col space-y-2 p-4 overflow-auto rounded-sm border-2 border-gray-400 dark:border-gray-700">
                    <p>API Key</p>
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
                </div>
                <div className="flex flex-col space-y-2 p-4 overflow-auto rounded-sm border-2 border-gray-400 dark:border-gray-700">
                    <p>Want to connect with other users, request a feature or report a bug?</p>
                    <a className="text-sky-500 underline" href="https://www.discord.com/">Join our discord server!</a>
                    <p>You can also get in touch with us via e-mail:</p>
                    <a className="text-sky-500 underline" href="mailto:support@urza.com">support@urza.com</a>
                </div>
            </div>
        </>
    )
}