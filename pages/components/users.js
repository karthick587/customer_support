import React,{useState,useEffect} from 'react';
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
import Adduser from './submits/adduser';

export default function Users(props){
    var[search,setSearch] = useState('');
  var[selectedValue,setSelectedValue] = useState('');
  
  console.log(selectedValue)
    var[users,setUsers]=useState([]);
    useEffect(()=>{
        Axios.get("https://mindmadetech.in/adduser")
        .then((res)=>setUsers(res.data));
    },[]);
    useEffect(()=>{
   const deleteUsers = (id) => {
        // <-- declare id parameter
        Axios
          .delete(`https://mindmadetech.in/delete/${id}`) // <-- remove ;
          .then(() => {
            // Issue GET request after item deleted to get updated list
            // that excludes note of id
            this.getAllUsers()
          })
          .then(res => {
            const AllUsers = res.data;
            this.setState({ AllUsers });
          })
          .catch(err => {
            console.error(err);
          });
      };
    });
    return(
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="container mainbody">
             
              
                <div className="userbody">
                <div className='header-user'>
               <h1>USERS </h1>
               <input placeholder='search' type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
               <FormDialog
               className="float-enduser btn2 button"
                    dialogtitle="+ADD USER"
                    dialogbody={<Adduser />}
                />
                 
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
                            {users.filter(val=>{
                           if(search === ""){
                               return val;
                           }else if(
                             
                               val.username.toLowerCase().includes(search.toLowerCase())   
                               
                                         
                           ){
                               return val;
                           }
                       }).map((item)=>
                                <TableBody key={item.usersId}>
                                    
                                    <TableRow >
                                   
                                        <TableCell component="th" scope="row">{item.usersId}</TableCell>
                                        <TableCell align="left">{item.Name}</TableCell>
                                        <TableCell align="left">{item.Username}</TableCell>
                                        <TableCell align="left">{item.Password}</TableCell>
                                        <TableCell align="left">{item.Email}</TableCell>
                                        <TableCell align="left">{item.Phonenumber}</TableCell>
                                        <TableCell align="left">{item.Address}</TableCell>
                                        <TableCell align="left"><button
type="button"
className="btn2"
onClick={() => props.deleteUsers(item.id)}>

Delete
</button></TableCell>
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