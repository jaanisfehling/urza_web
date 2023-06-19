"use client";

import {useEffect, useState} from "react";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import Navbar from "@/components/Navbar";
import Article from "@/components/Article";
import ArticleCard from "@/components/ArticleCard";

export default function Feed() {
    const {success, result, isLoading, errors} = useFetch("GET", "/news/article/");
    const [article, setArticle] = useState();
    const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(min-width: 768px)").matches);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setIsLargeScreen(e.matches));
    }, []);
    console.log(result)

    if (success && article === undefined) {
        setArticle(result?.[0]);
    }

    // TODO: Add cross to close sidebar
    return (
        <div className="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
            <Navbar showTrigram={!isLargeScreen} onSideBarClick={() => {setShowSidebar(!showSidebar)}}/>
            <Errors errors={errors}/>
            <div className="flex">
                {isLargeScreen && <div className="fixed w-80 h-screen overflow-y-auto">
                    {result?.map(function(e, i) {return <ArticleCard article={e} key={i} onClick={() => setArticle(e)}/>})}
                </div>}
                {!isLargeScreen && showSidebar && <div className="fixed z-40 bg-white dark:bg-gray-900 h-screen overflow-y-auto">
                    {result?.map(function(e, i) {return <ArticleCard article={e} key={i} onClick={() => setArticle(e)}/>})}
                </div>}
                <Article className="md:ml-80 overflow-x-auto" article={article}/>
            </div>
        </div>
    )
}
