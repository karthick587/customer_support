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
import { CSVLink } from 'react-csv';
import { Button, Typography } from '@mui/material';
import router from "next/router";
import Addcustomer from './submits/addcustomer';
import Updatecustomer from './update/updatecustomer';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import Imageviewer from './common/imageviewer';
import ReactPaginate from 'react-paginate';
import { CounterContext } from './contex/adminProvider';
import { ListContext } from './contex/ListProvider';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PasswordViewer from './common/password';
export default function Users(props) {

    const { setdialogformopen,setTesting,setshowvalue } = useContext(CounterContext);
    const { users } = useContext(ListContext);
    var [search, setSearch] = useState('');
    const router = useRouter();
    var [exportUsers, setExportUsers] = useState([]);
    const [login, setLogin] = useState();
    const [datalimit, setdatalimit] = useState(10);
    const [currentpage, setCurrentpage] = useState(1);

    useEffect(() => {
        localStorage.setItem("passValue", false);
    },[]);

    const deleteUsers = (id)=> {
        Axios.put(`https://mindmadetech.in/api/customer/delete/${id}`, {
            Isdeleted: 'y'
        }).then(() => {
            setdialogformopen("true")
            setshowvalue("Deleted Successfully")
            setTesting(true)
        }).catch((err) => { 
            setshowvalue("Error")
            setTesting(true)
            return err; })
    };

    const UsersList = [
        [
            "Users Id",
            "Company Name",
            "Client Name",
            "Email Id",
            "Password",
            "Phonenumber"
        ],
        ...users.map(details => [
            details.usersId,
            details.Companyname,
            details.Clientname,
            details.Email,
            details.Password,
            details.Phonenumber
        ])
    ]
    UsersList.reduce((prev, curr) => [prev, curr]);

    const handleExport = () => {
        const data = UsersList;
        setExportUsers(data);
    };

    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'));
        if (login === "false") {
            router.push("/");
        } else if (login === null) {
            router.push("/");
        }
        localStorage.setItem('updateclose', "open");
    },[login,setLogin])

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
                <title>Admin Dashboard</title>
            </Head>

            <div className="userbody2">
                <div className='header-user'>
                    <h1>CLIENTS</h1>
                    <input placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />



                    <div className='header-right'>
                        <Button>
                            <CSVLink
                                data={exportUsers}
                                filename={'Client_List.csv'}
                                className="me-1 header-export"
                                target="_blank"
                                onClick={handleExport}
                            > <FileDownloadIcon />EXPORT</CSVLink>
                        </Button>


                        <FormDialog
                            className="me-1 header-adduser"
                            dialogtitle={<> <PersonAddIcon className='me-1' />ADD CLIENT</>}
                            dialogbody={<Addcustomer />}
                        />


                    </div>


                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow className='usertable'>
                                <TableCell className="teamtablecel" >CLIENT ID</TableCell>
                                <TableCell className="teamtablecel" align="left">LOGO</TableCell>
                                <TableCell className="teamtablecel" align="left">COMPANY NAME</TableCell>
                                <TableCell className="teamtablecel">CLIENT NAME</TableCell>
                                <TableCell className="teamtablecel">EMAIL</TableCell>
                                <TableCell className="teamtablecel">PASSWORD</TableCell>                              
                                <TableCell className="teamtablecel">PHONE NUMBER</TableCell>
                            </TableRow>
                        </TableHead>
                        {users.filter(val => {
                            if (search === "") {
                                return val;
                            } else if (val.Companyname.toLowerCase().includes(search.toLowerCase()) ||
                                val.Clientname.toLowerCase().includes(search.toLowerCase()) ||
                                val.usersId.toString().toLowerCase().includes(search.toLowerCase().toString())||
                                val.Email.toLowerCase().includes(search.toLowerCase())) {
                                return val;
                            } else null;
                        }).reverse().slice((currentpage - 1) * datalimit, currentpage * datalimit).map((item) =>
                            <TableBody key={item.usersId}>
                                <TableRow >
                                    <TableCell className="teamtablecel" component="th" scope="row">{item.usersId}</TableCell>
                                    <TableCell className="teamtablecel" align="left" >
                                        <Imageviewer
                                            imgdialogbutton={<img src={item.Logo} alt='logo' className="rounded-circle mb-2 user-profile-img" />}
                                            imgdialogbody={<img className="Imageviewer-userimg" src={item.Logo} alt='logo' />}
                                        />
                                    </TableCell>
                                    <TableCell className="teamtablecel" align="left">{item.Companyname}</TableCell>
                                    <TableCell className="teamtablecel" align="left">{item.Clientname}</TableCell>
                                    <TableCell className="teamtablecel" align="left">{item.Email}</TableCell>
                                    <TableCell className="teamtablecel" align="left"><PasswordViewer Password={item.Password}  /></TableCell>
                                    <TableCell className="teamtablecel" align="left">{item.Phonenumber}</TableCell>
                                    <div className='deteleandedit'>
                                        <Updatecustomer usersId={item.usersId} />
                                        <FormDialog
                                            className="user-delete"
                                            dialogtitle={<DeleteIcon />}
                                            headtitle={<div className='head-dialog'>Are you sure want to delete this Client?</div>}
                                            dialogactions={
                                                <div>
                                                    <Button onClick={() => deleteUsers(item.usersId, item.Username)}>YES</Button>
                                                    <Button onClick={()=>setdialogformopen("true")}>NO</Button>
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
                        pageCount={Math.ceil(users.length / datalimit)}
                        onPageChange={(e) => handlePageChange(e.selected)}
                        containerClassName={"pagination mt-3"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                    <div className='pagedata-limit flex'>
                        <Typography>Clients per page</Typography>

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