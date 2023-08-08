"use client";

import Link from "next/link";
import {logout} from "@/api/utils";
import {refreshTokenValid} from "@/api/utils";
import {redirect} from "next/navigation";
import useFetch from "@/hooks/useFetch";
import {useState} from "react";
import Button from "@/components/Button";
import Copy from "@/components/Copy";

export default function Account() {
    if (typeof document !== "undefined" && !refreshTokenValid()) {
        redirect("/login");
    }
    const {result: accountResult, errors: accountErrors} = useFetch<{email: string}>("GET", "/account/users/me/");
    const {result: tokenResult, errors: tokenErrors, isLoading: tokenIsLoading} = useFetch<{token: string}>("GET", "/account/token/");
    const [showToken, setShowToken] = useState<Boolean>(false);

    let tokenButtonText;
    if (tokenErrors) {
        tokenButtonText = "Generate API Key";
    } else {
        tokenButtonText = "Show API Key";
    }

    return (
        <>
            <div className="flex justify-between m-6">
                <h1 className="text-lg">Logged in as {accountResult?.email}</h1>
                <Link href="/" onClick={logout} className="flex items-center h-8 px-2.5 bg-std-blue rounded-sm hover:bg-std-blue-hover text-white font-normal text-base">Logout</Link>
            </div>
            <div className="mx-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2 p-4 rounded-sm border-2 border-gray-400 dark:border-gray-700">
                    <p>Upgrade</p>
                </div>
                <div className="flex flex-col space-y-2 p-4 rounded-sm border-2 border-gray-400 dark:border-gray-700">
                    <p>Profile Settings</p>
                </div>
                <div className="flex flex-col space-y-2 p-4 rounded-sm border-2 border-gray-400 dark:border-gray-700">
                    <p>API Key</p>
                    {showToken 
                    ? <div className="">
                        <div className="relative p-1.5 h-10 w-72 border rounded-sm bg-sky-200 dark:bg-gray-950 shadow-inner overflow-scroll">
                            <span>{tokenResult?.token}</span>
                            <Copy className="absolute right-0 z-10" value={tokenResult?.token}/>
                        </div>
                    </div>
                    : <Button className="p-1.5 h-10 w-48" text={tokenButtonText} isLoading={tokenIsLoading} onClick={() => setShowToken(true)}/>}
                </div>
                <div className="flex flex-col space-y-2 p-4 rounded-sm border-2 border-gray-400 dark:border-gray-700">
                    <p>Want to connect with other users, request a feature or report a bug?</p>
                    <a className="text-sky-500 underline" href="https://www.discord.com/">Join our discord server!</a>
                    <p>You can also get in touch with us via e-mail:</p>
                    <a className="text-sky-500 underline" href="mailto:support@urza.com">support@urza.com</a>
                </div>
            </div>
        </>
    )
}