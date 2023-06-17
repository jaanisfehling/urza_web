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
    const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches)

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    return (
        <div className="flex flex-col bg-white min-h-screen">
            <Navbar/>
            <Errors errors={errors}/>
            <div className="flex relative">
                {matches && <div className="absolute left-0 top-0 fixed z-40 w-1/6 h-screen overflow-y-auto">
                    {result?.map(function(e, i) {return <ArticleCard article={e} key={i} onClick={() => setArticle(e)}/>})}
                </div>}
                <Article className="w-5/6 right-0 top-0" article={article}/>
            </div>
        </div>
    )
}
