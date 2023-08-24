import './globals.css';
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import {ReactNode} from "react";
import Providers from "@/context_providers/Providers";
import Link from 'next/link';

const DynamicNavbar = dynamic(() => import("@/components/Navbar"), {ssr: false});
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Urza",
  description: "Live financial news",
}

export default function RootLayout({children}: {children?: ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className + ""}>
                <Providers>
                    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
                        <div className="static">
                            <div className="absolute sticky top-0 z-10 h-14">
                                <DynamicNavbar/>
                            </div>
                            <div className="absolute top-0 w-full h-14">
                                <div className="flex h-14 px-4 items-center justify-between border-b-2 border-gray-700 dark:border-gray-700">
                                    <Link href="/" className="text-2xl font-normal">Urza</Link>
                                </div>
                            </div>
                        </div>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    )
}
