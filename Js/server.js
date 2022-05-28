const express = require('express');
const server = express()


server.set('view engine', 'ejs');

server.get('/',(req,res)=>{
    res.render("views/index")
})

server.listen(8000, ()=>{
    console.log("server started")
})