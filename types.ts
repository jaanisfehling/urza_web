type Article = {
    url: string,
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
    "t": string,
    "o": number,
    "h": number,
    "l": number,
    "c": number,
    "v": number
}

type MultiOHLC = {
    [ticker: string]: OHLC
}

type Quote = {
    "t": string,
    "a_p": number,
    "a_s": number,
    "b_p": number,
    "b_s": number
}

type MultiQuote = {
    [ticker: string]: Quote
}
