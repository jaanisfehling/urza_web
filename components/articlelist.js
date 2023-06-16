import Indicator from "./Indicator";
import ArticlePreview from "@/components/ArticlePreview";

export default function ArticleList({articles, setter}) {
    return (
        <div className="grid grid-cols-6 gap-2">
            {articles?.map(function(article, i) {return <ArticlePreview article={article} key={i} onClick={() => setter(article)}/>})}
        </div>
    )
}