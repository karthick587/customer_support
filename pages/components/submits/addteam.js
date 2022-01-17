import React, { useState ,useEffect } from 'react';
import Axios from "axios";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router'
const schema = yup.object().shape({
    Username: yup.string().required(),
    Password: yup.string().required(),
   
});

function Addteam(props) {
    var [addmember, setAddmember] = useState('');
    var [addteam, setAddteam] = useState('');
    const Router = useRouter()

    //var [show2, setShow2] = useState('');
    const [show, setShow] = React.useState(false);
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;
    //console.log(addteam);
    // const addTeam = ({ Username, Password }) => {
    //     console.log(addteam)
    //     Axios.post(`https://mindmadetech.in/api/team/new`, {
    //         Username: Username,
    //         Password: Password,
    //         Team: addteam
    //     }).then((response) => {
    //         if (response.data.message) {
    //             setShow(response.data.message)
    //         } else {
    //             setShow("Registered Successfully");
    //             Router.reload(window.location.pathname)
    //         }
    //     });
    // }
    console.log(addteam)
    const[login,setLogin]=useState()
  useEffect(()=>{
    setLogin(window.localStorage.getItem('loggedin'))
    console.log(login)
   if(login==="false"){
    router.push("/components/login/login")
   } else if(login === null){
    router.push("/components/login/login")
   }

  })
    return (
        <div>
            <div className="container mainbody">
                <div className="top-btn">
                    <div className='team-dropdown'>
                        <div className='team-list'>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Design" onChange={(e) => setAddteam(e.target.value)} />
                                <label className="form-check-label" >Design</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="server" onChange={(e) => setAddteam(e.target.value)} />
                                <label className="form-check-label" >server</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="development" onChange={(e) => setAddteam(e.target.value)} />
                                <label className="form-check-label" >development</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="SEO" onChange={(e) => setAddteam(e.target.value)} />
                                <label className="form-check-label" >SEO</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="addform">
                    <form>
                        <div className="form-group">
                            <label className="label">Username</label>
                            <input className="form-input" name="Username" type="text" {...register('Username')} />
                            <p className="me-2 text-danger">{errors.Username?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">Password</label>
                            <input className="form-input" name="Password" type="password" {...register('Password')} />
                            <p className="me-2 text-danger">{errors.Password?.message}</p>
                        </div>
                        <div className="row justify-content-center">
                            <div className='bottom-area'>
                                <button type="submit" onClick={handleSubmit(addTeam)} className="btn2 float-end"> Add </button>
                            </div>
                        </div>
                    </form>
                    <h4 className="alert1 text-center">{show}</h4>
                </div>
            </div>
        </div>
    );
}
export default Addteam;
