"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import {logout} from "@/api/utils";
import { refreshTokenValid } from "@/api/utils";
import { redirect } from "next/navigation";

export default function Dashboard() {
    if (typeof document !== "undefined" && !refreshTokenValid()) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
            <Navbar></Navbar>
            <div className="flex justify-between m-6">
                <h1 className="text-black dark:text-white text-2xl font-medium">Dashboard</h1>
                <Link href="/" onClick={logout} className="flex items-center h-8 px-2.5 bg-std-blue rounded-sm hover:bg-std-blue-hover text-white font-normal text-base">Logout</Link>
            </div>
            <div className="mx-6 grid grid-cols-2 gap-4">
                <div className="p-24 rounded-sm border-2 border-gray-400 dark:border-gray-700"></div>
                <div className="p-24 rounded-sm border-2 border-gray-400 dark:border-gray-700"></div>
                <div className="p-24 rounded-sm border-2 border-gray-400 dark:border-gray-700"></div>
                <div className="p-24 rounded-sm border-2 border-gray-400 dark:border-gray-700"></div>
            </div>
        </div>
    )
}