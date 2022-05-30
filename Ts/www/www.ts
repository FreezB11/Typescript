import router from "../src/server";
import http from 'http';
import logging from'../src/config/logging';
import config from '../src/config/config';


const NAMESPACE = 'Server';

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));


