import { NextFunction, Request, Response } from 'express';


const index = (req: Request, res: Response, next: NextFunction) => {
    return res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="/css/main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>0neN0TE</title>
</head>
<body>
  <nav class="container">
    <input id="nav-toggle" type="checkbox" />
    <div class="logo">Con<strong>flix</strong></div>
    <ul class="links">
      <li class="list">
        <a href="">Home</a>
        <div class="home_underline"></div>
      </li>
      <li class="list">
        <a href="">Products</a>
        <div class="home_underline"></div>
      </li>
      <li class="list">
        <a href="">About</a>
        <div class="home_underline"></div>
      </li>
      <button>Contact</button>
    </ul>
    <label for="nav-toggle" class="icon-burger">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </label>
  </nav>
  <div class="header"></div>



</body>
</html>
    `)
};

export default {index} 