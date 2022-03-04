import {createContext,useState,useEffect} from "react";
export const CurrentDateContext = createContext();
export default function CurentDateContextProvider(props){
    var[currentDate,setCurrentDate] = useState('');
    useEffect(()=>{
        var date, TimeType, hour, minutes, seconds, fullTime, dateupadate, monthupadate, yearupadate, fulldate;
    date = new Date();
    hour = date.getHours();
    if (hour <= 11) {
        TimeType = 'AM';
    }
    else {
        TimeType = 'PM';
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    if (hour == 0) {
        hour = 12;
    }
    minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes.toString();
    }
    seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds.toString();
    }
    dateupadate = date.getDate();
    monthupadate = (date.getMonth() + 1);
    yearupadate = date.getFullYear();
    // Adding all the variables in fullTime variable.
    fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();
    fulldate = dateupadate.toString() + '-' + monthupadate.toString() + '-' + yearupadate.toString();
    setCurrentDate(currentDate = fulldate + ' ' + fullTime)
    },[setCurrentDate,currentDate])
    return(
        <CurrentDateContext.Provider value={{
            currentDate
        }}>
            {props.children}
        </CurrentDateContext.Provider>
    )
}