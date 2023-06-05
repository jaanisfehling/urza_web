"use client";

import {useState} from "react";
import {baseUrl} from "@/consts";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            email: event.target.email.value,
            password: event.target.password.value,
            password_confirm: event.target.confirmPassword.value,
        };

        fetch(baseUrl + "account/register/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        }).then(function(response) {
            if (!response.ok) {
                return response.json();
            }
            setIsLoading(false);
            setData(response.json());
            setErrors([]);
            router.push("/feed");
        }).then(function(result) {
            let msgs = [];
            for (const [key, value] of Object.entries(result)) {
                msgs.push(...value);
            }
            setErrors(msgs);
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
        <main className="min-h-screen bg-white flex flex-col">
            <div className="m-auto flex-col space-y-5 items-center ">
                {errorMessage()}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                    <input className="border-2 p-0.5 rounded-sm" id="email" type="email" placeholder="Email" required/>
                    <input className="border-2 p-0.5 rounded-sm" minLength="8" id="password" type="password" placeholder="Password" required/>
                    <input className="border-2 p-0.5 rounded-sm" minLength="8" id="confirmPassword" type="password" placeholder="Confirm Password" required/>
                    <button className="h-8 rounded-sm mx-24 bg-std-blue hover:bg-std-blue-hover text-white font-medium text-base" type="submit" value="Signup">Sign Up</button>
                </form>
            </div>
        </main>
    );
}
