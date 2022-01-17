
import React from 'react';
import { useRouter } from 'next/router';

export default function Login1() {
  
  const router = useRouter();
function handleSubmit(){
  router.push("../components/dash/admindashboard")
}
  return (
    <div className="login-page">
      <Head>
        <title>userlogin</title>
      </Head>
      <div >
        <div className="login-body">
          <div className="left-body">
            <div className="form login">
              <div className='sublogin'>
              <div className='login-header'>
                <h1>Login</h1>
              </div>
              <form>
            
               
         
                <div className="form-group log">
                  <button className="btn" type="submit" onClick={handleSubmit}><a className="nav-link">Login</a></button>
                </div>
               
              </form>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}
