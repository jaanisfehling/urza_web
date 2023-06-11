"use client";

import useFetch from "@/hooks/useFetch";
import Errors from "@/components/errors";

export default function Feed() {
    const {result, isLoading, errors} = useFetch("GET", "/news/article/");

    return (
        <div className="bg-white min-h-screen">
            <Errors errors={errors} />
        </div>
    )
}
