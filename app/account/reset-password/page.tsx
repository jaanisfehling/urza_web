"use client";

import {connectionError, clientError} from "@/api/utils";
import Button from "@/components/Button";
import Errors from "@/components/Errors";
import useFetch from "@/hooks/useFetch";
import {useSearchParams} from "next/navigation";
import {useState, useEffect} from "react";

export default function ResetPassword() {
    const queryParams = useSearchParams();
    const [inputVal, setInputVal] = useState<string>(queryParams.get("email") as string);
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const [payload, setPayload] = useState<{email: string}>();
    const {success, isLoading, errors} = useFetch("POST", "/account/users/reset_password/", payload);

    async function handleSubmit(event: any) {
        event.preventDefault();
        const newPayload = {
            email: event.target.email.value,
        }
        setPayload(prevState => {
            if (prevState?.email === newPayload.email
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
            setEmailSent(true);
        }
    }, [success]);


    return (
        <div className="m-auto p-4 w-80 space-y-5 flex flex-col">
            <Errors errors={errors} dontShowIf={isLoading}/>
            <h1 className="text-md text-center">Send a link to your email to reset your password:</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-black dark:border-gray-700" id="email" type="email" placeholder="Email" value={inputVal} onChange={(e) => setInputVal(e.target.value)} required/>
                {!emailSent 
                ? <Button className="w-36 m-auto" text="Send Mail" isLoading={isLoading}/>
                : <span className="sm:h-8 m-auto">Email was successfully sent.</span>}
            </form>
        </div>
    )
}