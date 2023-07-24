"use client";

import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import {redirect} from "next/navigation";
import ResendActivationButton from "@/components/ResendActivationButton";

export default function Activate({params}: {params: {uid: string, token: string}}) {
    const [payload, setPayload] = useState<{uid: string, token: string}>();
    const {success, result, errors} = useFetch("POST", "/account/users/activation/", payload);

    useEffect(() => {
        setPayload(params);
    }, [params]);

    useEffect(() => {
        if (success && errors.length === 0) {
            redirect("/login");
        }
    }, [result, errors]);

    return (
        <div className="m-auto p-4 w-80 space-y-5 flex flex-col">
            <Errors errors={errors}/>
            {errors.length !== 0 && <ResendActivationButton/>}
        </div>
    )
}
