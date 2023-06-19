"use client";

import {useEffect, useState} from "react";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import Navbar from "@/components/Navbar";
import Article from "@/components/Article";
import ArticleCard from "@/components/ArticleCard";

export default function Feed() {
    const {result, isLoading, errors} = useFetch("GET", "/news/article/");
    const [article, setArticle] = useState();
    const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(min-width: 768px)").matches)

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setIsLargeScreen(e.matches));
    }, []);
    console.log(result)

    return (
        <div className="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
            <Navbar/>
            <Errors errors={errors}/>
            <div className="flex relative">
                {isLargeScreen && <div className="absolute fixed z-40 h-screen overflow-y-auto">
                    {result?.map(function(e, i) {return <ArticleCard article={e} key={i} onClick={() => setArticle(e)}/>})}
                </div>}
                <Article className="md:ml-64 min-w-full min-h-full" article={article}/>
            </div>
        </div>
    )
}
