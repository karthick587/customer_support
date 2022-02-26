import React, { useContext,useState,useEffect } from "react";

import Axios from "axios";
export default function ViewTeam(props){
    const {teamArray}=props
    const [team, setTeam] = useState([]);
    const [newarray,setnewarray]=useState([])
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/team/list")
            .then((res) => setTeam(res.data))
            .catch((err) => { return err; })
           
    });
    useEffect(()=>{
        setnewarray(teamArray.map((product)=>[...newarray,product.teamId] )) 
    },[])
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