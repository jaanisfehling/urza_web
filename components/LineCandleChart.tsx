"use client";

import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";

function transformOHLCData(data: OHLC): {x: Date, y: number[]}[] {
    const newArray: {x: Date, y: number[]}[] = [];
    Object.values(data)[0].forEach((e) => {
        newArray.push({x: new Date(e.t), y: [e.o, e.h, e.l, e.c]});
    });
    return newArray;
}
function transformLineData(data: OHLC): {x: Date, y: number}[] {
    const newArray: {x: Date, y: number}[] = [];
    Object.values(data)[0].forEach((e) => {
        newArray.push({x: new Date(e.t), y: e.c});
    });
    return newArray;
}

export default function LineCandleChart({data, candles}: {data: OHLC, candles: boolean}) {
    const apexData = {series: [{data: transformOHLCData(data)}]}

    const commonOptions: ApexOptions = {
        chart: {
            zoom: {
                enabled: false,
            },
        },
        title: {
            text: Object.keys(data)[0],
            align: "left",
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    }

    let chart;
    if (candles) {
        chart = <ReactApexChart
                    type="candlestick"
                    series={apexData.series}
                    height="100%"
                    options={{
                        ...commonOptions,
                        chart: {
                            id: "candleChart",
                        },
                    }}
                />
    } else {
        chart = <ReactApexChart
            type="line"
            series={apexData.series}
            height="100%"
            options={{
                ...commonOptions,
                chart: {
                    id: "lineChart",
                },
                stroke: {
                    curve: 'straight'
                },
            }}
        />
    }
    return (
        <>
            {chart}
        </>
    )
}
