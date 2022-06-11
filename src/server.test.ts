import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';
import http from 'http';
import HomeRoutes from './routes/homerouter';
import logging from'../src/config/logging';
import config from '../src/config/config';
import bodyParser from 'body-parser';
import path from "path";


class Server {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
    this.routes()
    
  }

  public routes(): void {
    this.app.use('/', HomeRoutes)
  }

  public config(): void {

    const NAMESPACE = 'Server';

    this.app.use((req, res, next) => {
        /** Log the req */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /** Log the res */
            logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
        })
        next();
    });


    this.app.set('port', process.env.PORT || 3000)
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors())
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  public start(): void {

    const httpServer = http.createServer(this.app);

    const NAMESPACE = 'Server';

    // this.app.use((req, res, next) => {
    //     /** Log the req */
    //     logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    //     res.on('finish', () => {
    //         /** Log the res */
    //         logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    //     })
    //     next();
    // });

    httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
  }
}

const server = new Server()

server.start()