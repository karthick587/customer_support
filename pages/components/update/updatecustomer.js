import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import FormDialog from '../common/dialogsform';
import EditIcon from '@mui/icons-material/Edit';
function Updatecustomer({usersId}) {
    let router = useRouter();
    var[getCustomer,setGetCustomer] = useState([]);
    var[editName,setEditName] = useState('');
    var[editUsername,setEditUsername] = useState('');
    var[editPassword,setEditPassword] = useState('');
    var[editEmail,setEditEmail] = useState('');
    var[editPhonenumber,setEditPhonenumber] = useState('');
    var[show,setShow] = useState('');
    console.log(usersId)
    
useEffect(()=>{
    axios.get(`https://mindmadetech.in/api/customer/list/${usersId}`)
    .then(res=>setGetCustomer(res.data))
},[])

function handleUpdate(Name,Username,Password,Email,Phonenumber){
  
    var UpdatedName,UpdatedUsername,UpdatedPassword,UpdatedEmail,UpdatedPhonenumber;
        switch(editName){
            case "":
                UpdatedName = Name;
                console.log("empty");
                break;
            default:
                UpdatedName = editName;
                console.log("editName");
                break;
        }
                console.log(UpdatedName);

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

        switch(editEmail){
            case "":
                UpdatedEmail = Email;
                console.log("empty");
                break;
            default:
                UpdatedEmail = editEmail;
                console.log("editEmail")
        }
                console.log(UpdatedEmail);

        switch(editPhonenumber){
            case "":
                UpdatedPhonenumber = Phonenumber;
                console.log("empty");
                break;
            default:
                UpdatedPhonenumber = editPhonenumber;
                console.log("editPhonenumber")
        }
                console.log(UpdatedPhonenumber);

                console.log(UpdatedName,UpdatedUsername,UpdatedPassword,UpdatedEmail,UpdatedPhonenumber);

        axios.put(`https://mindmadetech.in/api/customer/update/${usersId}`,{
            id : usersId,
            UpdatedName : UpdatedName,
            UpdatedUsername : UpdatedUsername,
            UpdatedPassword : UpdatedPassword,
            UpdatedEmail : UpdatedEmail,
            UpdatedPhonenumber : UpdatedPhonenumber
        }).then((res)=>{
            setShow("Updated Successfully")
            router.reload(window.location.pathname)
        })

}


return (
                                  <FormDialog
                                                className="float-enduser button"
                                                dialogtitle={<EditIcon />}
                                                dialogbody={ 
                                                <div>
                                                    {getCustomer.map((data)=>
                                                    <div className="container mainbody" key={data.usersId}>
                                                        <div className="addform">
                                                            <form>
                                                               
                                                                 <div className="form-group">
                                                                 <label className="label">Name</label>
                                                                 <input className="form-input" name="Name" type="text" placeholder={data.Name} value={ editName } onChange={(e)=>setEditName(e.target.value)} />
                                                                 
                                                             </div>
                                                                <div className="form-group">
                                                                    <label className="label">Username</label>
                                                                    <input className="form-input" name="Username" type="text" placeholder={data.Username} value={ editUsername } onChange={(e)=>setEditUsername(e.target.value)} />
                                                                    
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col label">Password</label>
                                                                    <input className="form-input" name="Password" type="text" placeholder={data.Password} value={editPassword} onChange={(e)=>setEditPassword(e.target.value)} />
                                                                    
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col label">EMail ID</label>
                                                                    <input className="form-input" name="Email" type="text" placeholder={data.Email} value={editEmail} onChange={(e)=>setEditEmail(e.target.value)} />
                                                                    
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col label">Phone Number</label>
                                                                    <input className="form-input" name="Phonenumber" type="text" placeholder={data.Phonenumber} value={editPhonenumber} onChange={(e)=>setEditPhonenumber(e.target.value)} />
                                                                   
                                                                </div>
                                                                <div className="row justify-content-center">
                                                                    <div className='bottom-area'>
                                                                        <button type="button" onClick={()=>handleUpdate(data.Name,data.Username,data.Password,data.Email,data.Phonenumber)} className="btn2 float-end"> Update </button>
                                                                    </div>
                                                                </div>
                                                                <h3>{show}</h3>
                                                            </form>
                                                           
                                                        </div>
                                                    </div>
                                                    )}
                                                </div>}
                                            />
       
    );
}
export default Updatecustomer;