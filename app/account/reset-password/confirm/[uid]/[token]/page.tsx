"use client";

import {connectionError, clientError, passwordsDontMatch} from "@/api/utils";
import useFetch from "@/hooks/useFetch";
import {useEffect, useState} from "react";
import Errors from "@/components/Errors";
import Button from "@/components/Button";
import {useRouter} from "next/navigation";

export default function ResetPasswordConfirm({params}: {params: {uid: string, token: string}}) {
    const [payload, setPayload] = useState<{uid: string, token: string, new_password: string, re_new_password: string}>();
    const {success, isLoading, errors, setErrors} = useFetch<{uid: string, token: string, new_password: string, re_new_password: string}>("POST", "/account/users/reset_password_confirm/", payload);
    const router = useRouter();

    async function handleSubmit(event: any) {
        event.preventDefault();
        if (event.target.password.value !== event.target.confirmPassword.value) {
            setErrors([passwordsDontMatch]);
            return;
        }
        const newPayload = {
            uid: params.uid,
            token: params.token,
            new_password: event.target.password.value,
            re_new_password: event.target.confirmPassword.value,
        }
        setPayload(prevState => {
            if (prevState?.new_password === newPayload.new_password
                && prevState?.re_new_password === newPayload.re_new_password
                && errors[0] !== connectionError
                && errors[0] !== clientError) {
                return prevState;
            } else {
                return newPayload;
            }
        });
    }

    useEffect(() => {
        if (success) {
            router.push("/login");
        }
    }, [success]);

    return (
        <div className="m-auto p-4 w-80 space-y-5 flex flex-col">
        <Errors errors={errors} dontShowIf={isLoading}/>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-gray-900 dark:border-gray-700" minLength={8} id="password" type="password" placeholder="New Password" required/>
            <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-gray-900 dark:border-gray-700" minLength={8} id="confirmPassword" type="password" placeholder="Confirm new Password" required/>
            <Button className="m-auto w-40" text="Change Password" isLoading={isLoading}/>
        </form>
    </div>
    )
}