"use client";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import ArticleList from "@/components/ArticleList";
import ArticleView from "@/components/ArticleView";
import { Responsive, WidthProvider } from "react-grid-layout";
import {Dispatch, SetStateAction} from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function MainGrid({articleList, selectedArticle, setSelectedArticle, onLoadMoreClick}: {articleList: Article[], selectedArticle: Article | null | undefined, setSelectedArticle: Dispatch<SetStateAction<Article | null | undefined>>, onLoadMoreClick: () => void}) {
    return (
        <ResponsiveGridLayout className="layout"
                              cols={{ lg: 5, md: 5, sm: 3, xs: 1, xxs: 1 }}
                              rowHeight={(window.innerHeight-126)/6}
                              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                              isResizable={false}
                              isBounded={true}>
            <div key="a" data-grid={{ x: 0, y: 0, w: 1, h: 6 }}>
                {articleList && articleList?.length > 0 && <ArticleList articleList={articleList} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} onLoadMoreClick={onLoadMoreClick}/>}
            </div>
            <div key="b" data-grid={{ x: 1, y: 0, w: 2, h: 6 }}>
                {selectedArticle && <ArticleView className="pt-4 px-10 h-full w-full overflow-auto rounded-sm border-2 border-gray-400 dark:border-gray-700" article={selectedArticle}/>}
            </div>
            <div key="c" data-grid={{ x: 3, y: 0, w: 2, h: 3 }}>
            </div>
        </ResponsiveGridLayout>
    )
}
