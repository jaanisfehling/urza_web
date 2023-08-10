import {connectionError, clientError} from "@/api/utils";
import useFetch from "@/hooks/useFetch";
import {useState} from "react";
import Errors from "@/components/Errors";
import Button from "@/components/Button";

export default function ResetPassword({params}: {params: {uid: string, token: string}}) {
    const [payload, setPayload] = useState<{email: string, password: string, re_password: string}>();
    const {isLoading, errors, setErrors} = useFetch<{email: string, password: string, re_password: string}>("POST", "/account/users/", payload);

    async function handleSubmit(event: any) {
        event.preventDefault();
        if (event.target.password.value !== event.target.confirmPassword.value) {
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

    return (
        <div className="m-auto p-4 w-80 space-y-5 flex flex-col">
        <Errors errors={errors}/>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-gray-900 dark:border-gray-700" id="oldPassword" type="password" placeholder="Email" required/>
            <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-gray-900 dark:border-gray-700" minLength={8} id="newPassword" type="password" placeholder="Password" required/>
            <input className="h-10 border-2 p-0.5 rounded-sm dark:bg-gray-900 dark:border-gray-700" minLength={8} id="confirmPassword" type="password" placeholder="Confirm Password" required/>
            <Button className="m-auto w-24" text="Sign Up" isLoading={isLoading}/>
        </form>
    </div>
    )
}