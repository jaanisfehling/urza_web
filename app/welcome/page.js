"use client";

import useFetch from "@/hooks/useFetch";
import Button from "@/components/button";
import Errors from "@/components/errors";

export default function Welcome() {
    const {errors, isLoading} = useFetch("POST", "/account/users/resend_activation/", {email: sessionStorage.getItem("email")});

    return (
        <div className="bg-white min-h-screen flex">
            <div className="m-auto w-80 space-y-5 flex flex-col">
                <p>We have sent you an email containing a link to verify your account</p>
                <p>Please verify your email before you can proceed</p>
                <Errors errors={errors} />
                <Button text="Resend mail" isLoading={isLoading} onClick={() => {}}/>
            </div>
        </div>
    )
}
