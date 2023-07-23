"use client";

import ResendActivationButton from "@/components/ResendActivationButton";

export default function Welcome() {
    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen flex">
            <div className="m-auto p-4 w-80 space-y-5 flex flex-col">
                <p>We have sent you an email containing a link to verify your account</p>
                <p>Please verify your email before you can proceed</p>
                <ResendActivationButton/>
            </div>
        </div>
    )
}
