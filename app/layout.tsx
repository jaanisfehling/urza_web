import './globals.css'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import {ReactNode} from "react";

const DynamicNavbar = dynamic(() => import("@/components/Navbar"), {ssr: false})
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Urza",
  description: "Live financial news right from the source",
}

export default function RootLayout({ children }: {children?: ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className + ""}>
                <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
                    <div className="h-14">
                        <DynamicNavbar/>
                    </div>
                    {children}
                </div>
            </body>
        </html>
    )
}
