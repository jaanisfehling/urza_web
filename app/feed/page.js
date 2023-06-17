"use client";

import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import Navbar from "@/components/Navbar";
import Article from "@/components/Article";
import ArticleCard from "@/components/ArticleCard";

export default function Feed() {
    const {result, isLoading, errors} = useFetch("GET", "/news/article/");
    const [article, setArticle] = useState();

    return (
        <div className="flex flex-col bg-white min-h-screen">
            <Navbar/>
            <Errors errors={errors}/>
            <div className="flex">
                <div className="">
                    {result?.map(function(e, i) {return <ArticleCard article={e} key={i} onClick={() => setArticle(e)}/>})}
                </div>
                <Article className="" article={article}/>
            </div>
        </div>
    )
}
