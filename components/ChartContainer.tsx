import {useEffect, useRef, useState} from "react";
import Chart from "@/components/Chart";
import useFetch from "@/hooks/useFetch";
import Errors from "@/components/Errors";

export default function ChartContainer({ticker}: {ticker: string}) {
    // @ts-ignore
    const [chartType, setChartType] = useState<"candlestick" | "line">(localStorage.getItem("chartType")||"candlestick");
    const parentChartRef = useRef<HTMLDivElement>(null);
    const [url, setUrl] = useState<string>(`/market/ohlc/${ticker}/`);
    const [queryParams, setQueryParams] = useState<{frequency: string, timespan: string}>({frequency: "1min", timespan: "1H"});
    const {result, errors} = useFetch<OHLC>("GET", url, undefined, queryParams);

    useEffect(() => {
        setUrl(`/market/ohlc/${ticker}/`);
    }, [ticker]);

    function handleChartTypeChange() {
        const newChartType = (chartType == "candlestick") ? "line" : "candlestick";
        setChartType(newChartType);
        localStorage.setItem("chartType", newChartType)
        if (queryParams.timespan == "1D") {
            setQueryParams({frequency: (newChartType == "candlestick") ? "5min" : "1min", timespan: "1D"});
        } else if (queryParams.timespan == "1W") {
            setQueryParams({frequency: (newChartType == "candlestick") ? "30min" : "5min", timespan: "1W"});
        } else if (queryParams.timespan == "1M") {
            setQueryParams({frequency: (newChartType == "candlestick") ? "1hour" : "15min", timespan: "1M"});
        }
    }

    return (
        <div className="relative flex-col h-full w-full border-2 rounded-sm border-gray-400 dark:border-gray-700">
            <div className="absolute top-0 h-full w-full overflow-auto" ref={parentChartRef}>
                <Errors errors={errors}/>
                {result && <Chart data={result} chartType={chartType} height={parentChartRef?.current?.clientHeight}/>}
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between space-x-2 z-10 p-2 bg-white dark:bg-black">
                <div className="flex space-x-2">
                    <button className={`text-xs hover:text-sky-500 ${queryParams.timespan == "1H" && "underline"}`} onClick={() => setQueryParams({frequency: "1min", timespan: "1H"})}>1H</button>
                    <button className={`text-xs hover:text-sky-500 ${queryParams.timespan == "1D" && "underline"}`} onClick={() => setQueryParams({frequency: (chartType == "candlestick") ? "5min" : "1min", timespan: "1D"})}>1D</button>
                    <button className={`text-xs hover:text-sky-500 ${queryParams.timespan == "1W" && "underline"}`} onClick={() => setQueryParams({frequency: (chartType == "candlestick") ? "30min" : "5min", timespan: "1W"})}>1W</button>
                    <button className={`text-xs hover:text-sky-500 ${queryParams.timespan == "1M" && "underline"}`} onClick={() => setQueryParams({frequency: (chartType == "candlestick") ? "1hour" : "15min", timespan: "1M"})}>1M</button>
                    <button className={`text-xs hover:text-sky-500 ${queryParams.timespan == "1Y" && "underline"}`} onClick={() => setQueryParams({frequency: "1day", timespan: "1Y"})}>1Y</button>
                    <button className={`text-xs hover:text-sky-500 ${queryParams.timespan == "Max" && "underline"}`} onClick={() => setQueryParams({frequency: "1day", timespan: "Max"})}>Max</button>
                </div>
                <div className="flex space-x-2">
                    <button className={`text-xs hover:text-sky-500 ${queryParams.frequency == "1min" && "underline"}`} onClick={() => setQueryParams(prevState => {return {frequency: "1min", timespan: prevState.timespan}})}>1min</button>
                    <button className={`text-xs hover:text-sky-500 ${queryParams.frequency == "5min" && "underline"}`} onClick={() => setQueryParams(prevState => {return {frequency: "5min", timespan: prevState.timespan}})}>5min</button>
                    <button className={`text-xs hover:text-sky-500 ${queryParams.frequency == "15min" && "underline"}`} onClick={() => setQueryParams(prevState => {return {frequency: "15min", timespan: prevState.timespan}})}>15min</button>
                    <button className={`text-xs hover:text-sky-500 ${queryParams.frequency == "30min" && "underline"}`} onClick={() => setQueryParams(prevState => {return {frequency: "30min", timespan: prevState.timespan}})}>30min</button>
                    <button className={`text-xs hover:text-sky-500 ${queryParams.frequency == "1hour" && "underline"}`} onClick={() => setQueryParams(prevState => {return {frequency: "1hour", timespan: prevState.timespan}})}>1hour</button>
                    <button className={`text-xs hover:text-sky-500 ${queryParams.frequency == "1day" && "underline"}`} onClick={() => setQueryParams(prevState => {return {frequency: "1day", timespan: prevState.timespan}})}>1day</button>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={chartType == "candlestick"} onChange={handleChartTypeChange}/>
                    <div className="w-7 h-4 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[5.49px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-400"></div>
                    <span className="ml-1 text-xs font-light">Candles</span>
                </label>
            </div>
        </div>
    )
}
