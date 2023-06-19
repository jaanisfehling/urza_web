export default function Article({article, className}) {
    return (
        <div className={`${className} m-2 p-2 rounded-sm border-2 border-gray-700 dark:border-gray-700`}>
            <div dangerouslySetInnerHTML={{ __html: article?.readable_html }}></div>
        </div>
    )
}