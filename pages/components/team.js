import { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from 'axios';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormDialog from './common/dialogsform';
import Addteam from './submits/addteam';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router'
import Updateteam from './update/updateteam';
import { CSVLink } from 'react-csv';
export default function Team(props) {
    var [search, setSearch] = useState('');
    var [selectedValue, setSelectedValue] = useState('');
    const Router = useRouter();
    //console.log(selectedValue)
    var [team, setTeam] = useState([]);
    const [open, setOpen] = useState(false);
    var[exportTeam,setExportTeam] = useState([]);
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/team/list")
            .then((res) => setTeam(res.data));
    }, []);
    const deleteUsers = (id,name) => {

        Axios.put(`https://mindmadetech.in/api/team/delete/${id}`,{
            Isdeleted : 'y'
        }).then(() => {
                Router.reload(window.location.pathname);
        })
            // <-- declare id parameter
        //     Axios
        //         .delete(`https://mindmadetech.in/api/team/delete/${id}`) // <-- remove ;
        //         .then(() => {
        //             // Issue GET request after item deleted to get updated list
        //             // that excludes note of id
        //             Router.reload(window.location.pathname);
        //         })
        // };
        //  const handleClose = () => {
        //     Router.reload(window.location.pathname)
          };

         const TeamList = [
            [ 
             "Team Id",
             "User Name",
             "Password",
             "Team"
             ],
             ...team.map(details=>[
                 details.teamId,
                 details.Username,
                 details.Password,
                 details.Team
             ])
         ]
         TeamList.reduce((prev,curr)=>[prev,curr]);
        // console.log(TeamList)
     
         const handleExport = async() =>{
             const data =await TeamList;
             //console.log(data);
             setExportTeam(data)
                
         }
         const[login,setLogin]=useState()
         useEffect(() => {
            setLogin(window.localStorage.getItem('loggedin'))
            console.log(login)
            if (login === "false") {
              router.push("/")
            } else if (login === null) {
              router.push("/")
            }
        
          })
    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="container mainbody">
                <div className="userbody">
                    <div className='header-user'>
                        <h1>TEAM </h1>
                        <input placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div className='right-user-btns'>
                        <CSVLink 
                                data={exportTeam}
                                filename='Team_List.csv'
                                className="float-enduser btn2 button"
                                target="_blank"
                                asyncOnClick={true}
                                onClick={handleExport}
                            >Export</CSVLink>
                            <FormDialog
                                className="float-enduser btn2 button"
                                dialogtitle="+ADD Team"
                                dialogbody={<Addteam />}
                            />
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="teamtablecel" >TEAMID</TableCell>
                                    <TableCell className="teamtablecel" align="left">USERNAME</TableCell>
                                    <TableCell className="teamtablecel" align="left">PASSWORD</TableCell>
                                    <TableCell className="teamtablecel" align="left">TEAM</TableCell>
                                </TableRow>
                            </TableHead>
                            { search === "" ?
                            <>
                            {team.filter(val => {
                                if (val.Isdeleted === 'n') {
                                    return val;
                                } 
                            }).map((item) =>
                                <TableBody key={item.teamId}>

                                    <TableRow >

                                        <TableCell className="teamtablecel" component="th" scope="row">{item.teamId}</TableCell>
                                        <TableCell className="teamtablecel" align="left">{item.Username}</TableCell>
                                        <TableCell className="teamtablecel" align="left">{item.Password}</TableCell>
                                        <TableCell className="teamtablecel" align="left">{item.Team}</TableCell>
                                        
                                            
                                        <div className='deteleandedit'>
                                            <Updateteam teamId={item.teamId} />
                                            <FormDialog 
                                            className="team-delete"
                                            dialogtitle={<DeleteIcon />}
                                            headtitle={<div className='head-dialog'>Are you sure you want to delete the team?</div>}
                                            dialogactions={
                                                <div>
                                                    <Button onClick={()=>deleteUsers(item.teamId,item.Username)}>YES</Button>
                                                    <Button  >NO</Button>
                                                </div>
                                            }
                                            />
                                            </div>
                                    </TableRow>
                                  
                                </TableBody>
                            )}
                            </>  :
                            <>
                            {team.filter(val => {
                                if (val.Isdeleted === 'n') {
                                    if(val.Username.toLowerCase().includes(search.toLowerCase())){
                                        return val;
                                    }
                                } 
                            }).map((item) =>
                                <TableBody key={item.teamId}>

                                    <TableRow >

                                        <TableCell className="teamtablecel" component="th" scope="row">{item.teamId}</TableCell>
                                        <TableCell className="teamtablecel" align="left">{item.Username}</TableCell>
                                        <TableCell className="teamtablecel" align="left">{item.Password}</TableCell>
                                        <TableCell className="teamtablecel" align="left">{item.Team}</TableCell>
                                        
                                            
                                        <div className='deteleandedit'>
                                            <Updateteam teamId={item.teamId} />
                                            <FormDialog 
                                            className="team-delete"
                                            dialogtitle={<DeleteIcon />}
                                            headtitle={<div className='head-dialog'>Are you sure you want to delete the team?</div>}
                                            dialogactions={
                                                <div>
                                                    <Button onClick={()=>deleteUsers(item.teamId,item.Username)}>YES</Button>
                                                    <Button  >NO</Button>
                                                </div>
                                            }
                                            />
                                            </div>
                                    </TableRow>
                                  
                                </TableBody>
                            )}
                            </>
                        }
                        </Table>
                    </TableContainer>
                </div>

            </div>
        </div>
    )
}
