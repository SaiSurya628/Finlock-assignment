const express = require('express');
const sqlite3 = require('sqlite3');
const {open}=require("sqlite");
const path=require("path");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dbPath=path.join(__dirname,"database.db");

const app = express();

app.use(cors());
app.use(express.json());


let db = null;

const initialization=async()=>{
    try{
db=await open({filename:dbPath,driver:sqlite3.Database})
app.listen(5000,()=>{
    console.log("server running")
});
    }
    catch(error){
        process.exit(1)
        console.log(`db error ${error}`);
    }
}

initialization();

app.post('/login', async(request, response) => {

  const { username, password } = request.body;

 const inal= await db.get( `SELECT * FROM user WHERE username="${username}" AND password="${password}";`);

if(inal){
    const payload={username:username}
    const jwtToken=jwt.sign(payload,"MY_SECRET_TOKEN");
    response.send({jwtToken});
}
else{
    response.status(500)
    response.send("error displayed")
}

});


