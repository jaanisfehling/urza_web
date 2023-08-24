import {createChart, ColorType, UTCTimestamp} from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import {undefined} from "zod";

export default function Chart({data, chartType, height}: {data: OHLC, chartType: "candlestick" | "line", height: number | undefined}) {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            function handleResize() {chart.applyOptions({width: chartContainerRef?.current?.clientWidth})}

            const chart = createChart(chartContainerRef?.current || "", {
                width: chartContainerRef?.current?.clientWidth,
                height: height,
                layout: {
                    textColor: window.matchMedia('(prefers-color-scheme: dark)').matches ? "white" : "black",
                    background: {
                        color: "rgba(0,0,0,0)"
                    }
                }
            });
            chart.timeScale().fitContent();

            if (chartType == "candlestick") {
                const newSeries = chart.addCandlestickSeries({});
                newSeries.setData(data.map((e) => { // @ts-ignore
                    e.time = new Date(e.time).getTime(); return e;}).reverse()
                );
            } else {
                const newSeries = chart.addLineSeries({
                    color: (data[0].close > data[data.length-1].close) ? "#00ff00" : "#ff0000"
                });
                // @ts-ignore
                newSeries.setData(data.map((e) => {
                    return {value: e.close, time: new Date(e.time).getTime()}}).reverse()
                );
            }

            window.addEventListener("resize", handleResize);
            return () => {window.removeEventListener("resize", handleResize); chart.remove();};
        }, [data, chartType]);

    return (
        <div ref={chartContainerRef}/>
    );
}
