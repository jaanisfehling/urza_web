export default function ArticleCard({className, article, onClick}) {
    return (
        <button onClick={onClick} className={`${className} mx-2 my-1 p-2 rounded-sm border-2 border-gray-700 dark:border-gray-700 flex flex-col space-y-2`}>
            <b>{article.title}</b>
            <span>{new Date(article.date_time).toLocaleString()}</span>
        </button>
    )
}