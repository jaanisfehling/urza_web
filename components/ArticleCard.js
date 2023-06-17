export default function ArticleCard({className, article, onClick}) {
    return (
        <button onClick={onClick} className={`${className} flex flex-col m-2 p-2 border-2 border-std-blue`}>
            <span>{article.title}</span>
            <span>{article.excerpt}</span>
        </button>
    )
}