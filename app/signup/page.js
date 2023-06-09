"use client";

import {useState} from "react";
import Indicator from "@/components/indicator";
import {clientError, connectionError} from "@/api/utils";
import {Errors} from "@/components/errors";
import axios from "@/api/axios";
import useFetch from "@/hooks/useFetch";

export default function Signup() {
    const [payload, setPayload] = useState(null);
    const [loginPayload, setLoginPayload] = useState(null);
    const {success, isLoading, errors} = useFetch("POST", "/account/register/", payload);
    const {loginSuccess, loginResult, loginIsLoading, loginErrors} = useFetch("POST", "/accounts/jwt/", loginPayload);

    async function handleSubmit(event) {
        event.preventDefault();
        const newPayload = {
            email: event.target.email.value,
            password: event.target.password.value,
            password_confirm: event.target.confirmPassword.value,
        }
        setPayload(prevState => {
            if (prevState?.email === newPayload.email
                && prevState?.password === newPayload.password
                && prevState?.password_confirm === newPayload.password_confirm
                && errors[0] !== connectionError
                && errors[0] !== clientError) {
                return prevState;
            } else {
                return newPayload;
            }
        });
    }
    if (success && !loginSuccess) {
        setLoginPayload({email: payload.email, password: payload.password});
    }
    if (loginSuccess) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${loginResult.access}`};
        localStorage.setItem("access", loginResult.access);
        localStorage.setItem("refresh", loginResult.refresh);
        router.push("/feed");
    }

    return (
        <main className="min-h-screen bg-white flex">
            <div className="m-auto w-80 space-y-5 flex flex-col">
                <Errors errors={[errors.concat(loginErrors)]} />
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                    <input className="h-10 border-2 p-0.5 rounded-sm" id="email" type="email" placeholder="Email" required/>
                    <input className="h-10 border-2 p-0.5 rounded-sm" minLength="8" id="password" type="password" placeholder="Password" required/>
                    <input className="h-10 border-2 p-0.5 rounded-sm" minLength="8" id="confirmPassword" type="password" placeholder="Confirm Password" required/>
                    {isLoading || loginIsLoading ? <Indicator className="p-1.5 m-auto h-10 w-20 rounded-sm bg-std-blue-hover"/> : <button className="m-auto h-10 w-20 rounded-sm bg-std-blue hover:bg-std-blue-hover text-white font-medium text-base" type="submit" value="Signup">Sign Up</button>}
                </form>
            </div>
        </main>
    );
}
