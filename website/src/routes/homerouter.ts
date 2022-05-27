
import express from 'express';
import controller from '../controllers/controller';

const router = express.Router();

router.get('/ping', controller.serverHealthCheck);



router.get('/',(req,res) =>{
    res.render("index")
});


router.get('/help', (req,res) =>{
    res.render("help")
});

export = router;