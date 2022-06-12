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
        <form action="/register" method="post">
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
    error
</body>
</html>
    `)
};


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
<div class="overlay fade-out"></div>
<!-- Header -->
<header class="header">
  <div class="container">
    <nav class="flex flex-jc-sb flex-ai-c">
      <!-- Logo -->
      <div class="logo">
        <a href="#">
          <img src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_easybank-landing-page/main/images/logo-dark.svg" alt="EasyBank" />
        </a>
      </div>
      <!-- Links -->
      <div class="main-navgation hide-for-mobile">
        <a href="#">Home</a><a href="#">About</a><a href="#">Contact</a><a href="#">Blog</a><a href="#">Careers</a>
      </div>
      <!-- CTA Button -->
      <a href="#" class="button hide-for-mobile">Request Invite</a>
      <!-- Hamburger Menu -->
      <div class="menu hide-for-desktop">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  </div>
</header>
<main class="main">
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="hero-image"></div>
      <div class="hero-text">
        <h1>Next generation digital banking</h1>
        <p>
          Take your financial life online. Your Easybank account will be a
          one-stop-shop for spending, saving, budgeting, investing, and much
          more.
        </p>
        <a href="#" class="button">Request Invite</a>
      </div>
    </div>
  </section>
  <!-- Features Section -->
  <section class="features">
    <div class="container">
      <div class="section-heading">
        <h2>Why choose Easybank?</h2>
        <p>
          We leverage Open Banking to turn your bank account into your
          financial hub. Control your finances like never before.
        </p>
      </div>
      <div class="section-contant">
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">
              <img src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_easybank-landing-page/main/images/icon-online.svg" alt="Online Banking Icon" />
            </div>
            <div class="feature-title">
              <h3>Online Banking</h3>
            </div>
            <div class="feature-description">
              <p>
                Our modern web and mobile applications allow you to keep
                track of your finances wherever you are in the world.
              </p>
            </div>
          </div>
          <div class="feature">
            <div class="feature-icon">
              <img src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_easybank-landing-page/main/images/icon-budgeting.svg" alt="Simple Budgeting Icon" />
            </div>
            <div class="feature-title">
              <h3>Simple Budgeting</h3>
            </div>
            <div class="feature-description">
              <p>
                See exactly where your money goes each month. Receive
                notifications when you’re close to hitting your limits.
              </p>
            </div>
          </div>
          <div class="feature">
            <div class="feature-icon">
              <img src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_easybank-landing-page/main/images/icon-onboarding.svg" alt="Fast Onboarding Icon" />
            </div>
            <div class="feature-title">
              <h3>Fast Onboarding</h3>
            </div>
            <div class="feature-description">
              <p>
                We don’t do branches. Open your account in minutes online
                and start taking control of your finances right away.
              </p>
            </div>
          </div>
          <div class="feature">
            <div class="feature-icon">
              <img src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_easybank-landing-page/main/images/icon-api.svg" alt="Open API Icon" />
            </div>
            <div class="feature-title">
              <h3>Open API</h3>
            </div>
            <div class="feature-description">
              <p>
                Manage your savings, investments, pension, and much more
                from one account. Tracking your money has never been easier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-logo">
      <a href="#">
        <img src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_easybank-landing-page/main/images/logo-light.svg" alt="EasyBank Logo" />
      </a>
    </div>
    <div class="footer-social-media">
      <a href="#">
        <!-- <img src="./images/icon-facebook.svg" alt="Facebook" /> -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <title>Facebook</title>
          <path fill="#FFF" d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.793C0 19.506.494 20 1.104 20h9.58v-7.745H8.076V9.237h2.606V7.01c0-2.583 1.578-3.99 3.883-3.99 1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.597-1.496 1.47v1.928h2.989l-.39 3.018h-2.6V20h5.098c.608 0 1.102-.494 1.102-1.104V1.104C20 .494 19.506 0 18.896 0z" />
        </svg>
      </a>
      <a href="#">
        <!-- <img src="./images/icon-youtube.svg" alt="Youtube" /> -->
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20">
          <title>Youtube</title>
          <path fill="#FFF" d="M10.333 0c-5.522 0-10 4.478-10 10 0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10 0-5.522-4.477-10-10-10zm3.701 14.077c-1.752.12-5.653.12-7.402 0C4.735 13.947 4.514 13.018 4.5 10c.014-3.024.237-3.947 2.132-4.077 1.749-.12 5.651-.12 7.402 0 1.898.13 2.118 1.059 2.133 4.077-.015 3.024-.238 3.947-2.133 4.077zM8.667 8.048l4.097 1.949-4.097 1.955V8.048z" />
        </svg>
      </a>
      <a href="#">
        <!-- <img src="./images/icon-twitter.svg" alt="Twitter" /> -->
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18">
          <title>Twitter</title>
          <path fill="#FFF" d="M20.667 2.797a8.192 8.192 0 01-2.357.646 4.11 4.11 0 001.804-2.27 8.22 8.22 0 01-2.606.996A4.096 4.096 0 0014.513.873c-2.649 0-4.595 2.472-3.997 5.038a11.648 11.648 0 01-8.457-4.287 4.109 4.109 0 001.27 5.478A4.086 4.086 0 011.47 6.59c-.045 1.901 1.317 3.68 3.29 4.075a4.113 4.113 0 01-1.853.07 4.106 4.106 0 003.834 2.85 8.25 8.25 0 01-6.075 1.7 11.616 11.616 0 006.29 1.843c7.618 0 11.922-6.434 11.662-12.205a8.354 8.354 0 002.048-2.124z" />
        </svg>
      </a>
      <a href="#">
        <!-- <img src="./images/icon-pinterest.svg" alt="Pinterest" /> -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <title>Pinterest</title>
          <path fill="#FFF" d="M10 0C4.478 0 0 4.477 0 10c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.522 0 10-4.477 10-10S15.522 0 10 0z" />
        </svg>
      </a>
      <a href="#">
        <!-- <img src="./images/icon-instagram.svg" alt="Instagram" /> -->
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20">
          <title>Instagram</title>
          <path fill="#FFF" d="M10.333 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.976 1.409 4.1 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.058 4.042-.124 2.687-1.386 3.975-4.099 4.099-1.055.048-1.37.058-4.042.058-2.67 0-2.986-.01-4.04-.058-2.717-.124-3.976-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zm0-1.802C7.618 0 7.278.012 6.211.06 2.579.227.56 2.242.394 5.877.345 6.944.334 7.284.334 10s.011 3.057.06 4.123c.166 3.632 2.181 5.65 5.816 5.817 1.068.048 1.408.06 4.123.06 2.716 0 3.057-.012 4.124-.06 3.628-.167 5.651-2.182 5.816-5.817.049-1.066.06-1.407.06-4.123s-.011-3.056-.06-4.122C20.11 2.249 18.093.228 14.458.06 13.39.01 13.049 0 10.333 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.339-9.87a1.2 1.2 0 10-.001 2.4 1.2 1.2 0 000-2.4z" />
        </svg>
      </a>
    </div>
    <div class="footer-links col1">
      <a href="#">About Us</a>
      <a href="#">Contact</a>
      <a href="#">Blog</a>
    </div>
    <div class="footer-links col2">
      <a href="#">Careers</a>
      <a href="#">Support</a>
      <a href="#">Privacy Policy</a>
    </div>
    <div class="footer-cta">
      <a href="#" class="button">Request Invite</a>
    </div>
    <div class="footer-copyright">
      <p>© Easybank. All Rights Reserved</p>
    </div>
  </div>
  <div class="attribution">
    Challenge by
    <a href="https://www.frontendmentor.io?ref=challenge" class="outer-link" target="_blank">Frontend Mentor</a>. Coded by <span class="outer-link">Mohamed Aridah</span>.
    <ul class="social-media">
      <li>
        <a href="https://www.github.com/MohamedAridah" title="Visite My Github Account">
          <img src="https://raw.githubusercontent.com/devicons/devicon/1a5dbfa142a9677d6ddaa05d05f377ac23af9a2e/icons/github/github-original.svg" class="light" alt="My Github Account" />
        </a>
      </li>
      <li>
        <a href="https://www.codepen.io/FedLover" title="Visite My Codepen Account">
          <img src="https://raw.githubusercontent.com/devicons/devicon/1a5dbfa142a9677d6ddaa05d05f377ac23af9a2e/icons/codepen/codepen-plain.svg" class="light" alt="My codepen Account" />
        </a>
      </li>
      <li>
        <a href="https://www.frontendmentor.io/profile/MohamedAridah" title="Visite My Frontend Mentor Account">
          <img src="https://mohamedaridah.github.io/hosted-assets/FEM.png" alt="My Frontend Mentor Account" />
        </a>
      </li>
    </ul>
  </div>
</footer>

<script>
let menu = document.querySelector(".header .menu");
let navgation = document.querySelector(".header .main-navgation");
let links = document.querySelectorAll(".header .main-navgation a");
let overlay = document.querySelector(".overlay");

// Open Navgation Links For Tablets And Mobile.
function openMobileNavgation() {
  menu.classList.add("open"); // Open Menu
  navgation.classList.add("fade-in"); // Open Mobile Navgation
  controlOverlay("open"); // Open Overlay
}

// Close Navgation Links For Tablets And Mobile.
function closeMobileNavgation() {
  menu.classList.remove("open"); // Close Menu
  navgation.classList.remove("fade-in"); // Close Mobile Navgation
  controlOverlay("!open"); // Close Overlay
}

menu.addEventListener("click", () => {
  if (menu.classList.contains("open")) {
    closeMobileNavgation();
  } else {
    openMobileNavgation();
  }
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileNavgation();
  });
});

// Reset To Bars Icon Shape IF Width >= 1024px
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024 && menu.classList.contains("open")) {
    // Close Menu & Mobile Navgation & Overlay
    closeMobileNavgation();
  }
});

// Control [ Open || Close ] Overlay Function.
function controlOverlay(status) {
  /// status:
  /// open => Open Overlay
  /// anything else open => close Overlay
  if (status == "open") {
    overlay.classList.add("fade-in");
    overlay.classList.remove("fade-out");
  } else {
    overlay.classList.add("fade-out");
    overlay.classList.remove("fade-in");
  }
}

</script>

</body>
</html>
    `)
};


export default {register, notfound, index}