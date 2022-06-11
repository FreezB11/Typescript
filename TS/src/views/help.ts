import { NextFunction, Request, Response } from 'express';


const help = (req: Request, res: Response, next: NextFunction) => {
    return res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action="/help" method="post">
            <label for="name">
                First name:
            </label>
            <br>
            <input type="text" id="name" name="name" value="">
            <br>
            <label for="email">
                Email:
            </label>
            <br>
            <input type="text" id="email" name="email" value="">
            <br>
            <label for="email">
                Password:
            </label>
            <br>
            <input type="password" id="password" name="password" value="">
            <br>
            <input type="submit" value="Submit">
          </form> 
    </body>
    </html>
    `)
};

export default {help} 