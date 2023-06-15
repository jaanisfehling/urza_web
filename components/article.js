export default function Article({article}) {
    return (
        <div className="">
            <div dangerouslySetInnerHTML={{ __html: article.readable_html }}></div>
        </div>
    )
}