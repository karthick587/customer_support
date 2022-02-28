import React, { useState,useEffect } from "react";

import Axios from "axios";
export default function ViewTeam(props){
    const {teamArray,team}=props
  
    const [newarray,setnewarray]=useState([])
    useEffect(()=>{
       var TeamList = [...newarray]
       if(teamArray !== undefined){
        teamArray.map((product)=>{
            TeamList.push(product.teamId)
        })
        setnewarray(TeamList)
       }  
    },[setnewarray,teamArray])
    
    return(
        <div className="">
        { newarray !== undefined&&team !== undefined ?<div> {team.filter(val => { 
            if(newarray.includes(val.teamId)){
                return val
            }
        }).map((product) =>
            <div className=" " key={product.teamId}>
                <div>{product.Username},</div>
            </div>
        )}</div>:
            <div></div>
        }
     </div>
    )
}