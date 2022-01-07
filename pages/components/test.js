import { useState } from "react"
export default function Test() {
   var[open,setOpen]=useState()
   function show(){
    setOpen(!open)
   }
    return (
        <div>
            
                <button type="submit" onClick={show} >button</button>
                 { open ? <>hello</> : <div>
hello karthick
</div>} 
<div>
                                  <div className='dash-status'>
                                    <div>New</div>
                                    <div></div>
                                  </div>
                                  <div className='dash-status'>
                                    <div>InProgress</div>
                                    <div></div>
                                  </div>
                                  <div className='dash-status'>
                                    <div>completed</div>
                                    <div></div>
                                  </div>
                                </div>
        </div>
    )
}
