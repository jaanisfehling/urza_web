"use client";

import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import {redirect} from "next/navigation";
import ResendActivationButton from "@/components/ResendActivationButton";

export default function Actiate({params}: {params: {uid: string, token: string}}) {
    const [payload, setPayload] = useState();
    const {result, errors} = useFetch("POST", "/account/users/activation/", payload);

    const [resendPayload, setResendPayload] = useState();
    const {resendErrors, resendIsLoading} = useFetch("POST", "/account/users/resend_activation/", resendPayload);


    useEffect(() => {
        setPayload(params);
    }, [params]);

    useEffect(() => {
        if (result && errors.length === 0) {
            redirect("/login");
        }
    }, [result, errors]);

    return (
        <div className="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
            <Navbar></Navbar>
            <div className="m-auto p-4 w-80 space-y-5 flex flex-col">
                <Errors errors={errors}/>
                {errors.length !== 0 ?? <ResendActivationButton isLoading={resendIsLoading} setPayload={setResendPayload}/>}
            </div>
        </div>
    )
}
