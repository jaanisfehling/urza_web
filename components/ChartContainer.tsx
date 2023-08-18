import {useEffect, useState} from "react";
import Chart from "@/components/LineCandleChart";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";

export default function ChartContainer({ticker}: {ticker: string}) {
    const [chartType, setChartType] = useState<"candlestick" | "line">("candlestick");
    const [url, setUrl] = useState<string>(`/market/ohlc/${ticker}/hour/`);
    const {result, errors} = useFetch<OHLC>("GET", url);

    useEffect(() => {
        setUrl(`/market/ohlc/${ticker}/hour/`);
    }, [ticker]);

    return (
        <div className="flex flex-col justify-between overflow-auto h-full w-full border-2 rounded-sm border-gray-400 dark:border-gray-700">
            <div className="h-full w-full">
                <Errors errors={errors}/>
                {result && <Chart data={result} chartType={chartType}/>}
            </div>
            <div className="flex justify-between p-2">
                <p>Hi</p>
                <div className="flex space-x-2">
                    <button className={`text-xs ${url.includes("minute") && "text-sky-500"}`} onClick={() => setUrl(`/market/ohlc/${ticker}/minute/`)}>Minute</button>
                    <button className={`text-xs ${url.includes("hour") && "text-sky-500"}`} onClick={() => setUrl(`/market/ohlc/${ticker}/hour/`)}>Hour</button>
                    <button className={`text-xs ${url.includes("day") && "text-sky-500"}`} onClick={() => setUrl(`/market/ohlc/${ticker}/day/`)}>Day</button>
                    <button className={`text-xs ${url.includes("week") && "text-sky-500"}`} onClick={() => setUrl(`/market/ohlc/${ticker}/week/`)}>Week</button>
                    <button className={`text-xs ${url.includes("month") && "text-sky-500"}`} onClick={() => setUrl(`/market/ohlc/${ticker}/month/`)}>Month</button>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={true} onChange={() => setChartType(prevState => (prevState == "line") ? "candlestick" : "line")}/>
                    <div className="w-7 h-4 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[5.49px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-400"></div>
                    <span className="ml-1 text-xs font-light">Candles</span>
                </label>
            </div>
        </div>
    )
}
