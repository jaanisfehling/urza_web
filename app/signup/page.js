"use client";

import {useState} from "react";
import Errors from "@/components/Errors";
import useFetch from "@/hooks/useFetch";
import {useRouter} from "next/navigation";
import Button from "@/components/Button";

export default function Signup() {
    const [payload, setPayload] = useState(null);
    const {success, result, isLoading, errors, setErrors} = useFetch("POST", "/account/users/", payload);
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();
        if (event.target.password.value != event.target.confirmPassword.value) {
            setErrors(["The two password fields didn't match"]);
            return;
        }
        const newPayload = {
            email: event.target.email.value,
            password: event.target.password.value,
            re_password: event.target.confirmPassword.value,
        }
        setPayload(prevState => {
            if (prevState?.email === newPayload.email
                && prevState?.password === newPayload.password
                && prevState?.re_password === newPayload.re_password
                && errors[0] !== connectionError
                && errors[0] !== clientError) {
                return prevState;
            } else {
                return newPayload;
            }
        });
    }
    if (success) {
        sessionStorage.setItem("email", result.email)
        router.push("/welcome");
    }

    return (
        <div className="min-h-screen bg-white flex">
            <div className="m-auto p-4 w-80 space-y-5 flex flex-col">
                <Errors errors={errors}/>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                    <input className="h-10 border-2 p-0.5 rounded-sm" id="email" type="email" placeholder="Email" required/>
                    <input className="h-10 border-2 p-0.5 rounded-sm" minLength="8" id="password" type="password" placeholder="Password" required/>
                    <input className="h-10 border-2 p-0.5 rounded-sm" minLength="8" id="confirmPassword" type="password" placeholder="Confirm Password" required/>
                    <Button className="p-1.5 m-auto h-10 w-24" text="Sign Up" isLoading={isLoading}/>
                </form>
            </div>
        </div>
    );
}
