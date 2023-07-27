import './globals.css';
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import {ReactNode} from "react";
import Providers from "@/context_providers/Providers";

const DynamicNavbar = dynamic(() => import("@/components/Navbar"), {ssr: false});
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Urza",
  description: "Live financial news right from the source",
}

export default function RootLayout({ children }: {children?: ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className + ""}>
                <Providers>
                    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
                        <div className="sticky top-0 z-10 h-14 bg-white dark:bg-gray-900">
                            <DynamicNavbar/>
                        </div>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    )
}
