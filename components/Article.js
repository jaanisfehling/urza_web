export default function Article({article, className}) {
    return (
        <div className={`${className} flex border-2 border-std-blue`}>
            <div dangerouslySetInnerHTML={{ __html: article?.readable_html }}></div>
        </div>
    )
}