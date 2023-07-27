import {useState} from "react";
import Chart from "@/components/Chart";

export default function ChartContainer({data}: {data: OHLC[]}) {
    const [candles, setCandles] = useState(true);

    return (
        <div className="flex flex-col p-2 border-2 rounded-sm border-gray-400 dark:border-gray-700">
            <Chart data={data} candles={candles}/>
            <div className="">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={true} onChange={() => setCandles(!candles)}/>
                    <div className="w-7 h-4 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-400"></div>
                    <span className="ml-1 text-xs font-light">Candles</span>
                </label>
            </div>
        </div>
    )
}