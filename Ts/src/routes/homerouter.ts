import { hash } from 'bcrypt';
import express from 'express';
import controller from '../controllers/controller';
import index from '../views/index';
const bcrypt = require('bcrypt');
const router = express.Router();

router.use(express.urlencoded({extended:false}))

router.get('/ping', controller.serverHealthCheck);




router.get('/', index.index);

router.get('/help', (req,res) =>{
    res.render("help")
});

router.post('/help',controller.StoreDataToDB);

router.get('/:id',(req,res) =>{
    res.send(`${req.params.id}`)
});

export = router;