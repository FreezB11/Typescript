import { NextFunction, Request, Response } from 'express';


const test = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found');


    return res.status(404).send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.socket.io/socket.io-3.0.0.js"></script>
</head>
<body>

    <ul>
        
    </ul>

    <input placeholder="message">
    <button>Send</button>
    
    <script>
    const socket = io('ws://localhost:6900/');

socket.on('message', text => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)

});

document.querySelector('button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('message', text)
    
}
    </script>

</body>
</html>
    `)
};

export default {test} 