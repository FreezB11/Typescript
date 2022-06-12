import { NextFunction, Request, Response } from 'express';


const register = (req: Request, res: Response, next: NextFunction) => {
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
    <form action="/register" method="POST">
        Enter email id 
        <br>
        <input type="email" name="email" id="email">
        <br>
        Enter password
        <br>
        <input type="password" name="password" id="password">
        <br>
        <br>
        <button>Submit</button>
    </form>
</body>
</html>
    `)
};

export default {register} 