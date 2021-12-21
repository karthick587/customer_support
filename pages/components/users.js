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
        Axios.get("http://localhost:3001/adduser")
        .then((res)=>setUsers(res.data));
    },[]);
    useEffect(()=>{
   const deleteUsers = (id) => {
        // <-- declare id parameter
        Axios
          .delete(`http://localhost:3001/delete/${id}`) // <-- remove ;
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
                                  
                                    <TableCell>ID</TableCell>
                                    <TableCell align="left">FIRST_NAME</TableCell>
                                    <TableCell align="left">LAST_NAME</TableCell>
                                    <TableCell align="left">USERNAME</TableCell>
                                    <TableCell align="left">email</TableCell>
                                    <TableCell align="left">PASSWORD</TableCell>
                                </TableRow>
                            </TableHead>
                            {users.filter(val=>{
                           if(search === ""){
                               return val;
                           }else if(
                               val.firstname.toLowerCase().includes(search.toLowerCase()) ||
                               val.lastname.toLowerCase().includes(search.toLowerCase()) ||
                               val.username.toLowerCase().includes(search.toLowerCase()) ||   
                               val.password.toLowerCase().includes(search.toLowerCase())
                                         
                           ){
                               return val;
                           }
                       }).map((item)=>
                                <TableBody key={item.id}>
                                    
                                    <TableRow >
                                   
                                        <TableCell component="th" scope="row">{item.id}</TableCell>
                                        <TableCell align="left">{item.firstname}</TableCell>
                                        <TableCell align="left">{item.lastname}</TableCell>
                                        <TableCell align="left">{item.username}</TableCell>
                                        <TableCell align="left">{item.email}</TableCell>
                                        <TableCell align="left">{item.password}</TableCell>
                                        <TableCell align="left"><button
type="button"
className="btn-xs btn-info float-right"
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