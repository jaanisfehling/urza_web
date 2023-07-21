"use client";

import useFetch from "@/hooks/useFetch";
import Button from "@/components/Button";
import Errors from "@/components/Errors";
import { useState } from "react";
import ResendActivationButton from "@/components/ResendActivationButton";
import Navbar from "@/components/Navbar";

export default function Welcome() {
    const [payload, setPayload] = useState();
    const {errors, isLoading} = useFetch("POST", "/account/users/resend_activation/", payload);

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
            <Navbar/>
            <div className="m-auto p-4 w-80 space-y-5 flex flex-col">
                <Errors errors={errors}/>
                <p>We have sent you an email containing a link to verify your account</p>
                <p>Please verify your email before you can proceed</p>
                <ResendActivationButton isLoading={isLoading} setPayload={setPayload}/>
            </div>
        </div>
    )
}
