"use client";

import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import Navbar from "@/components/Navbar";
import ArticleList from "@/components/ArticleList";
import Article from "@/components/Article";

export default function Feed() {
    const {result, isLoading, errors} = useFetch("GET", "/news/article/");
    const [article, setArticle] = useState();

    return (
        <div className="flex flex-col bg-white min-h-screen">
            <Navbar/>
            <Errors errors={errors}/>
            <div className="grid grid-cols-2 gap-4">
                <ArticleList articles={result} setter={setArticle}/>
                <Article article={article}/>
            </div>
        </div>
    )
}
