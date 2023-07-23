"use client";

import {useEffect, useState} from "react";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import Navbar from "@/components/Navbar";
import Article from "@/components/Article";
import ArticleList from "@/components/ArticleList";
import { refreshTokenValid } from "@/api/utils";
import { redirect } from "next/navigation";
import useWebsocket from "@/hooks/useWebSocket";

interface ArticleData {
    url: string
}

interface ArticleResponse {
    results: ArticleData[],
    next: string,
    can_stream_articles?: boolean
}

export default function Feed() {
    if (typeof document !== "undefined" && !refreshTokenValid()) {
        redirect("/login");
    }
    const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(min-width: 1024px)").matches);
    const [showSidebar, setShowSidebar] = useState(false);

    const [newsUrl, setNewsUrl] = useState<string>("/news/article/?get_stream_article_perm=true");
    const [articleList, setArticleList] = useState<ArticleData[] | null | undefined>(null);
    const [selectedArticle, setSelectedArticle] = useState<ArticleData | null | undefined>(null);
    const {result, errors} = useFetch<ArticleResponse>("GET", newsUrl);

    const [wsUrl, setWsUrl] = useState<string>();
    const {messages, errors: wsErrors} = useWebsocket(wsUrl);

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
            setArticleList([...articleList, ...result?.results||[]]);
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
                <ArticleList className="" articleList={[...messages||[], ...articleList||[]]} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} onLoadMoreClick={() => {setNewsUrl(result ? result?.next : "")}} isLargeScreen={isLargeScreen} showSidebar={showSidebar}/>
                <Article className="lg:ml-80" article={selectedArticle}/>
            </div>
        </div>
    )
}
