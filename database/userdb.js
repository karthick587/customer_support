const express= require("express");
const mysql= require("mysql");
const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cors());

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'',
    database:"customerdb"
});
con.connect((err) =>{
    if(!err)
    console.log('connected successfully');
    else
    console.log('connected failed \n Error :' + JSON.stringify(err,undefined,2));
});
app.get('/adduser',(req,res)=>{
    con.query("SELECT * FROM users",(err,rows)=>{
    if(!err)
    res.send(rows);
    else
    res.send(err);
    })

})
app.post("/adduser",(req,res)=>{

    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const username=req.body.username;
    const password=req.body.password;
    con.query(
        "INSERT INTO users (firstname,lastname,username,password) VALUES (?,?,?,?)",
    [firstname,lastname,username,password],(err,result)=>{
        if(!err)
        res.send(result)
      else
        res.send(err)
    });
});
/*app.post("/userlogin",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    con.query(
        "SELECT * FROM users WHERE username= ? AND password= ? ",
    [username,password],(err,result)=>{
        if(err)
        {
            res.send({err:err});
        }
        if(result.length>0)
        {
            res.send(result)
        }
        else
        {
            res.send({message:"Wrong Username/Password combination!"})
        }
    });
});*/
 

app.listen(3001 , () =>{
    console.log('running server');
});