import React, { useEffect, useState ,useContext} from 'react';
import { CounterContext } from '../../contex/adminProvider';

export default function DesignTeamList(props) {
const{selectedteam}=props
  const { team } = useContext(CounterContext);
  const[designTeamList,setdesignTeamList]=useState([])
  const[selectdesignTeam,setselectdesignTeam]=useState()
  useEffect(()=>{
    setdesignTeamList([...designTeamList,selectdesignTeam])
  },[selectdesignTeam])
  console.log(designTeamList)
  return (
      <div>
          {team.filter(val => {
             return val.Team.toLowerCase().includes(selectedteam.toLowerCase())
           }).map((team) =>
        <div className='flex team-list-input'>
        <input className="team-list-select me-1"  type="checkbox" value={team.teamId} onChange={(e)=>setselectdesignTeam(e.target.value)} />
        <div>{team.Username}</div>
        </div>
         )}
       
      </div>
  );
}