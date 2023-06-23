export default function ArticleCard({className, article, isSelected, onClick}) {

    if (isSelected) {
        className += " border-4";
    } else {
        className += " border-2";
    }

    return (
        <button className={`flex flex-col space-y-2 mx-2 my-1 p-2.5 box-border rounded-sm border-gray-400 dark:border-gray-700 ${className}`} onClick={onClick}>
            <b>{article?.title}</b>
            <span>{new Date(article?.date_time).toLocaleString()}</span>
        </button>
    )
}