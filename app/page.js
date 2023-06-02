import {Navbar} from "@/components/navbar";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen bg-white">
            <Navbar></Navbar>
            <div className="flex-col items-center m-auto space-y-5">
                <h1 className="py-4 px-0.5">
                    Hello world
                </h1>
                <Link href="/signup" className="text-white bg-std-blue hover:bg-std-blue-hover font-medium rounded-sm text-base px-4 py-2.5">
                    Sign Up
                </Link>
            </div>
        </main>
    )
}
