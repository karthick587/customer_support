import { useState } from "react"
import * as emailjs from "emailjs-com";
export default function Test() {
  const [email,setEmail]=useState()
  const [message,setMessage]=useState()
  const [name,setName]=useState()
const SERVICE_ID="service_56f9av6"
  const TEMPLATE_ID="template_7g9sx6r";
  const USER_ID="user_uy8zZ1SqoqelDq1TAvxL4"
  function handleClick() {
    console.log(email)
    var data = {
      to_email:email,
      message:message,
      to_name:name
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
      function (response) {
        console.log(response.status, response.text);
      },
      function (err) {
        console.log(err);
      }
    );
  }
    return (
      <div className="App">
      <header className="App-header">
      
        <p>
          Enter your email here 
             <input type="email"  onChange={event => setEmail(event.target.value)}/>
             name
             <input type="text"   onChange={event => setName(event.target.value)} />
             message
             <input type="text"   onChange={event => setMessage(event.target.value)} />
          <button type="submit"
          onClick={handleClick}
           >Send mail</button>
        </p>
       
      </header>
    </div>
    )
}
