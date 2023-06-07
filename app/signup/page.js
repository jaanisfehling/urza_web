"use client";

import { useRouter } from "next/navigation";
import useSignup from "@/hooks/useSignup";
import {useState} from "react";
import Indicator from "@/components/indicator";

export default function Signup() {
    const router = useRouter();
    const [payload, setPayload] = useState(null);
    const {data, isLoading, errors} = useSignup(payload);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPayload = {
            email: event.target.email.value,
            password: event.target.password.value,
            password_confirm: event.target.confirmPassword.value,
        }
        setPayload(prevState => {
            if (prevState?.email === newPayload.email
                && prevState?.password === newPayload.password
                && prevState?.password_confirm === newPayload.password_confirm) {
                return prevState;
            } else {
                return newPayload;
            }
        });
    };

    function errorMessage() {
        return (
            <div className="bg-red-300 rounded p-2 flex flex-col space-y-2" style={{display: errors.length === 0 ? "none" : ""}}>
                {errors.map(function(msg, i) {
                    return <p key={i}>{msg}</p>;
                })}
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white flex">
            <div className="m-auto space-y-5 flex flex-col">
                {errorMessage()}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                    <input className="h-10 border-2 p-0.5 rounded-sm" id="email" type="email" placeholder="Email" required/>
                    <input className="h-10 border-2 p-0.5 rounded-sm" minLength="8" id="password" type="password" placeholder="Password" required/>
                    <input className="h-10 border-2 p-0.5 rounded-sm" minLength="8" id="confirmPassword" type="password" placeholder="Confirm Password" required/>
                    {isLoading ? <Indicator className="p-1.5 m-auto h-10 w-20 rounded-sm bg-std-blue-hover"/> : <button className="m-auto h-10 w-20 rounded-sm bg-std-blue hover:bg-std-blue-hover text-white font-medium text-base" type="submit" value="Signup">Sign Up</button>}
                </form>
            </div>
        </main>
    );
}
