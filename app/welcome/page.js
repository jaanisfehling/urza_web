"use client";

import {useState} from "react";
import useFetch from "@/hooks/useFetch";
import Button from "@/components/button";
import Errors from "@/components/button";

export default function Welcome() {
    const [email, setEmail] = useState();
    const {errors, isLoading} = useFetch("POST", "/users/resend_activation/", {email});

    function resendMail() {
        setEmail("");
    }

    return (
        <main className="bg-white min-h-screen">
            <h1>We have sent you an email containing a link to verify your account</h1>
            <p>Please verify your email before you can proceed</p>
            <Errors errors={errors} />
            <Button text="Resend mail" isLoading={isLoading} onClick={resendMail}/>
        </main>
    )
}
