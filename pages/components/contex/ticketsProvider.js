import {createContext,useState,useEffect} from "react";
import Axios from 'axios';
export const ListContext = createContext();

export default function ListContextProvider(props){
    
   
    return(
        <ListContext.Provider value={{}}>
            {props.children}
        </ListContext.Provider>
    )
    

}