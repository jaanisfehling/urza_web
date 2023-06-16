"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar></Navbar>
            <div className="flex justify-between m-6">
                <h1 className="text-black text-2xl font-medium">Dashboard</h1>
                <Link href="/" onClick={() => {localStorage.removeItem("access"); localStorage.removeItem("refresh")}} className="flex items-center h-8 px-2.5 bg-std-blue rounded-sm hover:bg-std-blue-hover text-white font-normal text-base">Logout</Link>
            </div>
            <div className="mx-6 grid grid-cols-2 gap-4">
                <div className="p-24 border-2 border-std-blue"></div>
                <div className="p-24 border-2 border-std-blue"></div>
                <div className="p-24 border-2 border-std-blue"></div>
                <div className="p-24 border-2 border-std-blue"></div>
            </div>
        </div>
    )
}