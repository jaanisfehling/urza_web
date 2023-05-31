import {Navbar} from "@/components/navbar";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen bg-white flex-col">
            <Navbar></Navbar>
            <div className="flex-col items-center m-auto space-y-5">
                <h1 className="py-4 px-0.5">
                    Hello world
                </h1>
                <Link href="/login" className="text-white bg-std-blue hover:bg-std-blue-hover font-medium rounded-lg text-base px-4 py-2.5">
                    Sign Up
                </Link>
            </div>
        </main>
    )
}
