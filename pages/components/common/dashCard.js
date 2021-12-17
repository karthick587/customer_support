import React from 'react';


export default function Dashcard(props){
  
 
 return(
  
    <div className='col card-1' >
       <div className='card-left'>
           <h3>{props.cardHead}</h3>
           <div className='ticket-no'>
               {props.cardbody}
           </div>
           <div className='lastlticket'>
               {props.cardfooter}
            </div>
       </div>
       <div className='card-right'>
           <div className='card-logo'>
           {props.cardIcon}
           </div>
     </div>
  </div>

       
  )
}