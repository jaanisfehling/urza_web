import ArticleCard from "@/components/ArticleCard";

export default function ArticleList({className, articleList, setArticle, onLoadMoreClick, isLargeScreen, showSidebar}) {

    if (!isLargeScreen) {
        className += " z-40 bg-white dark:bg-gray-900";
    } else {
        className += " w-80 mt-1";
    }

    if (isLargeScreen || showSidebar) {
        return (
            <div className={`${className} flex flex-col fixed h-full overflow-y-auto`}>
                {articleList?.map(function (e, i) {
                    return <ArticleCard article={e} key={i} onClick={() => {
                        setArticle(e)
                    }}/>
                })}
                <button className="mb-20 mt-2 align-center underline" onClick={onLoadMoreClick}>Load More</button>
            </div>
        )
    }
}