import React, { useEffect, useState } from 'react';


function Test() {
    
    const [email, setEmail] = useState('')
   
    const [checked, setChecked] = useState(false)
    useEffect(()=>{
        if(checked===false){
            setEmail('')
           }
       
    })
    const handleClick = () =>{
         setChecked(!checked)
        }
 
    
console.log(email)
  

    return (
        <div>
          <input onClick={handleClick} checked={checked} value="check" type="checkbox" onChange={(e) => setEmail(e.target.value)}   />
        </div>
    )
}

export default Test