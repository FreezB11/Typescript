
import { hash } from 'bcrypt';
import express from 'express';
import controller from '../controllers/controller';
const bcrypt = require('bcrypt');

const router = express.Router();

router.use(express.urlencoded({extended:false}))

router.get('/ping', controller.serverHealthCheck);



router.get('/',(req,res) =>{
    res.render("index")
});


router.get('/help', (req,res) =>{
    res.render("help")
});

router.post('/help',controller.StoreDataToDB);

router.get('/:id',(req,res) =>{
    res.send(`${req.params.id}`)
});

export = router;