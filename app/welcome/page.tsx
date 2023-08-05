"use client";

import ResendActivationButton from "@/components/ResendActivationButton";

export default function Welcome() {
    return (
        <div className="flex flex-col w-80 space-y-5 m-auto p-4">
            <p>We have sent you an email containing a link to verify your account</p>
            <p>Please verify your email before you can proceed</p>
            <ResendActivationButton/>
        </div>
    )
}
