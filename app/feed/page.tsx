"use client";

import {useEffect, useState} from "react";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import useWebsocket from "@/hooks/useWebSocket";
import dynamic from "next/dynamic";

const MainGrid = dynamic(() => import("@/components/MainGrid"), {ssr: false});

export default function Feed() {
    const [url, setUrl] = useState<string>("/news/article/");
    const [articleList, setArticleList] = useState<Article[] | null | undefined>(null);
    const [selectedArticle, setSelectedArticle] = useState<Article | null | undefined>(null);
    const {result, errors} = useFetch<ArticleResponse>("GET", url);

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

    return (
        <>
            <Errors className="top-14" errors={[...errors||[], ...wsErrors||[]]}/>
            <MainGrid articleList={[...messages||[], ...articleList||[]]} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} onLoadMoreClick={() => {setUrl(result ? result?.next : "")}}/>
        </>
    )
}
