"use client";

import {useContext, useEffect, useState} from "react";
import {clientError, connectionError, login} from "@/api/utils";
import {useRouter} from "next/navigation";
import Errors from "@/components/Errors";
import useFetch from "@/hooks/useFetch";
import Button from "@/components/Button";
import { LoggedInContextType, LoggedInContext } from "@/context_providers/logged-in-provider";
import Link from "next/link";

export default function Login() {
    const [payload, setPayload] = useState<{email: string, password: string}>();
    const {result, isLoading, errors} = useFetch<{access: string, refresh: string}>("POST", "/account/jwt/", payload);
    const loggedInContext = useContext<LoggedInContextType>(LoggedInContext);
    const router = useRouter();

    async function handleSubmit(event: any) {
        event.preventDefault();
        const newPayload = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
        setPayload(prevState => {
            if (prevState?.email === newPayload.email
                && prevState?.password === newPayload.password
                && errors[0] !== connectionError
                && errors[0] !== clientError) {
                return prevState;
            } else {
                return newPayload;
            }
        });
    }

    useEffect(() => {
        if (result) {
            loggedInContext?.setIsLoggedIn(true);
            login(result);
            router.push("/feed");
        }
    }, [result]);

    return (
        <div className="m-auto p-4 w-80 space-y-5 flex flex-col">
            <Errors errors={errors} dontShowIf={isLoading}/>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-gray-900 dark:border-gray-700" id="email" type="email" placeholder="Email" required/>
                <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-gray-900 dark:border-gray-700" id="password" type="password" placeholder="Password" required/>
                {errors.length != 0 && errors[0] !== connectionError && errors[0] !== clientError && <Link href={{pathname: "/account/reset-password/", query:{email: payload?.email}}} className="text-sky-500 m-auto">Forgot Password?</Link>}
                <Button className="m-auto w-24" text="Login" isLoading={isLoading}/>
            </form>
        </div>
    )
}
