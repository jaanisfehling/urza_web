export default function Article({article, className}) {
    return (
        <div className={`m-2 p-2 overflow-x-auto rounded-sm border-2 border-gray-400 dark:border-gray-700 ${className}`}>
            <div dangerouslySetInnerHTML={{ __html: article?.readable_html }}></div>
        </div>
    )
}