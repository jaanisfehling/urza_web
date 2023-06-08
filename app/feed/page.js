"use client"

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Feed() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const router = useRouter();

    return (
        <main className="bg-white min-h-screen">
        </main>
    )
}
