import {useEffect, useState} from "react";
import Chart from "@/components/LineCandleChart";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";

export default function ChartContainer({ticker}: {ticker: string}) {
    const [chartType, setChartType] = useState<"candlestick" | "line">("candlestick");
    const [url, setUrl] = useState<string>(`/market/ohlc/${ticker}/1hour/`);
    const [queryParams, setQueryParams] = useState<{n: number}>({n: 200});
    const {result, errors} = useFetch<OHLC>("GET", url, undefined, queryParams);
    const [timespan, setTimespan] = useState<string>("1D");

    const frequency = url.split("/")[4];

    useEffect(() => {
        setUrl(`/market/ohlc/${ticker}/1hour/`);
    }, [ticker]);

    function handleTimespanChange(timespan: string) {
        let days;
        switch (timespan) {
            case "1H": days = 1/24; break;
            default: days = 1; break; // 1 day
            case "1W": days = 5; break;
            case "1M": days = 21; break;
            case "1Y": days = 252; break;
        }
        let nTicks;
        switch (frequency) {
            case "1min": nTicks = 60  * 60 * 24 * days; break;
            case "5min": nTicks = 12 * 24 * days; break;
            default: nTicks = 4 * 24; break; // 15min
            case "30min": nTicks = 2 * 24 * days; break;
            case "1hour": nTicks = 24 * days; break;
            case "1day": nTicks = days; break;
        }
        setTimespan(timespan);
        setQueryParams({n: Math.round(nTicks)});
    }

    return (
        <div className="flex flex-col justify-between overflow-auto h-full w-full border-2 rounded-sm border-gray-400 dark:border-gray-700">
            <div className="h-full w-full">
                <Errors errors={errors}/>
                {result && <Chart data={result} chartType={chartType}/>}
            </div>
            <div className="flex justify-between p-2">
                <div className="flex space-x-2">
                    <button className={`text-xs hover:text-sky-500 ${timespan == "1H" && "underline"}`} onClick={() => handleTimespanChange("1H")}>1H</button>
                    <button className={`text-xs hover:text-sky-500 ${timespan == "1D" && "underline"}`} onClick={() => handleTimespanChange("1D")}>1D</button>
                    <button className={`text-xs hover:text-sky-500 ${timespan == "1W" && "underline"}`} onClick={() => handleTimespanChange("1W")}>1W</button>
                    <button className={`text-xs hover:text-sky-500 ${timespan == "1M" && "underline"}`} onClick={() => handleTimespanChange("1M")}>1M</button>
                    <button className={`text-xs hover:text-sky-500 ${timespan == "1Y" && "underline"}`} onClick={() => handleTimespanChange("1Y")}>1Y</button>
                    <button className={`text-xs hover:text-sky-500 ${timespan == "Max" && "underline"}`} onClick={() => handleTimespanChange("Max")}>Max</button>
                </div>
                <div className="flex space-x-2">
                    <button className={`text-xs hover:text-sky-500 ${frequency == "1min" && "underline"}`} onClick={() => setUrl(`/market/ohlc/${ticker}/1min/`)}>1min</button>
                    <button className={`text-xs hover:text-sky-500 ${frequency == "5min" && "underline"}`} onClick={() => setUrl(`/market/ohlc/${ticker}/5min/`)}>5min</button>
                    <button className={`text-xs hover:text-sky-500 ${frequency == "15min" && "underline"}`} onClick={() => setUrl(`/market/ohlc/${ticker}/15min/`)}>15min</button>
                    <button className={`text-xs hover:text-sky-500 ${frequency == "30min" && "underline"}`} onClick={() => setUrl(`/market/ohlc/${ticker}/30min/`)}>30min</button>
                    <button className={`text-xs hover:text-sky-500 ${frequency == "1hour" && "underline"}`} onClick={() => setUrl(`/market/ohlc/${ticker}/1hour/`)}>1h</button>
                    <button className={`text-xs hover:text-sky-500 ${frequency == "1day" && "underline"}`} onClick={() => setUrl(`/market/ohlc/${ticker}/1day/`)}>1d</button>
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
