import Indicator from "./Indicator";
import ArticlePreview from "@/components/ArticlePreview";

export default function ArticleList({articles}) {
    if (articles !== null) {
        return (
            <div className="grid grid-cols-1 gap-2">
                {articles.map(function(article, i) {return <ArticlePreview article={article} key={i} />})}
            </div>
        )
    } else {
        return (
            <Indicator />
        )
    }

}