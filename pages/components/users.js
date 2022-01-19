import { useState, useEffect } from 'react';
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
import { Button } from '@mui/material';
import router from "next/router";
import Addcustomer from './submits/addcustomer';
import Updatecustomer from './update/updatecustomer';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import Imageviewer from './common/imageviewer';

export default function Users(props) {
    var [search, setSearch] = useState('');
    var [selectedValue, setSelectedValue] = useState('');
    const Router = useRouter();
    //console.log(selectedValue)
    var [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    var [exportUsers, setExportUsers] = useState([]);



    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/customer/list")
            .then((res) => setUsers(res.data))
    }, [users]);

    const deleteUsers = (id, name) => {

        Axios.put(`https://mindmadetech.in/api/customer/delete/${id}`, {
            Isdeleted: 'y'
        }).then(() => {
            Router.reload(window.location.pathname);
        })
        // <-- declare id parameter
        // Axios
        //     .delete(`https://mindmadetech.in/api/customer/delete/${id}`) // <-- remove ;
        //     .then(() => {
        //         // Issue GET request after item deleted to get updated list
        //         // that excludes note of id
        //         Router.reload(window.location.pathname);
        //     })
    };


    const UsersList = [
        [
            "Users Id",
            "Name",
            "User Name",
            "Password",
            "Email Id",
            "Phonenumber"
        ],
        ...users.map(details => [
            details.usersId,
            details.Name,
            details.Username,
            details.Password,
            details.Email,
            details.Phonenumber
        ])
    ]
    UsersList.reduce((prev, curr) => [prev, curr]);
    //console.log(UsersList)

    const handleExport = async () => {
        const data = await UsersList;
        //console.log(data);
        setExportUsers(data)

    }
    const [login, setLogin] = useState()
    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'))

        if (login === "false") {
            router.push("/")
        } else if (login === null) {
            router.push("/")
        }
        localStorage.setItem('updateclose', "open");
    })
    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="container mainbody">


                <div className="userbody">
                    <div className='header-user'>
                        <h1>USERS</h1>
                        <input placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />

                        <div className='right-user-btns'>
                            <CSVLink
                                data={exportUsers}
                                filename='Customer_List.csv'
                                className="float-enduser btn2 button"
                                target="_blank"
                                asyncOnClick={true}
                                onClick={handleExport}
                            >Export</CSVLink>
                            <FormDialog
                                className="float-enduser btn2 button"
                                dialogtitle="+ADD customer"
                                dialogbody={<Addcustomer />}
                            />
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow className='usertable'>
                                    <TableCell className="client-logo-col" >USERID</TableCell>
                                    <TableCell className="client-logo-col" align="left">LOGO</TableCell>
                                    <TableCell align="left">COMPANY NAME</TableCell>
                                    <TableCell align="left">CLIENT NAME</TableCell>
                                    <TableCell align="left">EMAIL</TableCell>
                                    <TableCell align="left">PHONE NUMBER</TableCell>

                                </TableRow>
                            </TableHead>
                                    {users.filter(item => {
                                        if (item.Isdeleted==='n') {
                                            if(search === ""){
                                                return item;
                                            } else{
                                                if (item.Clientname.toLowerCase().includes(search.toLowerCase()) ||
                                                item.Companyname.toLowerCase().includes(search.toLowerCase())
                                            ) {
                                                return item;
                                            }
                                            }
                                        }
                                    }).map((item) =>
                                        <TableBody key={item.usersId}>
                                            <TableRow >
                                                <TableCell component="th" className="client-logo-ver" scope="row">{item.usersId}</TableCell>
                                                <TableCell className="client-logo-ver" align="left" >
                                                    <Imageviewer
                                                        imgdialogbutton={<img src={item.Logo} alt='logo' className="rounded-circle mb-2" height={40} width={40} />}
                                                        imgdialogbody={<img className="Imageviewer-userimg" src={item.Logo} alt='logo' />}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">{item.Companyname}</TableCell>
                                                <TableCell align="left">{item.Clientname}</TableCell>
                                                <TableCell align="left">{item.Email}</TableCell>
                                                <TableCell align="left">{item.Phonenumber}</TableCell>

                                                <div className='deteleandedit'>

                                                    <Updatecustomer usersId={item.usersId} />

                                                    <FormDialog
                                                        className="user-delete"
                                                        dialogtitle={<DeleteIcon />}
                                                        headtitle={<div className='head-dialog'>Are you sure you want to delete the team?</div>}
                                                        dialogactions={
                                                            <div>
                                                                <Button onClick={() => deleteUsers(item.usersId, item.Username)}>YES</Button>
                                                                <Button   >NO</Button>
                                                            </div>
                                                        }
                                                    />
                                                </div>

                                            </TableRow>
                                        </TableBody>
                                    )}                                                                     
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}