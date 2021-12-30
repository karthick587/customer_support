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
import Addcustomer from './submits/addcustomer';
import Pagination from './common/Pagination';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button } from '@mui/material';
import { useRouter } from 'next/router'
import * as React from 'react';
export default function Users(props) {
    var [search, setSearch] = useState('');
    var [selectedValue, setSelectedValue] = useState('');
    const [ProductsList, setProductsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const Router = useRouter()
    console.log(selectedValue)
    
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/customer/list")
            .then((res) => setProductsList(res.data));
    }, []);


    const deleteUsers = (id, name) => {

        // <-- declare id parameter
        Axios
            .delete(`https://mindmadetech.in/api/customer/delete/${id}`) // <-- remove ;
            .then(() => {
                // Issue GET request after item deleted to get updated list
                // that excludes note of id

                Router.reload(window.location.pathname)
            })
    };


    let productsPerPage = 8;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);

    }

    function setSelect(e) {
        setValue(e.target.value);

    }
    //Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = ProductsList.slice(indexOfFirstProduct, indexOfLastProduct);



    useEffect(() => {

        if (productsPerPage < 8) {
            setIsOpen(false);
        } else return setIsOpen(true);
    });
    console.log(currentProducts)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="container mainbody">


                <div className="userbody">
                    <div className='header-user'>
                        <h1>USERS </h1>
                        <input placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div className='right-user-btns'>
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
                                <TableRow>

                                    <TableCell>USERID</TableCell>
                                    <TableCell align="left">NAME</TableCell>
                                    <TableCell align="left">USERNAME</TableCell>
                                    <TableCell align="left">PASSWORD</TableCell>
                                    <TableCell align="left">EMAIL</TableCell>
                                    <TableCell align="left">PHONE NUMBER</TableCell>
                                    <TableCell align="left">ADDRESS</TableCell>
                                </TableRow>
                            </TableHead>
                            {currentProducts.filter(val => {
                                if (search === "") {
                                    return val;
                                } else if (

                                    val.Username.toLowerCase().includes(search.toLowerCase()) ||
                                    val.Name.toString().includes(search.toString())

                                ) {
                                    return val;
                                }
                            }).map((item) =>
                                <TableBody key={item.usersId}>

                                    <TableRow >

                                        <TableCell component="th" scope="row">{item.usersId}</TableCell>
                                        <TableCell align="left">{item.Name}</TableCell>
                                        <TableCell align="left">{item.Username}</TableCell>
                                        <TableCell align="left">{item.Password}</TableCell>
                                        <TableCell align="left">{item.Email}</TableCell>
                                        <TableCell align="left">{item.Phonenumber}</TableCell>
                                        <TableCell align="left">{item.Address}</TableCell>
                                        <TableCell align="left" >
                                            <div>
                                                <Button className="" variant="outlined" onClick={handleClickOpen}>
                                                    Delete
                                                </Button>
                                                <Dialog open={open} onClose={handleClose}>
                                                    <DialogContent>
                                                        do you want to delete
                                                        <div className="actionbtn">
                                                            <Button onClick={() => deleteUsers(item.usersId, item.Username)}>YES</Button>
                                                            <Button onClick={handleClose}>NO</Button>
                                                        </div>
                                                    </DialogContent>

                                                </Dialog>
                                            </div></TableCell>
                                    </TableRow>

                                </TableBody>
                            )}
                        </Table>
                        {isOpen && (
                            <Pagination perPage={productsPerPage} total={ProductsList.length} paginate={paginate} />
                        )}
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}