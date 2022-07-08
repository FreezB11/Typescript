import express from 'express';
import controller from '../controllers/controller';

const router = express.Router();

router.get('/ping', controller.serverHealthCheck);

export = router;