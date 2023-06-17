export default function Article({article, className}) {
    return (
        <div className={`${className} m-2 p-2 rounded-sm border-2 border-black`}>
            <div dangerouslySetInnerHTML={{ __html: article?.readable_html }}></div>
        </div>
    )
}