"use client";

import {refreshTokenValid} from "@/api/utils";
import {useState} from "react";
import Link from "next/link";

export default function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [currentPage, setPage] = useState("");

    let links: {link: string, text: string}[];
    if (refreshTokenValid()) {
        links = [
            {link: "/feed", text: "Urza"},
            {link: "/dashboard", text: "Dashboard"},
            {link: "/feed", text: "Feed"}
        ]
    } else {
        links = [
            {link: "/", text: "Urza"},
            {link: "/login", text: "Login"},
            {link: "/signup", text: "Sign Up"}
        ]
    }

    return (
        <>
            <div className="flex h-14 w-full px-4 items-center justify-between border-b-2 border-gray-700 dark:border-gray-700">
                <Link href={links[0].link} onClick={() => {setPage(links[0].link)}} className="text-2xl font-normal text-black dark:text-white">{links[0].text}</Link>
                <div className="relative flex">
                    <Link href={links[0].link} onClick={() => setShowSidebar(!showSidebar)} className="absolute top-2 right-0 z-10 lg:invisible px-2.5 rounded-sm text-black dark:text-white text-2xl">{showSidebar ? "✖" : "☰"}</Link>
                    <div className="flex space-x-2 invisible lg:visible">
                        <Link href={links[1].link} onClick={() => {setPage(links[1].link)}} className={`flex items-center h-8 px-2.5 m-2 text-black dark:text-white ${currentPage == links[1].link ? "font-bold" : "font-normal"}`}>{links[1].text}</Link>
                        <Link href={links[2].link} onClick={() => {setPage(links[2].link)}} className={`flex items-center h-8 px-2.5 m-2 text-black dark:text-white ${currentPage == links[2].link  ? "font-bold" : "font-normal"}`}>{links[2].text}</Link>
                    </div>
                </div>
            </div>
            {showSidebar &&
            <div className="flex flex-col space-y-5 fixed h-full w-full z-40 pt-5 overflow-y-auto bg-white dark:bg-gray-900">
                <Link href={links[1].link} onClick={() => {setPage(links[1].link); setShowSidebar(false)}} className={`flex items-center ml-8 text-std text-black dark:text-white ${currentPage == links[1].link  ? "font-bold" : "font-normal"}`}>{links[1].text}</Link>
                <Link href={links[2].link} onClick={() => {setPage(links[2].link); setShowSidebar(false)}} className={`flex items-center ml-8 text-std text-black dark:text-white ${currentPage == links[2].link  ? "font-bold" : "font-normal"}`}>{links[2].text}</Link>
            </div>
            }
        </>
    )
}