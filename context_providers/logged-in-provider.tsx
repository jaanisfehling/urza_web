"use client";
 
import {ReactNode, createContext, useState} from "react";

export type LoggedInContextType = {isLoggedIn: boolean | undefined, setIsLoggedIn: (v: boolean) => void} | null
 
export const LoggedInContext = createContext<LoggedInContextType>(null);
 
export default function LoggedInProvider({children}: {children?: ReactNode}) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>();

    return (
        <LoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </LoggedInContext.Provider>
    )
}