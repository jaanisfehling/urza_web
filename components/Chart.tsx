"use client";

import {VictoryAxis, VictoryCandlestick, VictoryChart, VictoryLine} from "victory";
import React, {useState} from "react";


export default function Chart({data, candles}: {data: OHLC[], candles: boolean}) {
    let chart;
    if (candles) {
        chart = <VictoryCandlestick
            candleColors={{positive: "#00ff00", negative: "#ff0000"}}
            data={data}
            style={{
                data: {
                    stroke: d => (d.c > d.o ? "#ff0000" : "#00ff00"),
                    strokeWidth: 1
                }}}
            x="t"/>
    } else {
        chart = <VictoryLine
            data={data}
            style={{
                data: {
                    stroke: data[0].c > data[data.length - 1].c ? "#ff0000" : "#00ff00",
                    strokeWidth: 2
                }}}
            x="t"
            y="close"/>
    }

    return (
        <VictoryChart
            domainPadding={{x: 0, y: 0}}
            padding={{top: 5, bottom: 5, right: 5, left: 5}}>
            <VictoryAxis style={{
                axis: {stroke: "transparent"},
                ticks: {stroke: "transparent"},
                tickLabels: {fill: "transparent"}}}/>
            <VictoryAxis dependentAxis style={{
                axis: {stroke: "transparent"},
                ticks: {stroke: "transparent"},
                tickLabels: {fill: "transparent"}}}/>
            {chart}
        </VictoryChart>
    )
}
