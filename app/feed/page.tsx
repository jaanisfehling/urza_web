"use client";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import {useEffect, useRef, useState} from "react";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";
import ArticleView from "@/components/ArticleView";
import ArticleList from "@/components/ArticleList";
import { refreshTokenValid } from "@/api/utils";
import { redirect } from "next/navigation";
import useWebsocket from "@/hooks/useWebSocket";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Feed() {
    if (typeof document !== "undefined" && !refreshTokenValid()) {
        redirect("/login");
    }
    const [newsUrl, setNewsUrl] = useState<string>("/news/article/?get_stream_article_perm=true");
    const [articleList, setArticleList] = useState<Article[] | null | undefined>(null);
    const [selectedArticle, setSelectedArticle] = useState<Article | null | undefined>(null);
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
        <>
            <Errors className="top-14" errors={[...errors||[], ...wsErrors||[]]}/>
            <ResponsiveGridLayout className="layout"
                                  cols={{ lg: 5, md: 5, sm: 3, xs: 1, xxs: 1 }}
                                  rowHeight={(window.innerHeight-126)/6}
                                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                                  isResizable={false}
                                  isBounded={true}>
                <div key="a" data-grid={{ x: 0, y: 0, w: 1, h: 6 }}>
                    {articleList && articleList?.length > 0 && <ArticleList articleList={[...messages||[], ...articleList||[]]} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} onLoadMoreClick={() => {setNewsUrl(result ? result?.next : "")}}/>}
                </div>
                <div key="b" data-grid={{ x: 1, y: 0, w: 2, h: 6 }}>
                    {selectedArticle && <ArticleView className="pt-4 px-10 h-full w-full overflow-auto rounded-sm border-2 border-gray-400 dark:border-gray-700" article={selectedArticle}/>}
                </div>
                <div key="c" data-grid={{ x: 3, y: 0, w: 2, h: 3 }}>
                </div>
            </ResponsiveGridLayout>
        </>
    )
}
