import Button from "@/components/Button";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import Errors from "./Errors";

export default function ResendActivationButton({className}: {className?: string}) {
    const [payload, setPayload] = useState<{email: string | null | undefined}>();
    const {errors, isLoading} = useFetch("POST", "/account/users/resend_activation/", payload);

    return (
        <div className={`flex flex-col space-y-5 ${className}`}>
            <Errors errors={errors}/>
            <Button className="m-auto" text="Resend" isLoading={isLoading} onClick={() => {setPayload({email: localStorage.getItem("email")})}}/>
        </div>
    )
}
