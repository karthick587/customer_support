import React, { useContext,useState,useEffect } from "react";

import Axios from "axios";
export default function ViewTeam(props){
    const {teamArray,team}=props
   
    const [newarray,setnewarray]=useState([])
    useEffect(()=>{
        setnewarray(teamArray.map((product)=>[...newarray,product.teamId] )) 
    },[setnewarray])
    console.log(newarray)
    return(
        <div className="row">
        {team.filter(val => {
                                 for (let i = 0; i <= 20; i++) {
                                     if (val.teamId === newarray[i]) {
                                         return val; 
                                     }                                                            
                                 }
                             }).map((product) =>
                                 <div className=" col " key={product.teamId}>
                                     <div>{product.Username}</div>
                                </div>
                             )}
     </div>
    )
}