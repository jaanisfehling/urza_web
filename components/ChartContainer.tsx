import {useState} from "react";
import Chart from "@/components/LineCandleChart";

export default function ChartContainer({data}: {data: OHLC}) {
    const [chartType, setChartType] = useState<"candlestick" | "line">("candlestick");

    return (
        <div className="flex flex-col justify-between overflow-auto h-full w-full px-2 border-2 rounded-sm border-gray-400 dark:border-gray-700">
            <div className="h-full w-full">
                <Chart data={data} chartType={chartType}/>
            </div>
            <div className="">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={true} onChange={() => setChartType(prevState => (prevState == "line") ? "candlestick" : "line")}/>
                    <div className="w-7 h-4 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-400"></div>
                    <span className="ml-1 text-xs font-light text-black dark:text-white">Candles</span>
                </label>
            </div>
        </div>
    )
}
