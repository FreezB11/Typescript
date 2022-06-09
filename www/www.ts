import router from "../src/server";
import httpServer from "../src/server"
import logging from'../src/config/logging';
import config from '../src/config/config';

const NAMESPACE = 'Server';



httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

