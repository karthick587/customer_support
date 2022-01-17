import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import Axios from "axios";
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];



const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function Piechart() {

  var [tickets, setTickets,] = useState([]);
  // useEffect(() => {
  //     Axios.get("https://mindmadetech.in/api/tickets/list")
  //         .then((res) => setTickets(res.data));
  // }, []);
  // const [newcount,setNewcount]=useState()
  const [completedcount,setCompletedcount]=useState()
  const [inprogresscount,setInprogresscount]=useState()
  // useEffect(()=>{
  //   setNewcount(tickets.filter(val => {return val.Status.toLowerCase().includes("new") }).map((ticket) =>setNewcount(ticket.Status.length)).length)
  //   setCompletedcount(tickets.filter(val => {return val.Status.toLowerCase().includes("completed") }).map((ticket) =>setCompletedcount(ticket.Status.length)).length)
  //   setInprogresscount(tickets.filter(val => {return val.Status.toLowerCase().includes("inprogress") }).map((ticket) =>setInprogresscount(ticket.Status.length)).length)
  // })
  // console.log(newcount)
  // console.log(completedcount)
  // console.log(inprogresscount)
  

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
