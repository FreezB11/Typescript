import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import path from "path";
import logging from './config/logging';
import config from './config/config';
import HomeRoutes from './routes/homerouter';
import connect = require("./database/database")

connect;

const NAMESPACE = 'Server';
const router = express();

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});


router.set('views', path.join(__dirname, './views'));
router.set('view engine', 'ejs');

router.use(express.static(path.join(__dirname, "public")));


/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


/** Routes go here */
router.use('/', HomeRoutes);

router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).render("404")

    // res.status(404).json({
    //     message: error.message
    // });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
