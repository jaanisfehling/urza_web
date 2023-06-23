import ArticleCard from "@/components/ArticleCard";

export default function ArticleList({className, articleList, selectedArticle, setSelectedArticle, onLoadMoreClick, isLargeScreen, showSidebar}) {

    if (!isLargeScreen) {
        className += " z-40 bg-white dark:bg-gray-900";
    } else {
        className += " w-80 mt-1";
    }

    if (isLargeScreen || showSidebar) {
        return (
            <div className={`flex flex-col fixed h-full overflow-y-auto ${className}`}>
                {articleList?.map(function (elem, i) {
                    return <ArticleCard className="" article={elem} key={i} isSelected={elem === selectedArticle} onClick={() => {
                        setSelectedArticle(elem)
                    }}/>
                })}
                <button className="mb-20 mt-2 align-center underline" onClick={onLoadMoreClick}>Load More</button>
            </div>
        )
    }
}