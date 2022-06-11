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

    httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
  }
}

const server = new Server()

server.start()