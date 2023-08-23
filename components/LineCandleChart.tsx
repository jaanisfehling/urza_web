import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {useEffect, useState} from "react";

type ApexOHLC = {x: Date, y: number[]}[]
type ApexLine = {x: Date, y: number}[]

function transformOHLCData(data: OHLC): ApexOHLC {
    const newArray: {x: Date, y: number[]}[] = [];
    data.forEach((e) => {
        newArray.push({x: new Date(e.t), y: [e.open, e.high, e.low, e.close]});
    });
    return newArray;
}
function transformLineData(data: OHLC): ApexLine {
    const newArray: {x: Date, y: number}[] = [];
    data.forEach((e) => {
        newArray.push({x: new Date(e.t), y: e.close});
    });
    return newArray;
}

export default function LineCandleChart({data, chartType}: {data: OHLC, chartType: "candlestick" | "line"}) {
    const [chartData, setChartData] = useState<[{data: ApexOHLC | ApexLine}]>();
    const [lineColor, setLineColor] = useState("#00ff00");

    useEffect(() => {
        const transformedData = (chartType == "candlestick") ? transformOHLCData(data) : transformLineData(data);
        setChartData([{data: transformedData}]);
    }, [data, chartType]);

    useEffect(() => {
        if (chartType == "line" && chartData && chartData[0].data[0].y > chartData[0].data[chartData[0].data.length - 1].y) {
            setLineColor("#ff0000");
        }
    }, [chartData, chartType]);

    const commonOptions: ApexOptions = {
        chart: {
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
                tools: {
                    download: false,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                },
            },
            background: "rgba(0, 0, 0, .0)"
        },
        title: {
            text: Object.keys(data)[0],
            align: "center",
        },
        xaxis: {
            type: "category",
            labels: {
                formatter: (val) => {return "date"}
            }
        },
        yaxis: {
            tooltip: {
                enabled: false,
            },
        },
        theme: {
            mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
        },
        colors: [lineColor],
    }

    if (chartData) {
        return (
            <ReactApexChart
                key={chartType}
                type={chartType}
                series={chartData}
                height="100%"
                options={{
                    ...commonOptions,
                    stroke: {
                        curve: "straight",
                        width: 1.5
                    },
                }}
            />
        )
    } else {
        return(
            <></>
        )
    }
}
