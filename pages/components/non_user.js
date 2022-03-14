import React,{ useState,useContext, useEffect } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { CurrentDateContext } from '../components/contex/currentdateProvider';
import {CounterContext} from "../components/contex/adminProvider";
import moment from 'moment';
import { renderEmail } from 'react-html-email'
import NonUserBody from './utils/nonUserBody';
const schema = yup.object().shape({
    Companyname: yup.string().required(),
    Clientname: yup.string().required(),
    email: yup.string().required().email(),
    Phonenumber: yup.string().required().max(10),
    Password :  yup.string().required(),
    DomainName: yup.string().required(),
    Description: yup.string().required(),
});
export default function ScrollDialog(props) {
    const { setTesting,setshowvalue,Email} = useContext(CounterContext);
    const { currentDate } = useContext(CurrentDateContext);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [Logo, setLogo] = useState();
    const [uploadLogo, setUploadLogo] = useState();
    var [showlogo, setShowlogo] = useState('');
    const [logovalidate, setLogovalidate] = useState(); 
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleScreenshot(e) {
        setLogovalidate(e.target.files[0]);
        setLogo(e.target.files[0]);
        setUploadLogo(URL.createObjectURL(e.target.files[0]));
    };
   
    const handleSubmitForm = ({ Companyname, Clientname, email, Phonenumber, Password, DomainName, Description }) => {
        const messageHtml = renderEmail(<NonUserBody name={Clientname} body={Companyname} />)
        console.log("ok")
     
            Axios.post(`https://mindmadetech.in/api/unregisteredcustomer/new`, {
                Companyname : Companyname,
                Clientname : Clientname,
                Email : email,
                Phonenumber : Phonenumber,
                Password : Password,
                Logo:"https://mindmadetech.in/public/images/profile-img.png",
                CreatedOn : moment(new Date()).format('DD-MM-YYYY hh:mm A'),
                DomainName : DomainName,
                Description : Description
            }).then((response) => {
                
                if (response.data.statusCode === 400) {
                    setshowvalue(1+response.data.message)
                    setTesting(true)
                } else {
                    setshowvalue("Registered Successfully")
                    setOpen(false);               
                    setTesting(true)
                    Email.send({
                        Host: "mindmadetech.in",
                        Username: "_mainaccount@mindmadetech.in",
                        Password: "1boQ[(6nYw6H.&_hQ&",
                        To: email,
                        From: "karthickraja@mindmade.in",
                        Subject: "MindMade Support",
                        Body: messageHtml
                    }).then(
                        message => console.log(message)
                    );
                }
            }).catch((err) => { return err; })
    }
    
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        setTesting(false)
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div className='z-index-99'>
            <Button className='mt-1' onClick={handleClickOpen('paper')}>UNREGISTERED CLIENT</Button>
            <Dialog
                open={open}

                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title"><div className='form-title'>RAISE YOUR TICKETS</div></DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                            <div className="addform">
                            <form>
                              
                                <div className="form-group">
                                    <label className="label">Company Name</label>
                                    <input className="issue-form-input" name="Companyname" type="text" {...register('Companyname')} />
                                    <p className="me-2 text-danger">{errors.Companyname?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label className="label"> Client Name</label>
                                    <input className="issue-form-input" name="Clientname" type="text" {...register('Clientname')} />
                                    <p className="me-2 text-danger">{errors.Clientname?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label className="col label">Email ID</label>
                                    <input className="issue-form-input" name="email" type="text" {...register('email')} />
                                    <p className="me-2 text-danger">{errors.email?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label className="col label">Phonenumber</label>
                                    <input className="issue-form-input" name="Phonenumber" type="text" {...register('Phonenumber')} />
                                    <p className="me-2 text-danger">{errors.Phonenumber?.message}</p>
                                </div>
                                
                                <div className="form-group">
                                    <label className="col label">Password</label>
                                    <input className="form-input" name="Password" type="password" {...register('Password')} />
                                    <p className="me-2 text-danger">{errors.Password?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label className="label">Domain Name</label>
                                    <input className="issue-form-input" name="DomainName" rows="4" cols="50" maxLength="200" {...register('DomainName')} />
                                    <p className="me-2 text-danger">{errors.DomainName?.message}</p>
                                </div>

                                <div className="form-group">
                                    <label className="label">Description</label>
                                    <textarea className="issue-form-input" name="Description" rows="4" cols="50" maxLength="200" {...register('Description')} />
                                    <p className="me-2 text-danger">{errors.Description?.message}</p>
                                </div>
                            </form>
                           
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(handleSubmitForm)}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}