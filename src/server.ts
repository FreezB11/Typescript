import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import apiRouter from './routes/api';
import logger from 'jet-logger';
import { CustomError } from './pre-start/errors';
import serverrouter from '@routes/server.route';
import cors from 'cors';
import ejs from 'ejs';

// Constants
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors())
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}



app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});


const viewsDir = path.join(__dirname, 'views');
const staticDir = path.join(__dirname, 'public');
app.set('views', viewsDir);
app.set('view engine', 'ejs')
app.use(express.static(staticDir));


app.get('/', serverrouter);

export default app;
