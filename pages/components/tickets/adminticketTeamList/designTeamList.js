import React, { useEffect, useState ,useContext} from 'react';
import { CounterContext } from '../../contex/adminProvider';
import Axios from "axios";
export default function DesignTeamList(props) {
 
  const { addTeammember } = useContext(CounterContext);
const{selectedteam,}=props
const [team, setTeam] = useState([]);
useEffect(() => {
    Axios.get("https://mindmadetech.in/api/team/list")
        .then((res) => setTeam(res.data))
        .catch((err) => { return err; })
});
  return (
      <div>
          {team.filter(val => {
             return val.Team.toLowerCase().includes(selectedteam.toLowerCase())
           }).map((teams) =>
        <div className='flex team-list-input' key={teams.teamId}>
        <button className='team-assign-list'  onClick={()=>addTeammember(teams.teamId)}>{teams.Username}</button>
        </div>
         )}
      </div>
  );
}