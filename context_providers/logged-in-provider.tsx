"use client";
 
import { refreshTokenValid } from "@/api/utils";
import {ReactNode, createContext, useState} from "react";

export type LoggedInContextType = {isLoggedIn: Boolean, setIsLoggedIn: (v: boolean) => void} | null
 
export const LoggedInContext = createContext<LoggedInContextType>(null);
 
export default function LoggedInProvider({children}: {children?: ReactNode}) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(refreshTokenValid());

    return (
        <LoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </LoggedInContext.Provider>
    )
}