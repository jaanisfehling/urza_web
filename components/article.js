export default function Article({article}) {
    return (
        <div className="border-2 border-std-blue">
            <div dangerouslySetInnerHTML={{ __html: article?.readable_html }}></div>
        </div>
    )
}