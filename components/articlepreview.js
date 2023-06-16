export default function ArticlePreview({article}) {
    return (
        <div className="flex flex-col p-8 border-2 border-std-blue">
            <span>{article.title}</span>
            <span>{article.excerpt}</span>
        </div>
    )
}