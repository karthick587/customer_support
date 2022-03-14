import { createContext, useState, useEffect } from "react";
import Axios from 'axios';

export const TicketsContext = createContext();

export default function TicketsContextProvider(props) {
    var [tickets, setTickets] = useState([]);
    const[selectedValue,setSelectedValue]=useState([]);
    //To get tickets list
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => {
                setTickets(res.data);
            })
            .catch((err) => { return err; })
    },[tickets]);
    return (
        <TicketsContext.Provider value={{ tickets }}>
            {props.children}
        </TicketsContext.Provider>
    );
};