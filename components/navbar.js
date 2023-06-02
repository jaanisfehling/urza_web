import Link from "next/link";

export function Navbar() {
    return (
        <div className="flex px-4 justify-between bg-white sticky h-14 w-full items-center border-std-blue border-b-2">
            <span className="text-2xl text-std-blue">Urza</span>
            <div className="flex space-x-4">
                <Link href="/login" className="flex rounded-sm h-8 px-2.5 m-2 bg-std-blue hover:bg-std-blue-hover items-center text-white font-medium text-base" type="button">
                    Login
                </Link>
                <Link href="/login" className="flex rounded-sm h-8 px-2.5 m-2 bg-std-blue hover:bg-std-blue-hover items-center text-white font-medium text-base" type="button">
                    Sign Up
                </Link>
            </div>
        </div>
    )
}