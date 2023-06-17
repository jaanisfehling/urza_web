export default function ArticleCard({className, article, onClick}) {
    return (
        <button onClick={onClick} className={`${className} m-2 p-2 rounded-sm border-2 border-black`}>
            <span>{article.title}</span>
            <span>{article.excerpt}</span>
        </button>
    )
}