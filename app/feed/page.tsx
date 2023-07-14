"use client";

import {useEffect, useState} from "react";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import Navbar from "@/components/Navbar";
import Article from "@/components/Article";
import ArticleList from "@/components/ArticleList";
import { refreshTokenValid } from "@/api/utils";
import { redirect } from "next/navigation";
import useWebsocket from "@/hooks/useWeboscket";

export default function Feed() {
    if (typeof document !== "undefined" && !refreshTokenValid()) {
        redirect("/login");
    }
    const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(min-width: 768px)").matches);
    const [showSidebar, setShowSidebar] = useState(false);

    const [newsUrl, setNewsUrl] = useState<string>("/news/article/");
    const [articleList, setArticleList] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const {result, errors} = useFetch("GET", newsUrl);

    const [wsUrl, setWsUrl] = useState<string>();
    const {messages, wsErrors} = useWebsocket(wsUrl);

    useEffect(() => {
        window
            .matchMedia("(min-width: 1024px)")
            .addEventListener('change', e => setIsLargeScreen(e.matches));
    }, []);

    useEffect(() => {
        if (articleList == null) {
            setArticleList(result?.results);
            if (result?.can_stream_articles) {
                setWsUrl("/news/");
            }
        } else {
            setArticleList(articleList.concat(result?.results));
        }
    }, [result]);

    useEffect(() => {
        if (selectedArticle == null) {
            setSelectedArticle(articleList?.[0]);
        }
    }, [articleList]);

    return (
        <div className="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
            <Navbar showTrigram={!isLargeScreen && !showSidebar} showCross={!isLargeScreen && showSidebar} onSideBarButtonClick={() => {setShowSidebar(!showSidebar)}}/>
            <Errors className="sticky top-14" errors={[...wsErrors||[], ...errors||[]]}/>
            <div className="flex">
                <ArticleList className="" articleList={[...messages||[], ...articleList||[]]} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} onLoadMoreClick={() => {setNewsUrl(result?.next)}} isLargeScreen={isLargeScreen} showSidebar={showSidebar}/>
                <Article className="lg:ml-80" article={selectedArticle}/>
            </div>
        </div>
    )
}
