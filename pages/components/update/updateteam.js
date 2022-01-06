import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from '../common/dialogsform';
function Updateteam({teamId}) {
    let router = useRouter();
    var[getTeam,setGetTeam] = useState([]);
    var[editUsername,setEditUsername] = useState('');
    var[editPassword,setEditPassword] = useState('');
    var[editTeam,setEditTeam] = useState('');
    var[show,setShow] = useState('');
    console.log(teamId)
    
useEffect(()=>{
    axios.get(`https://mindmadetech.in/api/team/list/${teamId}`)
    .then(res=>setGetTeam(res.data))
},[])

function handleUpdate(Username,Password,Team){
  
    var UpdatedUsername,UpdatedPassword,UpdatedTeam;

        switch(editUsername){
            case "":
                UpdatedUsername = Username;
                console.log("empty");
                break;
            default:
                UpdatedUsername = editUsername;
                console.log("editUsername")
        }
                console.log(UpdatedUsername);

        switch(editPassword){
            case "":
                UpdatedPassword = Password;
                console.log("empty");
                break;
            default:
                UpdatedPassword = editPassword;
                console.log("editPassword")
        }
                console.log(UpdatedPassword);

        switch(editTeam){
            case "":
                UpdatedTeam = Team;
                console.log("empty");
                break;
            default:
                UpdatedTeam = editTeam;
                console.log("editTeam")
        }
                console.log(UpdatedTeam);

                console.log(UpdatedUsername,UpdatedPassword,UpdatedTeam);

        axios.put(`https://mindmadetech.in/api/team/update/${teamId}`,{
            UpdatedUsername : UpdatedUsername,
            UpdatedPassword : UpdatedPassword,
            UpdatedTeam : UpdatedTeam,
        }).then((res)=>{
            setShow("Updated Successfully")
            router.reload(window.location.pathname)
        })

}


return (
    <FormDialog
    className=""
    dialogtitle={<EditIcon />}
    dialogbody={ 
        <div>
            {getTeam.map((data)=>
            <div className="container mainbody" key={data.teamId}>
                <div className="addform">
                    <form>
                        <div className="form-group">
                            <label className="label">Username</label>
                            <input className="form-input" name="Username" type="text" placeholder={data.Username} value={ editUsername } onChange={(e)=>setEditUsername(e.target.value)} />
                            
                        </div>
                        <div className="form-group">
                            <label className="col label">Password</label>
                            <input className="form-input" name="Password" type="text" placeholder={data.Password} value={editPassword} onChange={(e)=>setEditPassword(e.target.value)} />
                            
                        </div>
                        <div>
                        <div className="form-group">
                        <label className="col label">Team</label>
                            <select className='form-input' defaultChecked={data.Team} value={editTeam} onChange={(e)=>setEditTeam(e.target.value)}>
                                <option>Design</option>
                                <option>Development</option>
                                <option>Server</option>
                                <option>SEO</option>
                            </select>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className='bottom-area'>
                                <button type="button" onClick={()=>handleUpdate(data.Username,data.Password,data.Team)} className="btn2 float-end"> Update </button>
                            </div>
                        </div>
                        <h3>{show}</h3>
                    </form>
                   
                </div>
            </div>
            )}
        </div>
        }
           />
    );
}
export default Updateteam;