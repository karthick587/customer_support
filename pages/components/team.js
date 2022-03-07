import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Axios from 'axios';
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
import ReactPaginate from 'react-paginate';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography } from '@mui/material';
import { CounterContext } from './contex/adminProvider';
// import { TeamListContext } from './contex/teamListProvider';
import { ListContext } from './contex/ListProvider';

export default function Team(props) {
    const {setdialogformopen,setTesting,setshowvalue}=useContext(CounterContext)
    const {team}=useContext(ListContext)
    var [search, setSearch] = useState('');
    // var [selectedValue, setSelectedValue] = useState('');
    const Router = useRouter();
    // var [team, setTeam] = useState([]);
    var [exportTeam, setExportTeam] = useState([]);
    var [selectedValue, setSelectedValue] = useState([]);
    const [login, setLogin] = useState();
    
   

    // useEffect(() => {
    //     Axios.get("https://mindmadetech.in/api/team/list")
    //         .then((res) => {
    //             setTeam(res.data);
    //             if (localStorage.getItem("passValue") === true) {
    //                 setSelectedValue(team);
    //             } else {
    //                 setSelectedValue();
    //             }
    //         }).catch((err) => { return err; })
    // }, [setSelectedValue]);

    // useEffect(() => {
    //     localStorage.setItem("passValue", false);
    // },[]);

    const deleteUsers = (id)=> {
        Axios.put(`https://mindmadetech.in/api/team/delete/${id}`, {
            Isdeleted: 'y'
        }).then((res) => {
            setshowvalue("Deleted Successfully")
            setTesting(true)
            setdialogformopen("true")
            return res;
        }).catch((err) => { 
            setshowvalue("Error")
            setTesting(true)
            
            return err; })
    };

    const TeamList = [
        [
            "Team Id",
            "User Name",
            "Password",
            "Team"
        ],
        ...team.map(details => [
            details.teamId,
            details.Username,
            details.Password,
            details.Team
        ])
    ]
    TeamList.reduce((prev, curr) => [prev, curr]);

    const handleExport = () => {
        const data = TeamList;
        setExportTeam(data);
    };

    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'));
        if (login === "false") {
            Router.push("/");
        } else if (login === null) {
            Router.push("/");
        }
    },[]);

   
    const [datalimit, setdatalimit] = useState(10);
    const [currentpage, setCurrentpage] = useState(1);
    //pagination
    function handlePageChange(pageNumber) {
        setCurrentpage(pageNumber + 1);
    };

    const pagedatalimit = (e) => {
        setdatalimit(e.target.value);
    };

    return (
        <div>
            <Head>
                <title>ADMIN DASHBOARD</title>
            </Head>

            <div className="userbody2">
                <div className='header-user'>

                    <div><h1>TEAM </h1></div>
                    <input placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />



                    <div className='header-right'>
                        <Button>
                            <CSVLink
                                data={exportTeam}
                                filename={'Team_List.csv'}
                                className="me-1 header-export"
                                target="_blank"
                                onClick={handleExport}
                            >
                                <FileDownloadIcon />EXPORT
                            </CSVLink>
                        </Button>

                        <FormDialog
                            className="me-1 header-adduser"
                            dialogtitle={<> <PersonAddIcon className='me-1' />ADD TEAM</>}
                            dialogbody={<Addteam />}
                        />
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="teamtablecel" >TEAM ID</TableCell>
                                <TableCell className="teamtablecel" align="left">USERNAME</TableCell>
                                <TableCell className="teamtablecel" align="left">PASSWORD</TableCell>
                                <TableCell className="teamtablecel" align="left">TEAM</TableCell>
                            </TableRow>
                        </TableHead>
                        {team.filter(val => {
                          if (search === "") {
                            return val;
                        } else if (val.Username.toLowerCase().includes(search.toLowerCase())||
                                    val.Team.toLowerCase().includes(search.toLowerCase())||
                                    val.teamId.toString().includes(search.toString())) {
                            return val;
                        } else null;
                        }).reverse().slice((currentpage - 1) * datalimit, currentpage * datalimit).map((item) =>
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
                                                    <Button onClick={() => deleteUsers(item.teamId, item.Username)}>YES</Button>
                                                    <Button onClick={()=>setdialogformopen("true")} >NO</Button>
                                                </div>
                                            }
                                        />
                                    </div>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
                <div className='page-bottom'>
                    < ReactPaginate
                        previousLabel={""}
                        nextLabel={""}
                        pageCount={Math.ceil(team.length / datalimit)}
                        onPageChange={(e) => handlePageChange(e.selected)}
                        containerClassName={"pagination mt-3"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                    <div className='pagedata-limit flex'>
                        <Typography>Team per page</Typography>

                        <select className='pagedatalimit-select' onChange={pagedatalimit}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>
    )
}


