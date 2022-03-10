import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from '../common/dialogsform';
import { Formik, Form, Field } from 'formik';
import { CounterContext } from '../contex/adminProvider';

function Updateteam({ teamId }) {

    const { setdialogformopen,setTesting,setshowvalue } = useContext(CounterContext);
    var [getTeam, setGetTeam] = useState([]);
    var [show, setShow] = useState('');

    useEffect(()=>{
    localStorage.getItem("passValue",false);
    });

    useEffect(() => {
        axios.get(`https://mindmadetech.in/api/team/list/${teamId}`)
            .then(res => setGetTeam(res.data))
            .catch((err)=>{ return err; })
    }, []);

    const getvalue = ({ Email, Password, Team,Phonenumber }) => {
        axios.put(`https://mindmadetech.in/api/team/update/${teamId}`, {
            Email: Email,
            Password: Password,
            Team: Team,
            Phonenumber:Phonenumber,
            MondifiedOn: moment(new Date()).format('DD-MM-YYYY hh:mm A'),
            MondifiedBy: window.localStorage.getItem('ad_email')
        }).then((res) => {
            setShow("Updated Successfully");
         
            setdialogformopen("true")
            setTesting(true)
            setshowvalue("Updated Successfully");
            localStorage.setItem("passValue",true);
        }).catch((err)=>{ 
            setTesting(true)
            setshowvalue(1+"Error");
            return err; })
    };
    useEffect(()=>{
        const Timer = setTimeout(() => {
            setShow();
          }, [4000]);
          return () =>{
              clearTimeout(Timer);
          }
        
      })

    return (
        <FormDialog
            className=""
            dialogtitle={<EditIcon />}
            dialogbody={
                <>
                    <div>
                        {getTeam.map((data) =>
                            <div className="container dialog-body" key={data.teamId}>
                                <Formik
                                    className="addform"
                                    initialValues={{ Email: data.Email, Password: data.Password, Team: data.Team }}
                                    onSubmit={value => getvalue(value)}
                                >
                                    <Form >
                                        <div className="form-group">
                                            <label className="label">Email</label>
                                            <Field className="form-input" type="email" name="Email" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col label">Password</label>
                                            <Field className="form-input" name="Password" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col label">Phonenumber</label>
                                            <Field className="form-input" name="Phonenumber" />
                                        </div>
                                        <div>
                                            <div className="form-group">
                                                <label className="col label">Team</label>
                                                <Field className="form-input" as="select" name="Team">
                                                    <option >--select Team--</option>
                                                    <option value="design">Design</option>
                                                    <option value="development">Development</option>
                                                    <option value="server">server</option>
                                                    <option value="seo">SEO</option>
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className='bottom-area'>
                                                <button type="submit" className="btn2 float-end">Submit</button>
                                            </div>
                                        </div>
                                        <h4 className="alert1 text-center">{show}</h4>
                                    </Form>
                                </Formik>
                            </div>
                        )}
                    </div>
                </>
            }
        />
    );
}
export default Updateteam;