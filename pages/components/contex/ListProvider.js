import {createContext,useState,useEffect} from "react";
import Axios from 'axios';
export const ListContext = createContext();

export default function ListContextProvider(props){
    var [users, setUsers] = useState([]);
    var [team, setTeam] = useState([]);
    const [teamcount, setteamcount] = useState();
    
    useEffect(()=>{
        Axios.get("https://mindmadetech.in/api/customer/list")
        .then((res) => {
            setUsers(res.data);
        }).catch((err) => { return err; })
}, []);

useEffect(() => {
    Axios.get("https://mindmadetech.in/api/team/list")
        .then((res) => {
            setTeam(res.data);
        }).catch((err) => { return err; })
}, []);

useEffect(() => {
    setteamcount(team.filter(val => { return val.Isdeleted.toLowerCase().includes("n") }).map((teams)=> setteamcount(teams.Status)).length);
},[team]);
   
    return(
        <ListContext.Provider value={{users,team,teamcount}}>
            {props.children}
        </ListContext.Provider>
    )
    

}