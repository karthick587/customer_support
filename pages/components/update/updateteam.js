import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from '../common/dialogsform';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
function Updateteam({ teamId }) {
    let router = useRouter();
    var [getTeam, setGetTeam] = useState([]);
    var [editUsername, setEditUsername] = useState('');
    var [editPassword, setEditPassword] = useState('');
    var [editTeam, setEditTeam] = useState('');
    var [show, setShow] = useState('');

    useEffect(() => {
        axios.get(`https://mindmadetech.in/api/team/list/${teamId}`)
            .then(res => setGetTeam(res.data))
    }, [])
   


    const getvalue = ({ Username, Password, Team }) => {
        axios.put(`https://mindmadetech.in/api/team/update/${teamId}`, {
            Username: Username,
            Password: Password,
            Team: Team,
        }).then((res) => {
            setShow("Updated Successfully")
            router.reload(window.location.pathname)
        })
    }

    
    return (
        <FormDialog
            className=""
            dialogtitle={<EditIcon />}
            dialogbody={
                <>
                    <div>
                        {getTeam.map((data) =>
                            <div className="container mainbody" key={data.teamId}>
                                <Formik
                                className="addform"
                                    initialValues={{Username:data.Username ,Password:data.Password,Team:data.Team}}
                                    onSubmit={value => getvalue(value)}
                                >

                                    <Form >

                                    <div className="form-group">
                                            <label className="label">Username</label>
                                            <Field className="form-input" name="Username" />

                                        </div>
                                        <div className="form-group">
                                            <label className="col label">Password</label>
                                            <Field className="form-input" name="Password" />

                                        </div>

                                        <div>
                                            <div className="form-group">
                                                <label className="col label">Team</label>
                                                <Field className="form-input" as="select" name="Team">
                                                <option >select</option>
                                            <option value="design">Design</option>
                                            <option value="development">Development</option>
                                            <option value="server">server</option>
                                            <option value="seo">SEO</option>
                                        </Field>
                                            </div>
                                        </div>

                                        <div className="row justify-content-center">
                                            <div className='bottom-area'>
                                            <button type="submit" className="btn btn-success">Submit</button>
                                            </div>
                                        </div>
                                        <h3>{show}</h3>

                                      
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