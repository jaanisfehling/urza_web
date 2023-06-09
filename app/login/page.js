"use client";

import Indicator from "@/components/indicator";
import {useState} from "react";
import {clientError, connectionError} from "@/api/utils";
import {useRouter} from "next/navigation";
import {Errors} from "@/components/errors";
import useFetch from "@/hooks/useFetch";
import axios from "@/api/axios";

export default function Login() {
    const [payload, setPayload] = useState(null);
    const {success, result, isLoading, errors} = useFetch("POST", "/account/jwt/", payload);
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();
        const newPayload = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
        setPayload(prevState => {
            if (prevState?.email === newPayload.email
                && prevState?.password === newPayload.password
                && errors[0] !== connectionError
                && errors[0] !== clientError) {
                return prevState;
            } else {
                return newPayload;
            }
        });
    }
    if (success) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${result.access}`};
        localStorage.setItem("access", result.access);
        localStorage.setItem("refresh", result.refresh);
        router.push("/feed");
    }

    return (
        <main className="min-h-screen bg-white flex">
            <div className="m-auto w-80 space-y-5 flex flex-col">
                <Errors errors={errors} />
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                    <input className="h-10 border-2 p-0.5 rounded-sm" id="email" type="email" placeholder="Email" required/>
                    <input className="h-10 border-2 p-0.5 rounded-sm" id="password" type="password" placeholder="Password" required/>
                    {isLoading ? <Indicator className="p-1.5 m-auto h-10 w-20 rounded-sm bg-std-blue-hover"/> : <button className="m-auto h-10 w-20 rounded-sm bg-std-blue hover:bg-std-blue-hover text-white font-medium text-base" type="submit" value="Signup">Login</button>}
                </form>
            </div>
        </main>
    )
}
