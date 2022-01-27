import React,{useContext} from 'react';
import ReactEcharts from "echarts-for-react";
import { CounterContext } from '../contex/adminProvider'
export default function Piechart() {
    const {adminNewcount,adminStartedcount,adminprogresscount,adminCompletedcount} = useContext(CounterContext);
    //piechart
  const color = [
    "#3fb1e3",
    "#6be6c1",
    "#626c91",
    "#a0a7e6"
  ];
  const pie = {
   
    series: [
      {
        name: "pie",
        type: "pie",
        radius: "50%",
        center: ["50%", "60%"],
        data: [{ name: "New", value: adminNewcount }, { name: "Start", value: adminStartedcount },{name:"Inprogress",value:adminprogresscount},{name:"Completed",value:adminCompletedcount}],
        color: color
      }
    ]
  };
  
    return (
        <div>
             <ReactEcharts option={pie} />
        </div>
    )
}