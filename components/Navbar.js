"use client";

import Link from "next/link";

export default function Navbar() {
    if (localStorage.getItem("access")) {
        return (
            <div className="flex items-center mb-2 px-4 justify-between bg-white sticky h-14 w-full border-std-blue border-b-2">
                <Link href="/" className="text-2xl font-normal text-black">
                    Urza
                </Link>
                <div className="flex space-x-2">
                    <Link href="/dashboard" className="flex items-center h-8 px-2.5 m-2 rounded-sm border-2 border-std-blue hover:bg-sky-200 text-std-blue font-normal text-base">
                        Dashboard
                    </Link>
                    <Link href="/feed" className="flex items-center h-8 px-2.5 m-2 bg-std-blue rounded-sm hover:bg-std-blue-hover text-white font-normal text-base">
                        Feed
                    </Link>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="flex items-center mb-2 px-4 justify-between bg-white sticky h-14 w-full border-std-blue border-b-2">
                <Link href="/" className="text-2xl font-normal text-std-blue">
                    Urza
                </Link>
                <div className="flex space-x-2">
                    <Link href="/login" className="flex items-center h-8 px-2.5 m-2 rounded-sm border-2 border-std-blue hover:bg-sky-200 text-std-blue font-normal text-base">
                        Login
                    </Link>
                    <Link href="/signup" className="flex items-center h-8 px-2.5 m-2 bg-std-blue rounded-sm hover:bg-std-blue-hover text-white font-normal text-base">
                        Sign Up
                    </Link>
                </div>
            </div>
        )
    }
}