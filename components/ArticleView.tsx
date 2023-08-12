export default function ArticleView({className, article}: {className?: string, article: Article}) {
    return (
        <div className={` ${className != undefined ? className : ""}`}>
            <div dangerouslySetInnerHTML={{ __html: article?.readable_html }}></div>
        </div>
    )
}