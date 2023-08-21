type Article = {
    url: string,
    ticker: string,
    date_time: string,
    site_name: string,
    title: string,
    text: string,
    readable_html: string,
    summary?: string | null | undefined,
    sentiment?: string | null | undefined,
    sentiment_score?: number | null | undefined,
    label?: string | null | undefined,
    label_score?: string | null | undefined,
    relevance: number
}

type ArticleResponse = {
    results: Article[],
    next: string,
    can_stream_articles?: boolean
}

type OHLC = {
    "open": number,
    "low": number,
    "high": number,
    "close": number,
    "volume": number
    "t": string,
}[]

type Quote = {
    "price": number,
    "volume": number
}
