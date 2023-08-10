import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import ArticleList from "@/components/ArticleList";
import ArticleView from "@/components/ArticleView";
import {Responsive, WidthProvider} from "react-grid-layout";
import {Dispatch, SetStateAction, useLayoutEffect, useState} from "react";
import ChartContainer from "@/components/ChartContainer";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function MainGrid({articleList, selectedArticle, setSelectedArticle, onLoadMoreClick}: {articleList: Article[] | null | undefined, selectedArticle: Article | null | undefined, setSelectedArticle: Dispatch<SetStateAction<Article | null | undefined>>, onLoadMoreClick: () => void}) {
    const [height, setHeight] = useState(window.innerHeight);

    useLayoutEffect(() => {
        function updateSize() {setHeight(window.innerHeight)}
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const lgLayout = [
        { i: "a", x: 0, y: 0, w: 1, h: 6 },
        { i: "b", x: 1, y: 0, w: 2, h: 6 },
        { i: "c", x: 3, y: 0, w: 2, h: 3 },
        { i: "d", x: 3, y: 3, w: 2, h: 3 }
    ]
    const smLayout = [
        { i: "a", x: 0, y: 0, w: 1, h: 5 },
        { i: "b", x: 1, y: 0, w: 2, h: 5 },
        { i: "c", x: 0, y: 6, w: 3, h: 3 },
        { i: "d", x: 0, y: 6, w: 3, h: 3 }
    ]
    const xsLayout = [
        { i: "a", x: 0, y: 0, w: 1, h: 3 },
        { i: "b", x: 0, y: 3, w: 1, h: 5 },
        { i: "c", x: 0, y: 0, w: 1, h: 3 },
        { i: "d", x: 0, y: 3, w: 1, h: 3 }
    ]

    return (
        <ResponsiveGridLayout className="layout"
                              cols={{ lg: 5, md: 5, sm: 3, xs: 1, xxs: 1 }}
                              rowHeight={(height-126)/6}
                              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                              layouts={{lg: lgLayout, md: lgLayout, sm: smLayout, xs: xsLayout, xxs: xsLayout}}
                              isResizable={false}
                              isBounded={true}>
            <div key="a">
                {articleList && articleList?.length > 0 && <ArticleList articleList={articleList} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} onLoadMoreClick={onLoadMoreClick}/>}
            </div>
            <div key="b">
                {selectedArticle && <ArticleView className="pt-4 px-10 h-full w-full overflow-auto rounded-sm border-2 border-gray-400 dark:border-gray-700" article={selectedArticle}/>}
            </div>
            <div key="c">
                {selectedArticle && <ChartContainer ticker={selectedArticle.ticker}/>}
            </div>
            <div key="d">
                {selectedArticle && <ChartContainer ticker={selectedArticle.ticker}/>}
            </div>
        </ResponsiveGridLayout>
    )
}
