export default function ArticlePreview({article}) {
    return (
        <div className="flex flex-col p-8">
            <p>{article.title}</p>
            <p>{article.excerpt}</p>
        </div>
    )
}