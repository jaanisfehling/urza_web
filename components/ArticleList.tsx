import ArticleCard from "@/components/ArticleCard";
import {Dispatch, SetStateAction} from "react";

export default function ArticleList({className, articleList, selectedArticle, setSelectedArticle, onLoadMoreClick}: {className?: string, articleList: Article[] | null | undefined, selectedArticle: Article | null | undefined, setSelectedArticle: Dispatch<SetStateAction<Article | null | undefined>>, onLoadMoreClick: () => void}) {
    return (
        <div className={`flex flex-col h-full w-full overflow-y-auto ${className}`}>
            {articleList?.map(function (elem, i) {
                return <ArticleCard article={elem} key={i} isSelected={elem === selectedArticle} onClick={() => {
                    setSelectedArticle(elem)
                }}/>
            })}
            <button className="mb-2 mt-2 align-center underline" onClick={onLoadMoreClick}>Load More</button>
        </div>
    )
}