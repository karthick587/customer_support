import React, { useContext,useState,useEffect } from "react";

import Axios from "axios";
export default function ViewTeam(props){
    const {teamArray,team}=props
    const [teams,setteams]=useState([])
    const [newarray,setnewarray]=useState([])
    useEffect(()=>{
        setteams(team)
        setnewarray(teamArray.map((product)=>[...newarray,product.teamId] )) 
    },[setnewarray,teamArray])
  
    return(
        <div className="">
        {teams.filter(val => { 
             for (let i = 0; i <= 20; i++) {
            return val.teamId.toString().includes(newarray[i])
             } 
         }).map((product) =>
                                 <div className=" " key={product.teamId}>
                                     <div>{product.Username},</div>
                                </div>
                             )}
     </div>
    )
}