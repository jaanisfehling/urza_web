"use client"

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Feed() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const fetchInitialArticles = async () => {
            fetch(baseUrl + "news/article/", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                cache: "no-store"
            }).then(function(response) {
                if (!response.ok) {
                    return response.json();
                }
                setIsLoading(false);
                setData(response.json());
                setErrors([]);
            }).then(function(result) {
                setErrors(result);
            });
        }
        fetchInitialArticles();
    }, []);


    return (
        <main className="bg-white min-h-screen">
        </main>
    )
}
