import { NextFunction, Request, Response } from 'express';


const notfound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found');


    return res.status(404).send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="/css/404.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
    `)
};

export default {notfound} 