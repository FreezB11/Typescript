import express from 'express';
import controller from '../controllers/controller';
import view from '../views/view'
const bcrypt = require('bcrypt');
const router = express.Router();
import {io} from 'socket.io-client';


const socket = io("http://localhost:6900/")

router.use(express.urlencoded({extended:false}))

router.get('/ping', controller.serverHealthCheck);

router.get('/', view.index);
router.get('/register', view.register);

router.post('/register', (req,res)=>{
    res.send("sent")
});

router.get('/help', view.help);

router.post('/help',controller.StoreDataToDB);

// router.get('/:id',(req,res) =>{
//     res.send(`${req.params.id}`)
// });

//eroorhandler
router.use(view.notfound);

export = router;