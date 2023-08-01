"use client";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import ArticleList from "@/components/ArticleList";
import ArticleView from "@/components/ArticleView";
import { Responsive, WidthProvider } from "react-grid-layout";
import {Dispatch, SetStateAction, useLayoutEffect, useState} from "react";
import ChartContainer from "@/components/ChartContainer";

const data: OHLC = {"AAPL": [
        {
            "t": "2023-01-02T00:00:00.000+00:00",
            "o": 122.24,
            "h": 124.28,
            "l": 121.72,
            "c": 123.66,
            "v": 12511
        }, {
            "t": "2023-01-03T00:00:00.000+00:00",
            "o": 122.46,
            "h": 124.62,
            "l": 117.62,
            "c": 118.8,
            "v": 37855
        }, {
            "t": "2023-01-04T00:00:00.000+00:00",
            "o": 118.8,
            "h": 121.28,
            "l": 118.14,
            "c": 119.02,
            "v": 32556
        }, {
            "t": "2023-01-05T00:00:00.000+00:00",
            "o": 119.24,
            "h": 121.16,
            "l": 118.52,
            "c": 118.84,
            "v": 24598
        }, {
            "t": "2023-01-06T00:00:00.000+00:00",
            "o": 119.14,
            "h": 122.46,
            "l": 118.56,
            "c": 121.58,
            "v": 26983
        }, {
            "t": "2023-01-09T00:00:00.000+00:00",
            "o": 122.02,
            "h": 124.12,
            "l": 121.06,
            "c": 121.26,
            "v": 24788
        }, {
            "t": "2023-01-10T00:00:00.000+00:00",
            "o": 121.38,
            "h": 122.04,
            "l": 119.48,
            "c": 121.66,
            "v": 16322
        }, {
            "t": "2023-01-11T00:00:00.000+00:00",
            "o": 122.02,
            "h": 124.0,
            "l": 121.12,
            "c": 124.0,
            "v": 24233
        }, {
            "t": "2023-01-12T00:00:00.000+00:00",
            "o": 124.44,
            "h": 124.78,
            "l": 122.06,
            "c": 122.94,
            "v": 28889
        }, {
            "t": "2023-01-13T00:00:00.000+00:00",
            "o": 122.88,
            "h": 124.54,
            "l": 121.8,
            "c": 124.32,
            "v": 17390
        }, {
            "t": "2023-01-16T00:00:00.000+00:00",
            "o": 124.48,
            "h": 124.82,
            "l": 123.3,
            "c": 124.46,
            "v": 11113
        }, {
            "t": "2023-01-17T00:00:00.000+00:00",
            "o": 124.2,
            "h": 126.92,
            "l": 123.52,
            "c": 126.0,
            "v": 21644
        }, {
            "t": "2023-01-18T00:00:00.000+00:00",
            "o": 126.9,
            "h": 127.62,
            "l": 125.0,
            "c": 125.2,
            "v": 14812
        }, {
            "t": "2023-01-19T00:00:00.000+00:00",
            "o": 125.24,
            "h": 125.7,
            "l": 123.28,
            "c": 124.94,
            "v": 14687
        }, {
            "t": "2023-01-20T00:00:00.000+00:00",
            "o": 125.54,
            "h": 127.02,
            "l": 124.2,
            "c": 126.86,
            "v": 13891
        }, {
            "t": "2023-01-23T00:00:00.000+00:00",
            "o": 126.56,
            "h": 131.96,
            "l": 125.92,
            "c": 129.92,
            "v": 23899
        }, {
            "t": "2023-01-24T00:00:00.000+00:00",
            "o": 129.98,
            "h": 131.56,
            "l": 128.6,
            "c": 131.04,
            "v": 12735
        }, {
            "t": "2023-01-25T00:00:00.000+00:00",
            "o": 130.26,
            "h": 130.66,
            "l": 127.48,
            "c": 129.88,
            "v": 14731
        }, {
            "t": "2023-01-26T00:00:00.000+00:00",
            "o": 130.98,
            "h": 132.32,
            "l": 130.06,
            "c": 132.24,
            "v": 14422
        }, {
            "t": "2023-01-27T00:00:00.000+00:00",
            "o": 131.8,
            "h": 135.4,
            "l": 131.32,
            "c": 134.26,
            "v": 22579
        }, {
            "t": "2023-01-30T00:00:00.000+00:00",
            "o": 133.7,
            "h": 134.18,
            "l": 131.72,
            "c": 131.72,
            "v": 14884
        }, {
            "t": "2023-01-31T00:00:00.000+00:00",
            "o": 132.0,
            "h": 132.7,
            "l": 130.64,
            "c": 132.7,
            "v": 10188
        }, {
            "t": "2023-02-01T00:00:00.000+00:00",
            "o": 132.48,
            "h": 133.32,
            "l": 129.74,
            "c": 132.3,
            "v": 26678
        }
    ]
}

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function MainGrid({articleList, selectedArticle, setSelectedArticle, onLoadMoreClick}: {articleList: Article[], selectedArticle: Article | null | undefined, setSelectedArticle: Dispatch<SetStateAction<Article | null | undefined>>, onLoadMoreClick: () => void}) {
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
                <ChartContainer data={data}/>
            </div>
            <div key="d">
                <ChartContainer data={data}/>
            </div>
        </ResponsiveGridLayout>
    )
}
