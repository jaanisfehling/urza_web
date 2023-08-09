"use client";

import {ReactNode} from "react";
import LoggedInProvider from "./logged-in-provider";

export default function Providers({ children }: {children?: ReactNode})  {
    return (
        <LoggedInProvider>
            {children}
        </LoggedInProvider>
    )
}