import React from 'react';
import ReactEcharts from "echarts-for-react";
export default function Piechart(props) {
  const {newcount,started,inprogress,completed}=props
    //piechart
  const color = [
    "#3fb1e3",
    "#6be6c1",
    "#626c91",
    "#a0a7e6"
  ];
  const pie = {
    tooltip: {
     
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: "Tickets",
        type: "pie",
        radius: "50%",
        center: ["50%", "50%"],
        data: [{ name: "New", value: newcount }, { name: "Started", value: started },{name:"Inprogress",value:inprogress},{name:"Completed",value:completed}],
        color: color
      }
    ]
  };
  
    return (
        <div className='react-piechart'>
             <ReactEcharts option={pie} />
        </div>
    )
}