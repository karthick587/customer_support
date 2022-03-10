import React, { useEffect, useState } from 'react';
import FormDialog from './common/dialogsform';
import { renderEmail } from 'react-html-email'
import Email from './utils/email';
import axios from 'axios';
import ForgetPasswordBody from './utils/forgetPasswordBody';
function Test() {
  
    // function Sendmail() {
    //     axios.post(`https://mindmadetech.in/api/login/validate`, {
    //         Email: "customer2@gmail.com",
    //         Password: "123456",
    //     }).then((response) => {
    //         if(response.data.statusCode===200){
    //             alert(`success ${response.data.type}`)
    //         }else{
    //             alert("fail")
    //         }
         

    //     }).catch((err) => {
          
    //        return err
    //     })
    // }

  const messageHtml =  renderEmail(<ForgetPasswordBody name="karthick" />)
      function Sendmail(){
        Email.send({
            Host : "mindmadetech.in",
            Username : "_mainaccount@mindmadetech.in",
            Password : "1boQ[(6nYw6H.&_hQ&",
            To : 'karthickdurai587@gmail.com',
            From : "karthickraja@mindmade.in",
            Subject : "successs",
            Body : messageHtml
        }).then(
          message => alert(message)&console.log(message)
        );
      }



    return (
        <div>
            <FormDialog dialogtitle="button1" dialogbody={<h1>button1 opened</h1>} />
            <FormDialog dialogtitle="button2" dialogbody={<h1>button2 opened</h1>} />
            <button onClick={Sendmail}>Send mail</button>
        </div>
    )
}

export default Test