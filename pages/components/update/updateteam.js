import React, { useEffect, useState, useContext, createRef } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from '../common/dialogsform';
import { CounterContext } from '../contex/adminProvider';
import moment from 'moment';

function Updateteam({ teamId }) {

    const { setdialogformopen, setTesting, setshowvalue } = useContext(CounterContext);
    var [getTeam, setGetTeam] = useState([]);
    var [show, setShow] = useState('');
    let PasswordR = createRef();
    let EmailR = createRef();
    let PhonenumberR = createRef();
    let TeamR = createRef();

    useEffect(() => {
        localStorage.getItem("passValue", false);
    }, []);

    useEffect(() => {
        axios.get(`https://mindmadetech.in/api/team/list/${teamId}`)
            .then(res => setGetTeam(res.data))
            .catch((err) => { return err; })
    }, []);

    const handleSubmit = () => {
        const EmailValidate = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        var Password, Email, Phonenumber, Team;
        Password = PasswordR.current.value;
        Email = EmailR.current.value;
        Phonenumber = PhonenumberR.current.value;
        Team = TeamR.current.value;

        if (Password !== "" && Password.length > 5 && Email !== "" && Phonenumber !== "" && Team !== "") {
            if (!EmailValidate.test(String(Email).toLowerCase())) {
                setShow("Invalid Email")
            } else {
                axios.put(`https://mindmadetech.in/api/team/update/${teamId}`, {
                    Email: Email,
                    Password: Password,
                    Team: Team,
                    Phonenumber: Phonenumber,
                    MondifiedOn: moment(new Date()).format('DD-MM-YYYY hh:mm A'),
                    MondifiedBy: window.localStorage.getItem('ad_email')
                }).then((res) => {
                    if (res.data.message === "Email already Exists!") {
                        setShow(res.data.message);
                    } else {
                        setdialogformopen("true");
                        setTesting(true);
                        setshowvalue("Updated Successfully");
                        localStorage.setItem("passValue", true);
                    }
                }).catch((err) => {
                    setTesting(true)
                    setshowvalue(1 + "Failed to Update");
                    return err;
                })
            }
        } else if (Password.length < 6) {
            setShow("Password mush be 6 char long");
        } else if (Password === "" || Email === "" || Phonenumber === "" || Team === "") {
            setShow("all fields are required");
        }
    };
    return (
        <FormDialog
            className=""
            dialogtitle={<EditIcon />}
            dialogbody={
                <>
                    <div>
                        {getTeam.map((data) =>
                            <div className="container dialog-body" key={data.teamId}>
                                <div className="form-group">
                                    <label className="col label">Email ID<span>*</span></label>
                                    <input className="form-input" name="Email" type="text" ref={EmailR} defaultValue={data.Email} />
                                </div>
                                <div className="form-group">
                                    <label className="col label">Password<span>*</span></label>
                                    <input className="form-input" name="Password" type="text" ref={PasswordR} defaultValue={data.Password} />
                                </div>
                                <div className="form-group">
                                    <label className="col label">Phonenumber<span>*</span></label>
                                    <input className="form-input" name="Phonenumber" type="text" ref={PhonenumberR} defaultValue={data.Phonenumber} />
                                </div>
                                <div>
                                    <div className="form-group">
                                        <label className="col label">Team<span>*</span></label>
                                        <select className="form-input" defaultValue={data.Team} ref={TeamR} >
                                            <option disabled="disabled">--select Team--</option>
                                            <option value="design">Design</option>
                                            <option value="development">Development</option>
                                            <option value="server">server</option>
                                            <option value="seo">SEO</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className='bottom-area'>
                                        <p className='me-2 text-danger'>{show}</p>
                                        <button type="submit" className="btn2 float-end" onClick={handleSubmit}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            }
        />
    );
}
export default Updateteam;