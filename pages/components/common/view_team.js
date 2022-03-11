import React, { useState,useEffect,useContext } from "react";
import { ListContext } from '../contex/ListProvider';
export default function ViewTeam(props){
    const {teamArray}=props
    const { team } = useContext(ListContext);
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
                <div>{product.Email},</div>
            </div>
        )}</div>:
            <div></div>
        }
     </div>
    )
}