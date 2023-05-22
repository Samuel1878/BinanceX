
import React from "react";
import {AreaChart, Area,XAxis,YAxis, CartesianGrid,Tooltip, ResponsiveContainer} from "recharts";
import millify from "millify";

const data = [
  {
    month: "Jan",
    assest: 3000.00,
    amt: 2400
  },
  {
    month: "Feb",
    assest: 8000.04,
    amt: 2210
  },
  {
    month: "March",
    assest: 2000.00,
    amt: 2290
  },
  {
    month: "April",
    assest: 480.00,
    amt: 2000
  },
  {
    month: "May",
    assest: 3000.00,
    amt: 2181
  },
  {
    month: "June",
    assest: 1000.00,
    amt: 2500
  },
  {
    month: "Jully",
    assest: 8000.04,
    amt: 2100
  }
];

export default function Linechart() {
  return (
    <>
    <ResponsiveContainer minWidth={700} height={160}>
        <AreaChart data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
            <linearGradient id="colorassest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FBCD29" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="rgb(90,80,48)" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <XAxis dataKey="month" axisLine={false}  padding={{right:25,left:25}} allowDecimals="true"/>
        <YAxis type="number" dataKey="assest" axisLine={false} padding={{top:25,bottom:25}}/>
        <Tooltip />
        <Area type="monotone" 
            dataKey="assest" 
            stroke="#FBCD29" 
            fillOpacity={1}         
            fill="url(#colorassest)" />
    </AreaChart>
    </ResponsiveContainer>
    </>
    
  );
}
