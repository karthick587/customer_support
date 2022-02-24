import React, { useEffect, useState ,useContext} from 'react';
import { CounterContext } from '../../contex/adminProvider';
import Axios from "axios";
export default function DesignTeamList(props) {
 
  const { addTeammember } = useContext(CounterContext);
const{selectedteam,team}=props
  return (
      <div>
          {team.filter(val => {
             return val.Team.toLowerCase().includes(selectedteam.toLowerCase())
           }).map((team) =>
        <div className='flex team-list-input' key={team.teamId}>
        <button className='team-assign-list'  onClick={()=>addTeammember(team.teamId)}>{team.Username}</button>
        </div>
         )}
      </div>
  );
}