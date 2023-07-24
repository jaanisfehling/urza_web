"use client";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import {useEffect, useState} from "react";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import Article from "@/components/Article";
import ArticleList from "@/components/ArticleList";
import { refreshTokenValid } from "@/api/utils";
import { redirect } from "next/navigation";
import useWebsocket from "@/hooks/useWebSocket";
import GridLayout from "react-grid-layout";

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
    const [newsUrl, setNewsUrl] = useState<string>("/news/article/?get_stream_article_perm=true");
    const [articleList, setArticleList] = useState<ArticleData[] | null | undefined>(null);
    const [selectedArticle, setSelectedArticle] = useState<ArticleData | null | undefined>(null);
    const {result, errors} = useFetch<ArticleResponse>("GET", newsUrl);

    const [wsUrl, setWsUrl] = useState<string>();
    const {messages, errors: wsErrors} = useWebsocket(wsUrl);

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
        <div>
            <Errors className="sticky top-14" errors={[...wsErrors||[], ...errors||[]]}/>
            <GridLayout className="layout" cols={3} rowHeight={1200} width={1920}>
                <div key="a">
                    {articleList && articleList?.length > 0 && <ArticleList articleList={[...messages||[], ...articleList||[]]} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} onLoadMoreClick={() => {setNewsUrl(result ? result?.next : "")}}/>}
                </div>
                <div key="b">
                    {selectedArticle && <Article className="ml-40 lg:ml-80" article={selectedArticle}/>}
                </div>
            </GridLayout>
        </div>
    )
}
