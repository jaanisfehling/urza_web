import ArticleCard from "@/components/ArticleCard";

export default function ArticleList({className, articleList, selectedArticle, setSelectedArticle, onLoadMoreClick}) {
    return (
        <div className={`flex flex-col fixed h-full overflow-y-auto ${className}`}>
            {articleList?.map(function (elem, i) {
                return <ArticleCard article={elem} key={i} isSelected={elem === selectedArticle} onClick={() => {
                    setSelectedArticle(elem)
                }}/>
            })}
            <button className="mb-20 mt-2 align-center underline" onClick={onLoadMoreClick}>Load More</button>
        </div>
    )
}