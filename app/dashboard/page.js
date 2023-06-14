"use client";

import Navbar from "@/components/navbar";
import Button from "@/components/button";
import useFetch from "@/hooks/useFetch";

export default function Dashboard() {
    const {result, isLoading, errors} = useFetch("POST", "");

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar></Navbar>
            <div className="m-6 grid grid-cols-2 gap-4">
                <h1>Welcome!</h1>
                <Button text="Logout" isLoading={isLoading}/>
            </div>
            <div className="m-6 grid grid-cols-2 gap-4">
                <div className="p-24 border-2 border-std-blue"></div>
                <div className="p-24 border-2 border-std-blue"></div>
                <div className="p-24 border-2 border-std-blue"></div>
                <div className="p-24 border-2 border-std-blue"></div>
            </div>
        </div>
    )
}