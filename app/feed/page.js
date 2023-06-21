"use client";

import {useEffect, useState} from "react";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import Navbar from "@/components/Navbar";
import Article from "@/components/Article";
import ArticleCard from "@/components/ArticleCard";

export default function Feed() {
    const {success, result, isLoading, errors} = useFetch("GET", "/news/article/");
    const [article, setArticle] = useState(null);
    const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(min-width: 768px)").matches);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        window
            .matchMedia("(min-width: 1024px)")
            .addEventListener('change', e => setIsLargeScreen(e.matches));
    }, []);

    if (success && article === null) {
        setArticle(result?.[0]);
    }

    // TODO: Add cross to close sidebar
    return (
        <div className="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
            <Navbar showTrigram={!isLargeScreen} onSideBarClick={() => {setShowSidebar(!showSidebar)}}/>
            <Errors errors={errors}/>
            <div className="flex">
                {isLargeScreen && <div className="flex flex-col fixed w-80 mt-1 h-full overflow-y-auto">
                    {result?.map(function(e, i) {return <ArticleCard article={e} key={i} onClick={() => {setArticle(e)}}/>})}
                    <button className="mb-20 mt-2 align-center underline" onClick={() => {}}>Load More</button>
                </div>}
                {!isLargeScreen && showSidebar && <div className="flex flex-col fixed z-40 mt-1 bg-white dark:bg-gray-900 h-full overflow-y-auto">
                    {result?.map(function(e, i) {return <ArticleCard article={e} key={i} onClick={() => {setArticle(e)}}/>})}
                    <button className="mb-20 mt-2 align-center underline">Load More</button>
                </div>}
                <Article className="lg:ml-80 overflow-x-auto" article={article}/>
            </div>
        </div>
    )
}
