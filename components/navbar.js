"use client";

import Link from "next/link";

export default function Navbar() {
    if (localStorage.getItem("access")) {
        return (
            <div className="flex px-4 justify-between bg-white sticky h-14 w-full items-center border-std-blue border-b-2">
                <Link href="/feed" className="text-2xl text-std-blue">
                    Urza
                </Link>
                <div className="flex space-x-2">
                    <Link href="/dashboard" className="flex rounded-sm h-8 px-2.5 m-2 border-2 border-std-blue hover:bg-sky-200 items-center text-black font-normal text-base" type="button">
                        Dashboard
                    </Link>
                    <Link href="/feed" className="flex rounded-sm h-8 px-2.5 m-2 bg-std-blue hover:bg-std-blue-hover items-center text-white font-normal text-base" type="button">
                        Feed
                    </Link>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="flex px-4 justify-between bg-white sticky h-14 w-full items-center border-std-blue border-b-2">
                <Link href="/" className="text-2xl text-std-blue">
                    Urza
                </Link>
                <div className="flex space-x-2">
                    <Link href="/login" className="flex rounded-sm h-8 px-2.5 m-2 border-2 border-std-blue hover:bg-sky-200 items-center text-black font-normal text-base" type="button">
                        Login
                    </Link>
                    <Link href="/signup" className="flex rounded-sm h-8 px-2.5 m-2 bg-std-blue hover:bg-std-blue-hover items-center text-white font-normal text-base" type="button">
                        Sign Up
                    </Link>
                </div>
            </div>
        )
    }
}