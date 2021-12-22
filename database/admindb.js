const express= require("express");
const mysql= require("mysql");
const cors=require("cors");

//const bcrypt=require("bcrypt");
//const saltRounds=10

const app=express();
app.use(express.json());
app.use(cors());

const con=mysql.createConnection({
    host:"localhost",
    user:"u699116212_Karthik",
    password:'Koestam@23',
    database:"u699116212_Karthik"
});

con.connect((err) =>{
    if(!err)
        console.log('connected successfully');
    else
        console.log('connected failed \n Error :' + JSON.stringify(err,undefined,2));
});

app.get('/adminlogin/:id',(req,res)=>{
    con.query("SELECT * FROM admin where id=?",[req.params.id],(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })

})

app.post("/adminlogin",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    
    con.query(
        "SELECT * FROM admin WHERE username= ? AND password= ? ",
        [username,password],(err,result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length>0){
                res.send(result)
            }else{ 
                res.send({message:"Wrong Username/Password combination!"})
            }
    });
});

app.put('/adminlogin/:id',(req,res)=>{

    const id= req.params.id;
    const phoneno = req.body.phoneno;
    const url = req.body.url;
    const address = req.body.address;
    const about = req.body.about;
 
    con.query(
         'UPDATE admin SET phoneno=?,url=?,address=?,about=? WHERE id=?',
         [phoneno,url,address,about,id],(err,result)=>{
            if(!err)
                res.send(result)
            else
              res.send(err)
     })
  });  

  app.delete('/adminlogin/:id',(req,res)=>{

    const id= req.params.id;
   
 
    con.query(
         'DELETE FROM notes WHERE ID= ?',
         [id],(err,result)=>{
            if(!err)
                res.send(result)
            else
              res.send(err)
     })
  });  
app.get('/register',(req,res)=>{
    con.query("SELECT * FROM admin",(err,rows)=>{
       
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })
})

app.post("/register",(req,res)=>{

    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;

    con.query(
        "SELECT * FROM admin WHERE username= ? ",
        [username],(err,result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length>0){
                res.send({message:"Username already Exists!"})
            }else{
                con.query(
                    "INSERT INTO admin (firstname,lastname,username,email,password) VALUES (?,?,?,?,?)",
                    [firstname,lastname,username,email,password],(err,result)=>{
                        if(!err)
                            res.send(result)
                        else
                            res.send(err)
                });
            }
    });
   
});

app.get('/adduser',(req,res)=>{
    con.query("SELECT * FROM users",(err,rows)=>{
       
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.delete("/delete/:id", (req, res) => {
    let { ID } = req.params.id;
    let sql = `DELETE FROM users WHERE ID = ${req.params.id}`;
    console.log("id: ", req.params.id);
  
    // delete a row with id = req.params.id
    connection.query(sql, (error, results, fields) => {
      if (error) return console.error(error.message);
      res.status(200).send(results);
      console.log("Deleted Row(s):", results.affectedRows);
    });
  });
app.post("/adduser",(req,res)=>{

    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const username=req.body.username;
    const email=req.body.email
    const password=req.body.password;

    con.query(
        "SELECT * FROM users WHERE username= ? ",
        [username],(err,result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length>0){
                res.send({message:"Username already Exists!"})
            }else{
                con.query(
                    "INSERT INTO users (firstname,lastname,username,email,password) VALUES (?,?,?,?,?)",
                    [firstname,lastname,username,email,password],(err,result)=>{
                        if(!err)
                            res.send(result)
                        else
                            res.send(err)
                });
            }
    });
});

app.post("/userlogin",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    con.query(
        "SELECT * FROM users WHERE username= ? AND password= ? ",
        [username,password],(err,result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length>0){
                res.send(result)
            }else{
                res.send({message:"Wrong Username/Password combination!"})
            }
    });
});

app.put('/userlogin/:id',(req,res)=>{

    const id= req.params.id;
    const phoneno = req.body.phoneno;
    const url = req.body.url;
    const address = req.body.address;
    const about = req.body.about;
 
    con.query(
        'UPDATE users SET phoneno=?,url=?,address=?,about=? WHERE id=?',
         [phoneno,url,address,about,id],(err,result)=>{
            if(!err)
                res.send(result)
            else
                res.send(err)
     })
  });  

app.get('/addIssues',(req,res)=>{
    con.query("SELECT * FROM issues ORDER BY IssuesFoundIn DESC",(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.get('/userlogin/:id',(req,res)=>{
    con.query("SELECT * FROM users where id=?",[req.params.id],(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.post("/addIssues",(req,res)=>{
    const UserName=req.body.UserName;
    const DomainName=req.body.DomainName;
    const IssuesFoundIn=req.body.IssuesFoundIn;
    const Description=req.body.Description;
    const Email=req.body.Email;
    const Team=req.body.Team;
    const Status=req.body.Status;
    const File=req.body.File;
    con.query(
        "INSERT INTO issues (username,DomainName,IssuesFoundIn,Description,Email,Team,Status,File) VALUES (?,?,?,?,?,?,?,?)",
        [UserName,DomainName,IssuesFoundIn,Description,Email,Team,Status,File],(err,result)=>{
            if(!err)
                res.send(result)
            else
                res.send(err)
    });
});

app.get('/addIssues/:id',(req,res)=>{
    con.query("SELECT * FROM issues where id=?",[req.params.id],(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.put('/addIssues',(req,res)=>{
    const team = req.body.team;
    const status = req.body.status; 
    const id = req.body.id;
    
    con.query(
        'UPDATE issues SET `Team`=?,`Status`=? WHERE `id`=?',
        [team,status,id],(err,rows)=>{
            if(!err){
                res.send(rows)
            }
            else{
                res.send(error)
            }
    })
});
app.listen(3001 , () =>{
    console.log('running server');
});




