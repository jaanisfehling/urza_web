"use client";

import {useEffect, useState} from "react";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import {refreshTokenValid} from "@/api/utils";
import {redirect} from "next/navigation";
import useWebsocket from "@/hooks/useWebSocket";
import dynamic from "next/dynamic";

const MainGrid = dynamic(() => import("@/components/MainGrid"), {ssr: false})

export default function Feed() {
    if (typeof document !== "undefined" && !refreshTokenValid()) {
        redirect("/login");
    }
    const [newsUrl, setNewsUrl] = useState<string>("/news/article/");
    const [articleList, setArticleList] = useState<Article[] | null | undefined>(null);
    const [selectedArticle, setSelectedArticle] = useState<Article | null | undefined>(null);
    const {result, errors} = useFetch<ArticleResponse>("GET", newsUrl);

    const [wsUrl, setWsUrl] = useState<string>();
    const {messages, errors: wsErrors} = useWebsocket<Article>("/news/");

    useEffect(() => {
        if (articleList == null) {
            setArticleList(result?.results);
        } else {
            setArticleList([...articleList, ...result?.results||[]]);
        }
    }, [result]);

    useEffect(() => {
        if (selectedArticle == null) {
            setSelectedArticle(articleList?.[0]);
        }
    }, [articleList]);

    useEffect(() => {
        setArticleList([...articleList||[], ...messages||[]]);
        console.log(messages)
    }, [messages]);

    return (
        <>
            <Errors className="top-14" errors={[...errors||[], ...wsErrors||[]]}/>
            <MainGrid articleList={articleList} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} onLoadMoreClick={() => {setNewsUrl(result ? result?.next : "")}}/>
        </>
    )
}
