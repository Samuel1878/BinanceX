import { data } from "jquery";
import React from "react";
import { Chart } from "react-google-charts";

export const balances = [
    ["date", "balance"],
    [new Date(2023,8,4), 1500.00],
    [new Date(2023,8,5),4300.00],
    [new Date(2023,8,6),2100.00],
    [new Date(2023,8,7), 6000.05],
    [new Date(2023,8,8), 4500.00],
    [new Date(2023,8,9), 7500.00]
]
export const option = {
    title:"Your portfolio activity",
    hAxis: { title: "Date", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
    animation:{
        duration: 1000,
        easing: 'out',
        startup:true
      },
    legend: { position: "none" },
}

export default function AreaChart(){
    return(<>
    <Chart
        chartType="AreaChart"
        width="700px"
        height="250px"
        data={balances}
        options={option}
        style={{background:"red"}}
        >
    </Chart>
    </>
    )
}