import Button from "@/components/Button";
import Errors from "@/components/Errors";
import useFetch from "@/hooks/useFetch";
import {useEffect, useState} from "react";

export default function SendResetLinks({email}: {email: string | undefined}) {
    const [resetPwdSent, setResetPwdSent] = useState<boolean>(false);
    const [resetEmailSent, setResetEmailSent] = useState<boolean>(false);
    const [resetPwdPayload, setResetPwdPayload] = useState<any>();
    const [resetEmailPayload, setResetEmailPayload] = useState<any>();
    const {success: resetPwdSuccess, isLoading: resetPwdIsLoading, errors: resetPwdErrors} = useFetch("POST", "/account/users/reset_password/", resetPwdPayload);
    const {success: resetEmailSuccess, isLoading: resetEmailIsLoading, errors: resetEmailErrors} = useFetch("POST", "/account/users/reset_email/", resetEmailPayload);

    useEffect(() => {
        if (resetPwdSuccess) {
            setResetPwdSent(true);
        }
    }, [resetPwdSuccess]);

    useEffect(() => {
        if (resetEmailSuccess) {
            setResetEmailSent(true);
        }
    }, [resetEmailSuccess]);

    return (
        <>
            <Errors errors={[...resetPwdErrors, ...resetEmailErrors]}/>
            {!resetPwdSent 
            ? <Button className="w-36 h-10" text="Reset Password" isLoading={resetPwdIsLoading} onClick={() => email && setResetPwdPayload({email})}/>
            : <p>Email with a link to reset your password was successfully sent.</p>}
            {!resetEmailSent 
            ? <Button className="w-36 h-10" text="Reset Email" isLoading={resetEmailIsLoading} onClick={() => email && setResetEmailPayload({email})}/>
            : <p>Email with a link to reset your email was successfully sent.</p>}
        </>
    )
}