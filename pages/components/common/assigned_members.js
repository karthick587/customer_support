import React, { useContext,useState } from "react";
import { CounterContext } from "../contex/adminProvider";
export default function AssignedMenber(props){
    const{removeTeammember,designTeamList}=useContext(CounterContext)
   const {team}=props
   const [teams,setTeams]=useState(team)
    return(
        <div className="mt-3 row">
          {teams.filter(val => {
                                    for (let i = 0; i <= 20; i++) {
                                        if (val.teamId === designTeamList[i]) {
                                            return val;
                                        }
                                      
                                      
                                    }
                                }).map((product) =>
                                    <div className="assignTeam-m me-1 col " key={product.teamId}>
                                        <div>{product.Username}</div> <button className="removeTeammember" onClick={()=>removeTeammember(product.teamId)}>X</button>
                                   </div>
                                )}
        </div>
    )
}