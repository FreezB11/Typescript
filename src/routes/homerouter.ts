
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

router.post('/help',(req,res)=>{

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashed = bcrypt.hashSync(password, 10);
    const verified = bcrypt.compareSync(password, hashed)

    if (verified){
        console.log('verified');
    }else{
        console.log('not verified');
    }
    

    console.log(name,email,hashed);

    res.send("posted");
});

router.get('/:id',(req,res) =>{
    res.send(`${req.params.id}`)
});

export = router;