"use client";

import {useEffect, useState} from "react";
import Errors from "@/components/Errors";
import useFetch from "@/hooks/useFetch";
import {useRouter} from "next/navigation";
import Button from "@/components/Button";
import {clientError, connectionError, passwordsDontMatch} from "@/api/utils";

export default function Signup() {
    const [payload, setPayload] = useState<{email: string, password: string, re_password: string}>();
    const {result, isLoading, errors, setErrors} = useFetch<{email: string, password: string, re_password: string}>("POST", "/account/users/", payload);
    const router = useRouter();

    async function handleSubmit(event: any) {
        event.preventDefault();
        if (event.target.password.value !== event.target.confirmPassword.value) {
            setErrors([passwordsDontMatch]);
            return;
        }
        const newPayload = {
            email: event.target.email.value,
            password: event.target.password.value,
            re_password: event.target.confirmPassword.value,
        }
        setPayload(prevState => {
            if (prevState?.email === newPayload.email
                && prevState?.password === newPayload.password
                && prevState?.re_password === newPayload.re_password
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
            router.push("/welcome");
        }
    }, [result]);

    return (
        <div className="m-auto p-4 w-80 space-y-5 flex flex-col">
            <Errors errors={errors} dontShowIf={isLoading}/>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-black dark:border-gray-700" id="email" type="email" placeholder="Email" required/>
                <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-black dark:border-gray-700" minLength={8} id="password" type="password" placeholder="Password" required/>
                <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-black dark:border-gray-700" minLength={8} id="confirmPassword" type="password" placeholder="Confirm Password" required/>
                <Button className="m-auto w-24" text="Sign Up" isLoading={isLoading}/>
            </form>
        </div>
    );
}
