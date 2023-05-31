"use client"

import Signup from "@/components/signup";

export default function SignupPage() {
    return (
        <main className="flex flex-col min-h-screen bg-white">
            <div className="flex-col items-center m-auto space-y-5">
                <Signup/>
            </div>
        </main>
    )
}
