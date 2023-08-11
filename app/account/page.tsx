"use client";

import Link from "next/link";
import {logout} from "@/api/utils";
import {refreshTokenValid} from "@/api/utils";
import {redirect} from "next/navigation";
import useFetch from "@/hooks/useFetch";
import {useContext} from "react";
import Errors from "@/components/Errors";
import {LoggedInContext, LoggedInContextType} from "@/context_providers/logged-in-provider";
import APIKeyForm from "@/components/APIKeyForm";
import SendResetLinks from "@/components/SendResetLinks";

export default function Account() {
    if (typeof document !== "undefined" && !refreshTokenValid()) {
        redirect("/login");
    }

    const loggedInContext = useContext<LoggedInContextType>(LoggedInContext);
    const {result: accountResult, errors: accountErrors} = useFetch<{email: string}>("GET", "/account/users/me/");

    return (
        <>
            <Errors errors={accountErrors}/>
            <div className="flex justify-between m-6">
                <h1 className="text-lg">Logged in as: {accountResult?.email}</h1>
                <Link href="/" onClick={() => {loggedInContext?.setIsLoggedIn(false); logout(); redirect("/");}} className="flex items-center place-content-center h-8 px-2.5 bg-white dark:bg-std-blue border rounded-sm border-std-blue dark:border-transparent hover:bg-sky-100 dark:hover:bg-std-blue-hover">Logout</Link>
            </div>
            <div className="mx-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col items-center space-y-4 p-4 overflow-auto rounded-sm border-2 border-gray-400 dark:border-gray-700">
                    <p>Upgrade</p>
                </div>
                <div className="flex flex-col items-center space-y-4 p-4 overflow-auto rounded-sm border-2 border-gray-400 dark:border-gray-700">
                    <p>Profile Settings</p>
                    <SendResetLinks email={accountResult?.email}/>
                </div>
                <div className="flex flex-col items-center space-y-4 p-4 overflow-auto rounded-sm border-2 border-gray-400 dark:border-gray-700">
                    <p>API Key</p>
                    <APIKeyForm/>
                </div>
                <div className="flex flex-col items-center space-y-4 p-4 overflow-auto rounded-sm border-2 border-gray-400 dark:border-gray-700">
                    <p>Want to connect with other users, request a feature or report a bug?</p>
                    <a className="text-sky-500 underline" href="https://www.discord.com/">Join our discord server!</a>
                    <p>You can also get in touch with us via e-mail:</p>
                    <a className="text-sky-500 underline" href="mailto:support@urza.com">support@urza.com</a>
                </div>
            </div>
        </>
    )
}