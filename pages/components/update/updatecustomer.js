import React, { useEffect, useState, createRef, useContext } from 'react';
import axios from 'axios';
import FormDialog from '../common/dialogsform';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { CounterContext } from '../contex/adminProvider';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CircularProgress } from '@mui/material';
function Updatecustomer({ usersId }) {

    const { setdialogformopen, setTesting, setshowvalue } = useContext(CounterContext);
    var [getCustomer, setGetCustomer] = useState([]);
    const [show5, setshow5] = useState(false);
    const [loader, setloader] = useState(false);
    const [Createdby, setCreatedby] = useState();
    var [show,setShow] = useState('');
    let CompanynameR = createRef();
    let ClientnameR = createRef();
    let PasswordR = createRef();
    let EmailR = createRef();
    let PhonenumberR = createRef();

    useEffect(() => {
        setCreatedby(window.localStorage.getItem('user'));
    }, [Createdby]);

    useEffect(() => {
        axios.get(`https://mindmadetech.in/api/customer/list/${usersId}`)
            .then(res => setGetCustomer(res.data))
            .catch((err) => { return err; })
    }, [setGetCustomer]);


    const handleUpdate = () => {
        setloader(true);
        const EmailValidate = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        var Companyname, Clientname, Password, Email, Phonenumber;
        Companyname = CompanynameR.current.value;
        Clientname = ClientnameR.current.value;
        Password = PasswordR.current.value;
        Email = EmailR.current.value;
        Phonenumber = PhonenumberR.current.value;
        
        if(Companyname!=="" && Clientname!=="" && Password!=="" && Password.length >5 && Email!=="" && Phonenumber!==""){
            if(!EmailValidate.test(String(Email).toLowerCase())){
                setShow("Invalid Email");
                setloader(false);
            }else{
                const data = new FormData();
                data.append("Companyname", Companyname);
                data.append("Clientname", Clientname);
                data.append("Email", Email);
                data.append("Phonenumber", Phonenumber);
                data.append("Password", Password);
                data.append("ModifiedOn", moment(new Date()).format('DD-MM-YYYY hh:mm A'));
                data.append("ModifiedBy", Createdby)
                axios.put(`https://mindmadetech.in/api/customer/update/${usersId}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then((res) => {
                    if(res.data.message === "Email already Exists!"){
                        setShow(res.data.message);
                        setloader(false);
                    }else{
                        setdialogformopen("true");
                        setTesting(true)
                        setshowvalue("Updated Successfully");
                        setloader(false);
                    }
                }).catch((err) => {
                    setTesting(true)
                    setshowvalue(1 + "Failed to Update");
                    setloader(false);
                })
            }
        }else if(Password.length < 6){
            setShow("Password mush be 6 char long");
            setloader(false);
        }else if(Companyname==="" || Clientname==="" || Password==="" || Email==="" || Phonenumber===""){
                setShow("all fields are required");
                setloader(false);
        }      
    };

    return (
        <FormDialog
            className="float-enduser button"
            dialogtitle={<EditIcon />}
            dialogbody={
                <div>
                    {getCustomer.map((data) =>
                        <div className="container mainbody" key={data.usersId}>
                            <div className="addform">
                                <form>
                                    <div className="form-group">
                                        <label className="label"> Company Name<span>*</span></label>
                                        <input className="form-input" name="Name" type="text" ref={CompanynameR} defaultValue={data.Companyname} />
                                    </div>
                                    <div className="form-group">
                                        <label className="label"> Client Name<span>*</span></label>
                                        <input className="form-input" name="Name" type="text" ref={ClientnameR} defaultValue={data.Clientname} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Email ID<span>*</span></label>
                                        <input className="form-input" name="Email" type="text" ref={EmailR} defaultValue={data.Email} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Phonenumber<span>*</span></label>
                                        <input className="form-input" name="Phonenumber" type="text" ref={PhonenumberR} defaultValue={data.Phonenumber} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Password<span>*</span></label>
                                        <div className='login-input-password'>
                                            <input className="form-input" type={show5 === true ? "text" : "password"} name='Password' ref={PasswordR} defaultValue={data.Password} />
                                            <Button className='login-password-i' onClick={() => setshow5(!show5)}>{!show5 ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}</Button>
                                        </div>
                                        <p className="me-2 text-danger">{show}</p>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className='bottom-area'>
                                        {loader === false ? <><button type="button"  onClick={handleUpdate} className="btn2 float-end"> Update </button></> : <> <CircularProgress className="float-end" size={25} /></>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>}
        />
    );
}
export default Updatecustomer;