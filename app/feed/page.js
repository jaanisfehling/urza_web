"use client";

import useFetch from "@/hooks/useFetch";
import Errors from "@/components/errors";
import ArticlePreview from "@/components/articlepreview";
import Navbar from "@/components/navbar";
import ArticleList from "@/components/articlelist";

export default function Feed() {
    const {result, isLoading, errors} = useFetch("GET", "/news/article/");

    return (
        <div className="flex flex-col bg-white min-h-screen">
            <Navbar />
            <Errors errors={errors} />
            <div className="grid grid-cols-2 gap-4">
                <ArticleList articles={result} />
            </div>
        </div>
    )
}
