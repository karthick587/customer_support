import React, { useEffect, useState, createRef, useContext } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import FormDialog from '../common/dialogsform';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { CounterContext } from '../contex/adminProvider';
import { CurrentDateContext } from '../contex/currentdateProvider';
import moment from 'moment';
function Updatecustomer({ usersId }) {

    const { setdialogformopen, setTesting, setshowvalue } = useContext(CounterContext);
    const { currentDate } = useContext(CurrentDateContext);
    var [getCustomer, setGetCustomer] = useState([]);
    const [editLogo, setEditLogo] = useState();
    const [uploadLogo, setUploadLogo] = useState();
    const [selected, setSelected] = useState(false);
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


    const handleUpdate = (Logo) => {
        const EmailValidate = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        var Logo, Companyname, Clientname, Password, Email, Phonenumber;
        Companyname = CompanynameR.current.value;
        Clientname = ClientnameR.current.value;
        Password = PasswordR.current.value;
        Email = EmailR.current.value;
        Phonenumber = PhonenumberR.current.value;

        switch (editLogo) {
            case undefined:
                Logo = Logo;
                console.log("empty");
                break;
            default:
                Logo = editLogo;
                console.log("editLogo");
                break;
        }
        
        if(Companyname!=="" && Clientname!=="" && Password!=="" && Password.length >5 && Email!=="" && Phonenumber!==""){
            if(!EmailValidate.test(String(Email).toLowerCase())){
                setShow("Invalid Email")
            }else{
                const data = new FormData();
                data.append("Companyname", Companyname);
                data.append("Clientname", Clientname);
                data.append("Email", Email);
                data.append("Phonenumber", Phonenumber);
                data.append("Password", Password);
                if (editLogo) {
                    data.append("file", Logo);
                } else {
                    data.append("Logo", Logo);
                }
                data.append("ModifiedOn", moment(new Date()).format('DD-MM-YYYY hh:mm A'));
                data.append("ModifiedBy", Createdby)
                axios.put(`https://mindmadetech.in/api/customer/update/${usersId}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then((res) => {
                    if(res.data.message === "Email already Exists!"){
                        setShow(res.data.message);
                    }else{
                        setdialogformopen("true");
                        setTesting(true)
                        setshowvalue("Updated Successfully");
                    }
                }).catch((err) => {
                    setTesting(true)
                    setshowvalue(1 + "Failed to Update");
                })
            }
        }else if(Password.length < 6){
            setShow("Password mush be 6 char long");
        }else if(Companyname==="" || Clientname==="" || Password==="" || Email==="" || Phonenumber===""){
                setShow("all fields are required");
        }      
    };
    function handleScreenshot(e) {
        setEditLogo(e.target.files[0]);
        setSelected(true);
        setUploadLogo(URL.createObjectURL(e.target.files[0]));
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
                                    <div className="form-group upload">
                                        <label htmlFor="contained-button-file">
                                            <input accept="image/*" id="contained-button-file" className="upload-input-button" multiple type="file" onChange={(e) => handleScreenshot(e)} />
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={selected === false ? data.Logo : uploadLogo}
                                                sx={{ width: 65, height: 65 }}
                                            />
                                            <Button size="small" variant="contained" component="span">
                                                Upload
                                            </Button>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="label"> Company Name</label>
                                        <input className="form-input" name="Name" type="text" ref={CompanynameR} defaultValue={data.Companyname} />
                                    </div>
                                    <div className="form-group">
                                        <label className="label"> Client Name</label>
                                        <input className="form-input" name="Name" type="text" ref={ClientnameR} defaultValue={data.Clientname} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Email ID</label>
                                        <input className="form-input" name="Email" type="text" ref={EmailR} defaultValue={data.Email} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Phonenumber</label>
                                        <input className="form-input" name="Phonenumber" type="text" ref={PhonenumberR} defaultValue={data.Phonenumber} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Password</label>
                                        <input className="form-input" name="Password" type="text" ref={PasswordR} defaultValue={data.Password} />
                                        <p className="me-2 text-danger">{show}</p>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className='bottom-area'>
                                            <button type="button" onClick={() => handleUpdate(data.Logo)} className="btn2 float-end"> Update </button>
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