import React, { useState } from 'react';
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown ,faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router'
const schema = yup.object().shape({
    Name: yup.string().required(),
    Username: yup.string().required(),
    Password: yup.string().required(),
});
function Adduser(props) {
    var [addmember, setAddmember] = useState('');
    var [addteam, setAddteam] = useState('');
    const Router = useRouter()
    var [show2, setShow2] = useState('');
    const [show, setShow] = React.useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;
    const addUser = ({ Name, Username, Password }) => {
        Axios.post(`https://mindmadetech.in/${addmember}`, {
            Name: Name,
            Username: Username,
            Password: Password,
        }).then((response) => {
            if (response.data.message) {
                setShow(response.data.message)
            } else {
                setShow("Registered Successfully");
                Router.reload(window.location.pathname)
            }
        });
    }
    
    const toggling = () =>{  
        setIsOpen(!isOpen)
        setShow2(!show2);
    }
   
     ;

    return (
        <div>
            <div className="container mainbody">
                <div className="top-btn">
                    <div class="">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="customernew" onChange={(e) => setAddmember(e.target.value)} />
                        <label class="form-check-label" for="flexRadioDefault1">
                            client
                        </label>
                    </div>
                    <div className='team-dropdown'> 
        <button onClick={toggling}>
            team{show2 ? <FontAwesomeIcon icon={faCaretRight} /> : <FontAwesomeIcon icon={faCaretDown} /> }
        </button>
        {isOpen && (
         
            <div className='team-list'>
              <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Design" onChange={(e) => setAddteam(e.target.value)} />
                        <label class="form-check-label" for="flexRadioDefault1">
                        Design
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="server" onChange={(e) => setAddteam(e.target.value)} />
                        <label class="form-check-label" for="flexRadioDefault1">
                        server
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="development" onChange={(e) => setAddteam(e.target.value)} />
                        <label class="form-check-label" for="flexRadioDefault1">
                        development
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="SEO" onChange={(e) => setAddteam(e.target.value)} />
                        <label class="form-check-label" for="flexRadioDefault1">
                        SEO
                        </label>
                    </div>
            </div>
          
        )}
      </div>
                </div>
                <div className="addform">
                    <form>
                        <div className="form-group">
                            <label className="label">Name</label>
                            <input className="form-input" name="Name" type="text" {...register('Name')} />
                            <p className="me-2 text-danger">{errors.Name?.message}</p>
                        </div>
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
                                <button type="submit" onClick={handleSubmit(addUser)} className="btn2 float-end"> Add {addmember}</button>
                            </div>
                        </div>
                    </form>
                    <h4 className="alert1 text-center">{show}</h4>
                </div>
            </div>
        </div>
    );
}
export default Adduser;