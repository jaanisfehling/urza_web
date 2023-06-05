import {baseUrl} from "@/consts";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function Feed() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const router = useRouter();

    fetch(baseUrl + "news/article/", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }).then(function(response) {
        if (!response.ok) {
            return response.json();
        }
    }).then(function(result) {
        let msgs = [];
        for (const [key, value] of Object.entries(result)) {
            msgs.push(...value);
        }
        setErrors(msgs);
    });

    return (
        <main className="bg-white min-h-screen">
            Hello World
        </main>
    )
}