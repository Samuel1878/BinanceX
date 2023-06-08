import { Chart } from "react-google-charts";
import React, { useEffect } from "react";
import {socket, socketSpot} from "../API/WebSocket"
import { Loader } from "../components/loader";
import getCandleHistory from "./candleBook";
export const data = [
    ["Day", "", "", "", ""],
    ["Mon", 20, 28, 38, 45],
    ["Tue", 31, 38, 55, 66],
    ["Wed", 50, 55, 77, 80],
    ["Thu", 77, 77, 66, 50],
    ["Fri", 68, 66, 22, 15],
  ];
  
export const options = {
    legend: "none",
    bar: { groupWidth: "100%" }, // Remove space between bars.
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
      risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
    },
    backgroundColor: "transparent"
  };


const CandleStickChart = (params) => {
    useEffect(()=>{
        getCandleHistory();
    },[])
   

    socketSpot.off("kline").on("kline", (data)=>{
        console.log(data);
    });

    return(<Chart
                chartType="CandlestickChart"
                width="100%"
                height="450px"
                data={data}
                loader={<Loader/>}
                options={options} />
    )
}
export default CandleStickChart;