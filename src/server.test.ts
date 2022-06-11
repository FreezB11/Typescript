import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
class App {
 public app: Application;
 constructor() {
  this.app = express();
  this.config();
 }
 private config(): void {
 this.app.use((req: Request, res: Response, next: NextFunction) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
res.header('Access-Control-Allow-Headers', '*');
next();
});
this.app.use(bodyParser.json());
this.app.use(bodyParser.urlencoded({ extended: false }));
}
}



const port = 3000;

