import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center m-auto space-y-4">
            <h1 className="">
                Hello world
            </h1>
            <Link href="/signup" className="text-white bg-std-blue hover:bg-std-blue-hover font-medium rounded-sm text-base px-4 py-2.5">
                Sign Up
            </Link>
        </div>
    )
}
