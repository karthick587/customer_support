import React, { useEffect, useState } from 'react';
import FormDialog from './common/dialogsform';

import ForgetPasswordBody from './utils/forgetPasswordBody';
import axios from 'axios';
function Test() {
  const Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
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



      function Sendmail(){
        Email.send({
            Host : "mindmadetech.in",
            Username : "_mainaccount@mindmadetech.in",
            Password : "1boQ[(6nYw6H.&_hQ&",
            To : 'karthickdurai587@gmail.com',
            From : "karthickraja@mindmade.in",
            Subject : "successs",
            Body : `${<div></div>}`
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