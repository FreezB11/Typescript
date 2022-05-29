const express = require('express');
const bodyParser = require('bodyparser');
const homerouter = require('./routes/homerouter')
const server = express()


server.set('views', path.join(__dirname, './views'));
server.set('view engine', 'ejs');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/', homerouter);

server.listen(8000, ()=>{
    console.log("server started")
})