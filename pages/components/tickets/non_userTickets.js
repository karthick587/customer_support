import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Non_userTickets from '../common/non_userviewer';
import Imageviewer from '../common/imageviewer';
import ReactPaginate from 'react-paginate';
import { Typography } from '@mui/material';
function NonUserTickets(props) {

    const [showdetails, setShowdetails] = useState(false);
    var [nonUser, setNonUser] = useState([]);
    const [registerId, setRegisterId] = useState(null);

    function ShowDetail(registerId) {
        setRegisterId(registerId)
        setShowdetails(true)
    }
    const[PendingCount,setPendingCount]=useState("")
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/unregisteredcustomer/list")
            .then((res) => setNonUser(res.data))
            .catch((err) => { return err; })
            setPendingCount(nonUser.filter(val => { return val.Status.toLowerCase().includes("Pending".toLowerCase()) }).map((ticket)=> setPendingCount(ticket.Status.length)).length);
            props.callback(PendingCount)
    }, [setNonUser,nonUser]);

    function closeDetails() {
        setShowdetails(false);
    };
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
                <title>Admin Dashboard</title>
            </Head>
            {showdetails === false ?
                <div className="teambody">
                    <div className='dash-head mt-1 mb-1'>
                        <h1>UNREGISTERED CLIENTS</h1>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">LOGO</TableCell>
                                    <TableCell align="left">COMPANY NAME</TableCell>
                                    <TableCell align="left">CLIENT NAME</TableCell>
                                    <TableCell align="left">DATE</TableCell>
                                    <TableCell align="left">STATUS</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody   >
                                {nonUser.slice((currentpage - 1) * datalimit, currentpage * datalimit).map(value =>
                                    <TableRow key={value.registerId} onClick={() => ShowDetail(value.registerId)} className={value.Status === "Pending" ? "highlighted-row" : "tickets-bodyrow"}>
                                        <TableCell align="left">{value.registerId}</TableCell>
                                        <TableCell align="left">
                                            <Imageviewer
                                                imgdialogbutton={<img src={value.Logo} alt='logo' className="rounded-circle mb-2" height={40} width={40} />}
                                                imgdialogbody={<img className="Imageviewer-userimg" src={value.Logo} alt='logo' />}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{value.Companyname}</TableCell>
                                        <TableCell align="left">{value.Clientname}</TableCell>
                                        <TableCell align="left">{value.CreatedOn}</TableCell>
                                        <TableCell align="left">{value.Status}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className='page-bottom'>
                        < ReactPaginate
                            previousLabel={""}
                            nextLabel={""}
                            pageCount={Math.ceil(nonUser.length / datalimit)}
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
                :
                <>
                    <Non_userTickets registerId={registerId} closeDetails={closeDetails} />
                </>
            }
        </div>
    );
}
export default NonUserTickets;