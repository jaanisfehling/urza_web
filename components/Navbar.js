import Link from "next/link";
import {refreshTokenValid} from "@/api/utils";

export default function Navbar({showTrigram, showCross, onSideBarButtonClick}) {

    if (typeof document !== "undefined" && refreshTokenValid()) {
        let mainLogoButton;
        if (showTrigram) {
            mainLogoButton = <button onClick={onSideBarButtonClick} className="px-2.5 rounded-sm bg-white dark:bg-gray-900 text-black dark:text-white text-2xl">☰</button>;
        } else if (showCross) {
            mainLogoButton = <button onClick={onSideBarButtonClick} className="px-2.5 rounded-sm bg-white dark:bg-gray-900 text-black dark:text-white text-2xl">✖</button>;
        } else {
            mainLogoButton = <Link href="/feed" className="text-2xl font-normal text-black dark:text-white">Urza</Link>;
        }

        return (
            <div className="sticky top-0 flex items-center px-4 justify-between bg-white dark:bg-gray-900 sticky h-14 w-full border-gray-700 dark:border-gray-700 border-b-2">
                {mainLogoButton}
                <div className="flex space-x-2">
                    <Link href="/dashboard" className="flex items-center h-8 px-2.5 m-2 rounded-sm border-2 border-std-blue hover:bg-sky-200 dark:hover:bg-std-blue text-std dark:text-white-blue font-normal text-base">
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
            <div className="sticky top-0 flex items-center px-4 justify-between bg-white dark:bg-gray-900 sticky h-14 w-full border-gray-700 dark:border-gray-700 border-b-2">
                <Link href="/" className="text-2xl font-normal text-black dark:text-white">
                    Urza
                </Link>
                <div className="flex space-x-2">
                    <Link href="/login" className="flex items-center h-8 px-2.5 m-2 rounded-sm border-2 border-std-blue hover:bg-sky-200 dark:hover:bg-std-blue text-std dark:text-white-blue font-normal text-base">
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