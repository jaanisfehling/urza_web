export default function ArticleCard({className, article, isSelected, onClick}: {className?: string, article: Article, isSelected: boolean, onClick: () => void}) {

    if (isSelected) {
        className += " border-4";
    } else {
        className += " border-2";
    }

    return (
        <button className={`flex flex-col space-y-2 mb-2 p-2.5 box-border rounded-sm border-gray-400 dark:border-gray-700 ${className != undefined ? className : ""}`} onClick={onClick}>
            <b>{article?.title}</b>
            <span>{new Date(article?.date_time).toLocaleString()}</span>
        </button>
    )
}