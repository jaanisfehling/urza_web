"use client";

import useFetch from "@/hooks/useFetch";
import Button from "@/components/button";
import Errors from "@/components/errors";
import { useState } from "react";

export default function Welcome() {
    const [payload, setPayload] = useState();
    const {errors, isLoading} = useFetch("POST", "/account/users/resend_activation/", payload);

    return (
        <div className="bg-white min-h-screen flex">
            <div className="m-auto w-80 space-y-5 flex flex-col">
                <Errors errors={errors} />
                <p>We have sent you an email containing a link to verify your account</p>
                <p>Please verify your email before you can proceed</p>
                <Button text="Resend mail" isLoading={isLoading} onClick={() => {setPayload({email: sessionStorage.getItem("email")})}}/>
            </div>
        </div>
    )
}
