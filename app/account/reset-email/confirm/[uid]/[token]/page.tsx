"use client";

import {connectionError, clientError, emailsDontMatch} from "@/api/utils";
import useFetch from "@/hooks/useFetch";
import {useEffect, useState} from "react";
import Errors from "@/components/Errors";
import Button from "@/components/Button";
import {useRouter} from "next/navigation";

export default function ResetEmailConfirm({params}: {params: {uid: string, token: string}}) {
    const [payload, setPayload] = useState<{uid: string, token: string, new_email: string, re_new_email: string}>();
    const {success, isLoading, errors, setErrors} = useFetch<{uid: string, token: string, new_email: string, re_new_email: string}>("POST", "/account/users/reset_email_confirm/", payload);
    const router = useRouter();

    async function handleSubmit(event: any) {
        event.preventDefault();
        if (event.target.email.value !== event.target.confirmEmail.value) {
            setErrors([emailsDontMatch]);
            return;
        }
        const newPayload = {
            uid: params.uid,
            token: params.token,
            new_email: event.target.email.value,
            re_new_email: event.target.confirmEmail.value,
        }
        setPayload(prevState => {
            if (prevState?.new_email === newPayload.new_email
                && prevState?.re_new_email === newPayload.re_new_email
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
            <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-black dark:border-gray-700" minLength={8} id="email" type="email" placeholder="New Email" required/>
            <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-black dark:border-gray-700" minLength={8} id="confirmEmail" type="email" placeholder="Confirm new Email" required/>
            <Button className="m-auto w-36" text="Change Email" isLoading={isLoading}/>
        </form>
    </div>
    )
}