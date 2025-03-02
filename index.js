// Packages ---------------------------------------------------------------//---------------------------
import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import client from 'prom-client';

// DevTools ---------------------------------------------------------------//---------------------------
// import dotenv from 'dotenv';
// dotenv.config();
// Dev Project Commands
// - npm install dotenv
// - npm remove dotenv

// Variables -------------------------------------------------------------//----------------------------
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
const JWT_SECRET = process.env.JWT_SECRET;
const BACK_END = process.env.BACK_END;

// Application Configuration --------------------------------------------//----------------------------
const register = new client.Registry();
client.collectDefaultMetrics({ register });
// Create a custom gauge metric example (modify as needed)
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});
app.use((req, res, next) => {
  requestCounter.inc();
  next();
});
app.use(express.static('public', {
    setHeaders: (response, path, stat) => {
        if (path.endsWith('js')) {
            response.setHeader('Content-Type', 'application/javascript');
        }
    }
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
// Set the MIME type for JavaScript files
app.set('view engine', 'js');
app.engine('js', (_, options, callback) => {
    callback(null, options.source);
});
// Start The App
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

// User Pages -----------------------------------------------------------------//-----------------
app.get('/signup', (req, res) => {
    const modifiedHTML = `
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Shah's Profile</title>
                <link rel="stylesheet" href="style/style.css">
            </head>
            <div class="topnav">
                <div>
                    <a class="name"><p>Signup</p></a>
                </div>
                <div>
                    <div id="menu-bar">
                        <div id="menu-buttons">
                            <div class="dropdown">
                                <button class="dropbtn">Projects</button>
                                <div class="dropdown-content">
                                    <a href="/fastapi">FastAPI Server</a>
                                    <a href="/geolocate">Geo Location App</a>
                                    <a href="/shahgpt">ChatGPT Clone</a>
                                    <a href="/login">My Profile</a>
                                    <a href="/allPosts">Posts</a>
                                    <a href="https://grafana.shahsportfolio.online">Grafana</a>
                                    <a href="https://prometheus.shahsportfolio.online">Prometheus</a>
                                </div>
                            </div>
                            <button onclick="highlightButton(this)" class="menu"><a href="/contactpage">Contact</a></button>
                            <button onclick="highlightButton(this)" class="menu"><a href="/form">Email Form</a></button>
                            <button onclick="highlightButton(this)" class="menu"><a href="Shah_Solehria_Resume.pdf" target="_blank">Resume</a></button>
                        </div>
                    </div>
                </div>
                <div class="ham">
                    <button class="hamburger-menu">        
                        <div class="hamburger-line"></div>
                        <div class="hamburger-line"></div>
                        <div class="hamburger-line"></div>
                    </button>
                </div>
                <script src="js/hamburger.js"></script>
            </div>
            <body>
                <div class="bodymain">
                    <div class="pictcontPortal">
                        <div class="shahcont">
                            <h2>Sign Up Now to Get Started!</h2>
                        </div>
                    </div>           
                    <div class="secdivPortal">
                        <form id="signupForm">
                            <label for="email">Email:</label>
                            <input type="email" id="email" required><br><br>
                            <label for="password">Password:</label>
                            <input type="password" id="password" required><br><br>
                            <button type="submit">Create User</button>
                        </form>
                    </div>
                </div>
                <br></br>
                <div class="latnew">
                    <p>Fill out your email and password of choice to get started!</p>
                </div>
                <br></br>

                <div class="latnew"><h1>Check out This Site's GitHub Repos</h1></div>
                <div class="features1">
                    <div class="features-in">
                        <div class="fea-item1">
                            <a href="https://github.com/shahdevelopment/FrontEnd-shahdevelopment">
                                <img style='height: 100%; width: 100%; object-fit: contain' src="image/privcloud.png" width="343"
                                    height="300" alt="Front End" />
                            </a>
                            <div class="fea-1"><h3>Front-End Code</h3></div>
                        </div>
                        <div class="fea-item2">
                            <a href="https://github.com/shahdevelopment/BackEnd-shahdevelopment">
                                <img style='height: 100%; width: 100%; object-fit: contain' src="image/backend.jpg" alt="Back-End"
                                    class=feature />
                            </a>
                            <div class="fea-1"><h3>Back-End Code</h3></div>
                        </div>
                        <div class="fea-item3">
                            <a href="https://github.com/shahdevelopment/K8sDefinitions-shahdevelopment">
                                <img style='height: 100%; width: 100%; object-fit: contain' src="image/k8.png"
                                    alt="Kubernetes Defintion Files" class=feature />
                            </a>
                            <div class="fea-1"><h3>Kubernetes Defintions Code</h3></div>
                        </div>
                    </div>
                </div>
                <div class="footer">
                        <a href="/"><button class="dropbtn">Home</button></a>

                    <div class="footmenu">
                        <a href="mailto:shahjehan-solehria@hotmail.com"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/outlook.png"/></button></a>
                        <a href="https://github.com/shahdevelopment/"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/github.png"/></button></a>
                        <a href="https://fastapi-shah.herokuapp.com/docs"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/fastapi.png"/></button></a>
                    </div>
                </div>
                <script>
                    document.getElementById('signupForm').addEventListener('submit', async function(e) {
                        e.preventDefault();
                        const email = document.getElementById('email').value;
                        const password = document.getElementById('password').value;
                        
                        const response = await fetch('${BACK_END}/signup', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, password })
                        });
                        
                        const data = await response.json();
                        
                        if (response.ok) {
                            alert('Account Creation Successful!');
                            window.location.href = '/login' // Redirect after successful login
                        } else {
                            alert(data.message);
                        }
                    });
                </script>
            </body>
        </html>
    `
    res.send(modifiedHTML);
});
app.get('/login', (req, res) => {
    const modifiedHTML = `
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Shah's Profile</title>
                <link rel="stylesheet" href="style/style.css">
            </head>
            <body>
                <div class="topnav">
                    <div>
                        <a class="name"><p>Login</p></a>
                    </div>
                    <div>
                        <div id="menu-bar">
                            <div id="menu-buttons">
                                <div class="dropdown">
                                    <button class="dropbtn">Projects</button>
                                    <div class="dropdown-content">
                                        <a href="/fastapi">FastAPI Server</a>
                                        <a href="/geolocate">Geo Location App</a>
                                        <a href="/shahgpt">ChatGPT Clone</a>
                                        <a href="/login">My Profile</a>
                                        <a href="/allPosts">Posts</a>
                                        <a href="https://grafana.shahsportfolio.online">Grafana</a>
                                        <a href="https://prometheus.shahsportfolio.online">Prometheus</a>
                                    </div>
                                </div>
                                <button onclick="highlightButton(this)" class="menu"><a href="/contactpage">Contact</a></button>
                                <button onclick="highlightButton(this)" class="menu"><a href="/form">Email Form</a></button>
                                <button onclick="highlightButton(this)" class="menu"><a href="Shah_Solehria_Resume.pdf" target="_blank">Resume</a></button>
                            </div>
                        </div>
                    </div>
                    <div class="ham">
                        <button class="hamburger-menu">        
                            <div class="hamburger-line"></div>
                            <div class="hamburger-line"></div>
                            <div class="hamburger-line"></div>
                        </button>
                    </div>
                    <script src="js/hamburger.js"></script>
                </div>
                <div class="bodymain">
                    <div class="pictcontPortal">
                        <div class="shahcont">
                            <h2>Login Page</h2>
                        </div>
                    </div>           
                    <div class="secdivPortal">
                        <form id="loginForm">
                            <label for="email">Email:</label>
                            <input type="email" id="email" required><br><br>
                            <label for="password">Password:</label>
                            <input type="password" id="password" required><br><br>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                    <a href="/signup"><button class="dropbtn">Create An Account</button></a>
                </div>
                <div class="footer">
                        <a href="/"><button class="dropbtn">Home</button></a>
                    <div class="footmenu">
                        <a href="mailto:shahjehan-solehria@hotmail.com"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/outlook.png"/></button></a>
                        <a href="https://github.com/shahdevelopment/"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/github.png"/></button></a>
                        <a href="https://fastapi-shah.herokuapp.com/docs"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/fastapi.png"/></button></a>
                    </div>
                </div>
                <script>
                    document.getElementById('loginForm').addEventListener('submit', async function(e) {
                        e.preventDefault();
                        const email = document.getElementById('email').value;
                        const password = document.getElementById('password').value;

                        try {
                            const response = await fetch('${BACK_END}/login', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email, password })
                            });
                            
                            const data = await response.json();
                            if (response.ok) {
                                alert('Login successful!');
                                
                                // Set the cookie on the client-side

                                // Production // ---------------------------------- //
                                document.cookie = "authToken=" + data.token + "; path=/;" + " secure;" + " samesite=None;";

                                // ------------------------------------------------ //
                                // Development // --------------------------------- //
                                // document.cookie = "authToken=" + data.token + "; path=/;" + " samesite=None;";
                                // ------------------------------------------------ //
                                
                                // Redirect after successful login
                                window.location.href = '/selfie';
                            } else {
                                alert(data.message);
                            }
                        } catch (error) {
                            console.error('Error during login:', error);
                        }
                    });
                </script>
            </body>
        </html>
    `;
    res.send(modifiedHTML);
});
// app.get('/dashboard', (req, res) => {
//     const token = req.query.token;
//     if (!token) {
//         // console.log(token)
//         return res.status(401).json({ message: 'Access denied, token missing!' });
//     }
  
//     try {
//         const verified = jwt.verify(token, JWT_SECRET);
//         res.json({ message: 'Welcome to the dashboard!', user: verified });
//     } catch (err) {
//         console.log(JWT_SECRET)
//         console.log(token)
//         res.status(400).json({ message: 'Invalid token' });
//         // console.log(token);
//     }
// });
app.get('/geolocate', (req, res) => {
    const apiKey = process.env.api_key_new;
    const modifiedHTML = `
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>nodeJS and neDB Selfie App</title>
        <link rel="stylesheet" href="style/style.css">
        <script src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places"></script>
    </head>
    <div class="topnav">
        <div>
            <a class="name" href="/">
                <p>Shah Solehria</p>
            </a>
            <h2 class="title">Cloud | DevOps | Data</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                            <a href="/login">My Profile</a>
                            <a href="/allPosts">Posts</a>
                            <a href="https://grafana.shahsportfolio.online">Grafana</a>
                            <a href="https://prometheus.shahsportfolio.online">Prometheus</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/contactpage">Contact</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/form">Email Form</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="Shah_Solehria_Resume.pdf"
                            target="_blank">Resume</a></button>
                </div>
            </div>
        </div>
        <div class="ham">
            <button class="hamburger-menu">        
                <div class="hamburger-line"></div>
                <div class="hamburger-line"></div>
                <div class="hamburger-line"></div>
            </button>
        </div>
        <script src="js/hamburger.js"></script>
    </div>
    <body>
        <div class="geoSelfie">
            <div class="geobuttonDiv">
                <h1>Location API w/ GCP Google Maps Integration</h1>
                <br />
                <br />
                <button id="locate">Locate me</button>
                <p id="geolabel">
                </p>
                <button id="geowipe">Clear Location</button>
                <br />
                <br />
                <br />
                <script src="js/geo.js"></script>
            </div>
        </div>
    </body>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="footer">
        <a href="/"><button class="dropbtn">Home</button></a>
        <div class="footmenu">
            <a href="mailto:shahjehan-solehria@hotmail.com"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/outlook.png"/></button></a>
            <a href="https://github.com/shahdevelopment/"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/github.png"/></button></a>
            <a href="https://fastapi-shah.herokuapp.com/docs"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/fastapi.png"/></button></a>
        </div>
    </div>
    </html>
    `;
    res.send(modifiedHTML);
});
app.get('/shahgpt', (req, res) => {
    const modifiedHTML = `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>JavaScript ChatGPT Clone</title>
            <link rel="stylesheet" href="style/chat_style.css">
        </head>
        <body>
            <section class="side-bar">
                <button><a href="/">Home</a></button>
                <button class="new_chat">New chat</button>
                <div class="history"></div>
                <div class="nav">
                    <p>Made by Shah</p>
                </div>
            </section>
            <section class="main">
                <h1>ShahGPT</h1>
                <p id="output"></p>
                <div class="bottom-section">
                    <div class="input-container">
                        <input />
                        <div id="submit">➢</div>
                    </div>
                </div>
                <p class="info">Chat GPT March 14 Version. Free Research Preview. Our goal is to make AI systems more natural
                    and
                    safe to interact with. Your feeback will help us improve.</p>
            </section>
        </body>
        <script>
            const submitButton = document.querySelector('#submit');
            const outPutElement = document.querySelector('#output');
            const inputElement = document.querySelector('input');
            const historyElement = document.querySelector('.history');
            const buttonElement = document.querySelector('.new_chat');
            const inputContainer = document.querySelector('.input-container');

            function changeInput(value) {
                const inputElement = document.querySelector('input');
                inputElement.value = value;
            }

            async function getMessage() {
                console.log('Clicked');
                alert('Sending Chat.......');
                const baseUrl = '${BACK_END}/chat'
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [{ role: 'user', content: inputElement.value }],
                        max_tokens: 100
                    })
                };
                fetch(baseUrl, options)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Error: ' + response.status);
                        }
                    })
                    .then(data => {
                        if (data.status === 200 && data.message) {
                            outPutElement.textContent = data.message;

                            if (data.message && inputElement.value) {
                                const pElement = document.createElement('p');
                                pElement.textContent = inputElement.value;
                                pElement.addEventListener('click', () => changeInput(pElement.textContent));
                                historyElement.append(pElement);
                            }
                        } else {
                            console.error("Unexpected API response structure:", data);
                            outPutElement.textContent = "Error: No response from AI.";
                        }
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
            inputContainer.addEventListener('keypress', function (event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    getMessage();
                }
            });
            submitButton.addEventListener('click', getMessage);
            function clearInput() {
                inputElement.value = '';
            }
            buttonElement.addEventListener('click', clearInput);
        </script>
    </html>
    `;
    res.send(modifiedHTML);
});
app.get('/contactpage', (req, res) => {
    const modifiedHTML = `
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Contact Page</title>
        <link rel="stylesheet" href="style/style.css">
    </head>
    <div class="topnav">
        <div>
            <a class="name" href="/"><p>Shah Solehria</p></a>
            <h2 class="title">Cloud | DevOps | Data</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                            <a href="/login">My Profile</a>
                            <a href="/allPosts">Posts</a>
                            <a href="https://grafana.shahsportfolio.online">Grafana</a>
                            <a href="https://prometheus.shahsportfolio.online">Prometheus</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/contactpage">Contact</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/form">Email Form</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="Shah_Solehria_Resume.pdf" target="_blank">Resume</a></button>
                </div>
            </div>
        </div>
        <div class="ham">
            <button class="hamburger-menu">        
                <div class="hamburger-line"></div>
                <div class="hamburger-line"></div>
                <div class="hamburger-line"></div>
            </button>
        </div>
        <script src="js/hamburger.js"></script>
    </div>
    <div class="workexp">
        <div class="workexpc">
            <h1> Contact Page</h1>
            <div class="features1">
                <div class="features-in">
                    <div class="fea-item1">
                        <a href="mailto:shahjehan-solehria@hotmail.com" id="email">
                            <img style='height: 100%; width: 100%; object-fit: contain' src="image/outlook.png" width="343"
                                height="300" alt="Email Link" />
                        </a>
                        <div class="fea-1"><h3>Email</h3></div>
                    </div>
                    <div class="fea-item2">
                        <a href="https://www.linkedin.com/in/shahsolehria/" target="_blank">
                            <img style='height: 100%; width: 100%; object-fit: contain' src="image/linkedin.jpg" width="343"
                                height="300" alt="linkedIn" />
                        </a>
                        <div class="fea-1"><h3>LinkedIn</h3></div>
                    </div>
                    <div class="fea-item3">
                        <img style='height: 100%; width: 100%; object-fit: contain' src="image/phone.webp" width="350"
                            height="300" alt="Phone Number" id="phonum" /></a>
                        <div class="fea-1"><h3>+1 (604) 358-1493</h3></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <a href="/"><button class="dropbtn">Home</button></a>
        <div class="footmenu">
            <a href="mailto:shahjehan-solehria@hotmail.com"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/outlook.png"/></button></a>
            <a href="https://github.com/shahdevelopment/"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/github.png"/></button></a>
            <a href="https://fastapi-shah.herokuapp.com/docs"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/fastapi.png"/></button></a>
        </div>
    </div>
    </html>
    `;
    res.send(modifiedHTML);
});
app.get('/fastapi', (req, res) => {
    const modifiedHTML = `
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>FastAPI Server</title>
        <link rel="stylesheet" href="style/style.css">
    </head>
    <div class="topnav">
        <div>
            <a class="name" href="/"><p>Shah Solehria</p></a>
            <h2 class="title">Cloud | DevOps | Data</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                            <a href="/login">My Profile</a>
                            <a href="/allPosts">Posts</a>
                            <a href="https://grafana.shahsportfolio.online">Grafana</a>
                            <a href="https://prometheus.shahsportfolio.online">Prometheus</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/contactpage">Contact</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/form">Email Form</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="Shah_Solehria_Resume.pdf" target="_blank">Resume</a></button>
                </div>
            </div>
        </div>
        <div class="ham">
            <button class="hamburger-menu">        
                <div class="hamburger-line"></div>
                <div class="hamburger-line"></div>
                <div class="hamburger-line"></div>
            </button>
        </div>
            <script src="js/hamburger.js"></script>
    </div>
    <div class="workexp">
        <div class="workexpc">
            <h1>FastAPI & PostgreSQL API</h1>
            <h2>Endpoint > https://fastapi-shah.herokuapp.com</h2>
            <ul>
                <li>
                    OAuth2 authenticated Python FastAPI social-media application backend running on Heroku with a PostgreSQL Dyno.
                </li>
                <li>
                    Validated & parameterized i/o for path operations achieving desired data states in PostgreSQL.
                </li>
                <li>
                    Secured code in GitHub using envrionment variables & online with access-controlled Nginx Reverse Proxy.
                </li>
                <li>
                    Migrated to front-end, back-end, & Nginx with Docker Compose configuration.
                </li>
                <li>
                    Implemented testing of API path operations with test API calls integrated into Docker Compose.
                </li>                
                <li>
                    SQLalchemy ORM used for schema deployment and Alembic used for DB backup and automation.
                </li>
                <li>
                    Postman used for test, development, authentication, & environment variables.
                </li>
            </ul>
        </div>
    </div>
    <br></br>
    <br></br>
    <br></br>
    <div class="latnew"><h1>Quick Links</h1></div>
    <br></br>
    <div class="features1">
        <div class="features-in">
            <div class="fea-item1">
                <a href="https://github.com/shahdevelopment">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/github.png" width="343"
                        height="300" alt="GitHub Link" />
                </a>
                <div class="fea-1"><h3>Shah's GitHub</h3></div>
            </div>
            <div class="fea-item2">
                <a href="https://fastapi-shah.herokuapp.com/docs">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/fastapi-2.png" width="343"
                        height="300" alt="FastAPI" />
                </a>
                <div class="fea-1"><h3>FastAPI Docs</h3></div>
            </div>
            <div class="fea-item3">
                <a href="/contactpage">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/contact.png" width="343"
                        height="300" alt="Contact Me" />
                </a>
                <div class="fea-1"><h3>Contact Me</h3></div>
            </div>
        </div>
    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <div class="footer">
        <a href="/"><button class="dropbtn">Home</button></a>
        <div class="footmenu">
            <a href="mailto:shahjehan-solehria@hotmail.com"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/outlook.png"/></button></a>
            <a href="https://github.com/shahdevelopment/"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/github.png"/></button></a>
            <a href="https://fastapi-shah.herokuapp.com/docs"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/fastapi.png"/></button></a>
        </div>
    </div>
    </html>
    `;
    res.send(modifiedHTML);
});
app.get('/', (req, res) => {
    const modifiedHTML = `
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Shah's Profile</title>
        <link rel="stylesheet" href="style/style.css">
    </head>
    <div class="topnav">
        <div>
            <a class="name" href="/"><p>Shah Solehria</p></a>
            <h2 class="title">Cloud | DevOps | Data</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                            <a href="/login">My Profile</a>
                            <a href="/allPosts">Posts</a>
                            <a href="https://grafana.shahsportfolio.online">Grafana</a>
                            <a href="https://prometheus.shahsportfolio.online">Prometheus</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/contactpage">Contact</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/form">Email Form</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="Shah_Solehria_Resume.pdf" target="_blank">Resume</a></button>
                </div>
            </div>
        </div>
        <div class="ham">
            <button class="hamburger-menu">        
                <div class="hamburger-line"></div>
                <div class="hamburger-line"></div>
                <div class="hamburger-line"></div>
            </button>
        </div>
        <script src="js/hamburger.js"></script>
    </div>
    <body>
    <div class="bodymain">
        <div class="pictcont">
            <div class="shahcont">
                <img style='height: 100%; width: 100%; object-fit: contain' src="image/shah.jpg" />
            </div>
        </div>
        <div class="secdiv">
            <h1>Abstract</h1>
            <p>Over half a decade of experience with full stack web applications and development for business processes!</p>            
            <div class="btn-shadow"><a href="/contactpage" class="btn">Reach Out</a></div>
        </div>
    </div>
    <br></br>
    <div class="latnew">

        <h1>Site Overview</h1>
        <p>On the top right of the page is a hamburger menu used to navigate the site:</p>
        <ul>
            <li>Projects: Selfie App, Geolocation App, ChatGPT App, & my FastAPI App.</li>
            <li>Resume: Download a PDF copy of my resume to your screen.</li>
            <li>Contact: Links to my communication platforms.</li>
        </ul>

        <h1>Site CI/CD & Security Evolution</h1>
        <p>Project began with a simple static HTML, CSS, & JS site originally deployed on GitHub pages. Today the site is full CI/CD, KOPS Infrastructure as Code (IaC), microservices Kubernetes (K8s) deployment in AWS cloud!</p>

        <p>Major revisions have been categorized into four categories:</p>
        <ul>
            <li>Web Development</li>
            <li>Site Reliability Engineering</li>
            <li>DevOps Engineering / Automation</li>
            <li>Security</li>
        </ul>

        <h2>Web Development</h2>
        <p>Portfolio site notable features include:</p>
        <ul>
            <li>Downloadable PDF Resume.</li>
            <li>Hover-sensing dynamic GUI including: opacity control, scaling, & drop-down lists.</li>
            <li>A selfie project that uses your computers camera to take pictures & data storing it in a NEDB database.</li>
            <li>Ability to view and delete saved posts.</li>
            <li>A geolocation API integration with GCP Maps API.</li>
            <li>ChatGPT clone using the ChatGPT API.</li>
        </ul>
        <p>The application is containerized in Docker runtime with separate containers for the frontend and backend. To bolster security, keys are relocated to the backend Node server (facilitating frontend API calls). Docker images are archived on Docker Hub. Code is optimized for GitHub by concealing passwords & usernames for enhanced at-rest code security.</p>

        <h2>Site Reliability Engineering</h2>
        <p>Installed and setup a Jenkins server and automated the deployment pipeline from GitHub commit to Kubernetes cluster deployment on AWS cloud; This includes a multi-stage Jenkinsfile, local SonarQube server for code testing, Docker image builds, local container execution/ testing, build notifications on Slack, & image push to Docker Hub. Passwords and usernames are securely stored in Jenkins.</p>
        <p>The application was adapted for Kubernetes with manually crafted definition files. Infrastructure as Code (IaC) AWS backend for the Kubernetes cluster was developed using KOPS in AWS.</p>
        <p>Code and Jenkinsfile are updated and pushed to GitHub this triggers the Jenkins build.</p>
        
        <h2>DevOps Engineering / Automation</h2>
        <p>CI/CD pipeline script in Jenkins pipeline script (Jenkinsfile) involves workspace cleanup, code testing in SonarQube server, GitHub Code Pull, Docker image build, container execution/ testing on Jenkins slave, JS path operation validation, image push to Docker Hub, & Kubernetes build with Helm.</p>
        <p>The live site is optimized for costs using KOPS (IaC) deployment in AWS that enables scaling of instances to zero when not in use, & scaling instances to default levels (Creates master & slave EC2 instances & updates DNS).</p>

        <h2>Security</h2>
        <p>The code maintains parameterized variables that are pulled and parsed from the builds centralized Jenkins multi line string object/file that protects at-rest code for:</p>
        <ul>
            <li>Dockerfiles</li>
            <li>Jenkinsfiles (Groovy)</li>
            <li>Helm</li>
            <li>Kubernetes secrets</li>
        </ul>
        <p>JS programs parameterize and secure code by pulling variable values from container envrionment variables.</p>
        <h3>Nginx Ingress Controller</h3>
        <p>AWS ELB Nginx Ingress Controller secured with http origin valiadation, CORS, redirects, rate limiting, & TLS/SSL.</p>
        </br>
        </br>
        <h1>Notable Academia</h1>
    </div>
    <div class="galleryContainer">
        <div class="slideShowContainer">
            <div id="playPause" onclick="playPauseSlides()"></div>
            <div onclick="plusSlides(-1)" class="nextPrevBtn leftArrow"><span class="arrow arrowLeft"></span></div>
            <div onclick="plusSlides(1)" class="nextPrevBtn rightArrow"><span class="arrow arrowRight"></span></div>
            <div class="captionTextHolder"><p class="captionText slideTextFromTop"></p></div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/docker&dotnetcore.png">1366X768
                <p class="captionText">Docker and .NET Core</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/websecurity&bugbounty.jpg">1366X768
                <p class="captionText">Web Security & Bug Bounty - 2023</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/DevOps.jpg">1366X768
                <p class="captionText">DevOps Beginners to Advanced with Projects</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/awsSArc.jpg">1366X768
                <p class="captionText">AWS Solutions Architect</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/Az303.jpg">
                <p class="captionText">Azure Architect</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/AzureAZ104.jpg">
                <p class="captionText">Azure Administrator</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/Diploma.jpg">
                <p class="captionText">Diploma in Business Information Technology Management</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/BBA.jpg">1366X768
                <p class="captionText">Bachelor of Business Administration (BBA)</p>
            </div>          
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/Certificate Coding.jpg">
                <p class="captionText">JS Coding</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/Certificate Coding 2.jpg">
                <p class="captionText">JS Coding II</p>
            </div>   
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/2020_security_awareness.png">1366X768
                <p class="captionText">2020 Security Awareness</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/gdpr.png">1366X768
                <p class="captionText">GDPR</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/hipaa.png">1366X768
                <p class="captionText">HIPAA for Business Associates</p>
            </div>      
        </div>
        <div id="dotsContainer"></div>
    </div>
    <script src="js/myScript.js"></script>
    <br></br>

    <div class="latnew"><h1>Check out This Site's GitHub Repos</h1></div>
    <div class="features1">
        <div class="features-in">
            <div class="fea-item1">
                <a href="https://github.com/shahdevelopment/FrontEnd-shahdevelopment">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/privcloud.png" width="343"
                        height="300" alt="Front End" />
                </a>
                <div class="fea-1"><h3>Front-End Code</h3></div>
            </div>
            <div class="fea-item2">
                <a href="https://github.com/shahdevelopment/BackEnd-shahdevelopment">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/backend.jpg" alt="Back-End"
                        class=feature />
                </a>
                <div class="fea-1"><h3>Back-End Code</h3></div>
            </div>
            <div class="fea-item3">
                <a href="https://github.com/shahdevelopment/K8sDefinitions-shahdevelopment">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/k8.png"
                        alt="Kubernetes Defintion Files" class=feature />
                </a>
                <div class="fea-1"><h3>Kubernetes Defintions Code</h3></div>
            </div>
        </div>
    </div>
    </body>
    <div class="footer">
        <div class="footmenu">
            <a href="mailto:shahjehan-solehria@hotmail.com"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/outlook.png"/></button></a>
            <a href="https://github.com/shahdevelopment/"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/github.png"/></button></a>
            <a href="https://fastapi-shah.herokuapp.com/docs"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/fastapi.png"/></button></a>
        </div>
    </div>
    </html>
    `;
    res.send(modifiedHTML);
});
app.get('/selfie', (req, res) => {
    const token = req.cookies.authToken;
    const data = `'${token}'`
    const modifiedHTML = `
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>nodeJS and neDB Selfie App</title>
            <link rel="stylesheet" href="style/style.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
        </head>
        <div class="topnav">
            <div>
                <a class="name" href="/"><p>Shah Solehria</p></a>
                <h2 class="title">Cloud | DevOps | Data</h2>
            </div>
            <div>
                <div id="menu-bar">
                    <div id="menu-buttons">
                        <div class="dropdown">
                            <button class="dropbtn">Projects</button>
                            <div class="dropdown-content">
                                <a href="/fastapi">FastAPI Server</a>
                                <a href="/geolocate">Geo Location App</a>
                                <a href="/shahgpt">ChatGPT Clone</a>
                                <a href="/login">My Profile</a>
                                <a href="/allPosts">Posts</a>
                                <a href="https://grafana.shahsportfolio.online">Grafana</a>
                                <a href="https://prometheus.shahsportfolio.online">Prometheus</a>
                            </div>
                        </div>
                        <button onclick="highlightButton(this)" class="menu"><a href="/contactpage">Contact</a></button>
                        <button onclick="highlightButton(this)" class="menu"><a href="/form">Email Form</a></button>
                        <button onclick="highlightButton(this)" class="menu"><a href="Shah_Solehria_Resume.pdf" target="_blank">Resume</a></button>
                    </div>
                </div>
            </div>
            <div class="ham">
                <button class="hamburger-menu">            
                    <div class="hamburger-line"></div>
                    <div class="hamburger-line"></div>
                    <div class="hamburger-line"></div>
                </button>
            </div>
            <script src="js/hamburger.js"></script>
        </div>
        <body>
            <div class="geoSelfie">
                <div class="geobuttonDiv">
                    <h1>Selfie App (**Antivirus may block this functionality)</h1>
                    <br />
                    <br />
                    <br />
                    <button onclick="startVideo()" id="startvideo">Turn Camera On</button>
                    <br />
                    <br />
                    <button onclick="stopVideo()" id="stopvideo">Turn Camera Off</button>
                    <br />
                    <br />
                    <input id="mood" value="Enter your mood!" />
                    <br />
                    <br />
                    <button id="submit">Submit</button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div><a href="/data" class="geo">Data Repo</a></div>
                </div>
                <div class="cameraDiv"><div id="cameraid"><video id="video" srcObject="MediaStream"></video></div></div>
            </div>
        </body>
        <div class="footer">
            <a href="/"><button class="dropbtn">Home</button></a>
            <div class="footmenu">
                <a href="mailto:shahjehan-solehria@hotmail.com"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/outlook.png"/></button></a>
                <a href="https://github.com/shahdevelopment/"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/github.png"/></button></a>
                <a href="https://fastapi-shah.herokuapp.com/docs"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/fastapi.png"/></button></a>
            </div>
        </div>
        <script>
        function setup() {
            var startVideo = document.getElementById('startvideo');
            var stopVideo = document.getElementById('stopvideo');
            var run = "no"
            const button = document.getElementById('submit');
            const token = ${data}
            const jwtoptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })  // Correctly stringify the token as an object
            };
            button.addEventListener('click', async event => {
                const jwtdata = await fetch('${BACK_END}/jwtDecode', jwtoptions);
                const datajwt = await jwtdata.json();
                if (datajwt) {
                    const mood = document.getElementById('mood').value;
                    video.loadPixels();
                    const image64 = video.canvas.toDataURL();
                    const id = datajwt.id;

                    const data = { mood, image64, id };
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ data })
                    };
                    var response = await fetch('${BACK_END}/api', options);
                    const postRes = await response.json();
                    alert("Post Submitted!");

                    // const redirecturl = "/selfie?token=";
                    // const result = redirecturl + token;        
                    // // Redirect to dashboard

                    // window.location.href = result; // Redirect after successful login
                } else {
                    alert(postRes.message);
                }

            });
            startVideo.addEventListener('click', function () {
                console.log(startVideo)
                if (run === "yes") {
                    alert("Camera Already Running!");
                } else {
                    noCanvas();
                    video = createCapture(VIDEO);
                    video.parent("cameraid");
                    run = "yes";
                }
            });
            stopVideo.addEventListener("click", function () {
                alert("Camera will be stopped........");
                video.stop();
                video.remove();
                run = "no";
            });
        }
        </script>
    </html>
    `;
    // const token = req.query.token;
    if (!token) {
        // res.status(401).json({ message: 'Access denied, token missing!' });
        res.redirect('/login'); 
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        // res.json({ message: 'Welcome to the dashboard!', user: verified });
        res.send(modifiedHTML);
    } catch (err) {
        console.log(JWT_SECRET)
        console.log(token)
        res.status(400).json({ message: 'Invalid token' });
        // console.log(token);
    }
});
app.get('/data', (req, res) => {
    const token = req.cookies.authToken;
    const url = `'${BACK_END}/jwtDecode'`
    const data = `'${token}'`
    const modifiedHTML = `
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Skill | Project Work</title>
            <link rel="stylesheet" href="style/style.css">
        </head>
        <div class="topnav">
            <div>
                <a class="name" href="/"><p>Shah Solehria</p></a>
                <h2 class="title">Cloud | DevOps | Data</h2>
            </div>
            <div>
                <div id="menu-bar">
                    <div id="menu-buttons">
                        <div class="dropdown">
                            <button class="dropbtn">Projects</button>
                            <div class="dropdown-content">
                                <a href="/fastapi">FastAPI Server</a>
                                <a href="/geolocate">Geo Location App</a>
                                <a href="/selfie">Selfie App</a>
                                <a href="/shahgpt">ChatGPT Clone</a>
                                <a href="/login">My Profile</a>
                                <a href="/allPosts">Posts</a>
                                <a href="https://grafana.shahsportfolio.online">Grafana</a>
                                <a href="https://prometheus.shahsportfolio.online">Prometheus</a>
                            </div>
                        </div>
                        <button onclick="highlightButton(this)" class="menu"><a href="/contactpage">Contact</a></button>
                        <button onclick="highlightButton(this)" class="menu"><a href="/form">Email Form</a></button>
                        <button onclick="highlightButton(this)" class="menu"><a href="Shah_Solehria_Resume.pdf" target="_blank">Resume</a></button>
                    </div>
                </div>
            </div>
            <div class="ham">
                <button class="hamburger-menu">
                    <div class="hamburger-line"></div>
                    <div class="hamburger-line"></div>
                    <div class="hamburger-line"></div>
                </button>
            </div>
            <script src="js/hamburger.js"></script>
        </div>
        <body>
            <div class="workexp">
                <div class="workexpc">
                    <h1>Selfie App Logs</h1>
                    <div><a href="/selfie" class="geo">Create Capture</a></div>
                    <script src="js/logs.js"></script>
                    <script>
                        async function getId() {
                            const token = ${data}
                            const url = ${url}
                            const jwtoptions = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                credentials: 'include',
                                body: JSON.stringify({ token }),  // Correctly stringify the token as an object
                            };
                            const jwtdata = await fetch(url, jwtoptions);
                            const datajwt = await jwtdata.json();
                            const userId = datajwt.id;
                            getData(userId, '${BACK_END}')
                        }
                        getId()
                    </script>
                </div>
                <div id="log_div">
            </div>
        </body>
        <div class="footer">
            <a href="/"><button class="dropbtn">Home</button></a>
            <div class="footmenu">
                <a href="mailto:shahjehan-solehria@hotmail.com"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/outlook.png"/></button></a>
                <a href="https://github.com/shahdevelopment/"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/github.png"/></button></a>
                <a href="https://fastapi-shah.herokuapp.com/docs"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/fastapi.png"/></button></a>
            </div>
        </div>
    </html>
    `;
    const verified = jwt.verify(token, JWT_SECRET);
    res.send(modifiedHTML);
});
app.get('/form', (req, res) =>{
    const url = `'${BACK_END}/email'`;
    if (!BACK_END) {
        // res.status(401).json({ message: 'Access denied, token missing!' });
        return res.status(400).json({ message: 'Back Endpoint Not Loaded!' });
    }
    const modifiedHTML = `
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Skill | Project Work</title>
            <link rel="stylesheet" href="style/style.css">
        </head>
        <div class="topnav">
            <div>
                <a class="name" href="/"><p>Shah Solehria</p></a>
                <h2 class="title">Cloud | DevOps | Data</h2>
            </div>
            <div>
                <div id="menu-bar">
                    <div id="menu-buttons">
                        <div class="dropdown">
                            <button class="dropbtn">Projects</button>
                            <div class="dropdown-content">
                                <a href="/fastapi">FastAPI Server</a>
                                <a href="/geolocate">Geo Location App</a>
                                <a href="/shahgpt">ChatGPT Clone</a>
                                <a href="/login">My Profile</a>
                                <a href="/allPosts">Posts</a>
                                <a href="https://grafana.shahsportfolio.online">Grafana</a>
                                <a href="https://prometheus.shahsportfolio.online">Prometheus</a>
                            </div>
                        </div>
                        <button onclick="highlightButton(this)" class="menu"><a href="/contactpage">Contact</a></button>
                        <button onclick="highlightButton(this)" class="menu"><a href="Shah_Solehria_Resume.pdf" target="_blank">Resume</a></button>
                    </div>
                </div>
            </div>
            <div class="ham">
                <button class="hamburger-menu">
                    <div class="hamburger-line"></div>
                    <div class="hamburger-line"></div>
                    <div class="hamburger-line"></div>
                </button>
            </div>
            <script src="js/hamburger.js"></script>
        </div>
        <body>
            <div class="submit-form">
                <h1>Appointment Booking</h1>
                <form id="contactForm">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required><br><br>
    
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required><br><br>
    
                    <label for="date">Date:</label>
                    <input type="date" id="date" name="date" required><br><br>
    
                    <label for="time">Time:</label>
                    <input type="time" id="time" name="time" required><br><br>
    
                    <label for="message">Message:</label><br>
                    <textarea id="message" name="message" rows="4" cols="50" required></textarea><br><br>
    
                    <button type="submit">Submit</button>
                </form>
                <script>
                    document.getElementById('contactForm').addEventListener('submit', function(event) {
                        event.preventDefault(); // Prevent form submission
    
                        const formData = new FormData(this); // Get form data
    
                        // Convert form data to object
                        const formDataObject = {};
                        formData.forEach(function(value, key) {
                            formDataObject[key] = value;
                        });
                        alert('Sending email.......');
                        const baseUrl = ${url};
                        const options = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({formDataObject})
                        };
                        fetch(baseUrl, options)
                            .then(response => {
                                if (response.ok) {
                                    alert("Appointment Booking Request Sent!")
                                } else {
                                    throw new Error('Error: ' + response.status);
                                }
                            })
                            .catch(error => {
                                console.error('There was a problem with the fetch operation:', error);
                            });
                    });
                </script>
            </div>
        </body>
        <div class="footer">
            <a href="/"><button class="dropbtn">Home</button></a>
            <div class="footmenu">
                <a href="mailto:shahjehan-solehria@hotmail.com"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/outlook.png"/></button></a>
                <a href="https://github.com/shahdevelopment/"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/github.png"/></button></a>
                <a href="https://fastapi-shah.herokuapp.com/docs"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/fastapi.png"/></button></a>
            </div>
        </div>    
        </html>
    `;
    res.send(modifiedHTML);
});
app.get('/allPosts', async (req, res) => {
    const modifiedHTML = `
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Skill | Project Work</title>
            <link rel="stylesheet" href="style/style.css">
        </head>
        <div class="topnav">
            <div>
                <a class="name" href="/"><p>Shah Solehria</p></a>
                <h2 class="title">Cloud | DevOps | Data</h2>
            </div>
            <div>
                <div id="menu-bar">
                    <div id="menu-buttons">
                        <div class="dropdown">
                            <button class="dropbtn">Projects</button>
                            <div class="dropdown-content">
                                <a href="/fastapi">FastAPI Server</a>
                                <a href="/geolocate">Geo Location App</a>
                                <a href="/selfie">Selfie App</a>
                                <a href="/shahgpt">ChatGPT Clone</a>
                                <a href="/login">My Profile</a>
                                <a href="/allPosts">Posts</a>
                                <a href="https://grafana.shahsportfolio.online">Grafana</a>
                                <a href="https://prometheus.shahsportfolio.online">Prometheus</a>
                            </div>
                        </div>
                        <button onclick="highlightButton(this)" class="menu"><a href="/contactpage">Contact</a></button>
                        <button onclick="highlightButton(this)" class="menu"><a href="/form">Email Form</a></button>
                        <button onclick="highlightButton(this)" class="menu"><a href="Shah_Solehria_Resume.pdf" target="_blank">Resume</a></button>
                    </div>
                </div>
            </div>
            <div class="ham">
                <button class="hamburger-menu">
                    <div class="hamburger-line"></div>
                    <div class="hamburger-line"></div>
                    <div class="hamburger-line"></div>
                </button>
            </div>
            <script src="js/hamburger.js"></script>
        </div>
        <body>
            <div class="workexp">
                <div class="workexpc">
                    <h1>User Posts</h1>
                    <script src="js/allLogs.js"></script>
                    <script>getData('${BACK_END}')</script>
                </div>
                <div id="log_div">
            </div>
        </body>
        <div class="footer">
            <a href="/"><button class="dropbtn">Home</button></a>
            <div class="footmenu">
                <a href="mailto:shahjehan-solehria@hotmail.com"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/outlook.png"/></button></a>
                <a href="https://github.com/shahdevelopment/"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/github.png"/></button></a>
                <a href="https://fastapi-shah.herokuapp.com/docs"><button><img style='max-height: 50px; max-width: 50px; object-fit: contain' src="image/fastapi.png"/></button></a>
            </div>
        </div>
        </html>
    `;
    res.send(modifiedHTML);
});

// Security Redirect -----------------------------------------------------------------//-----------------
app.get('/blocked', (req, res) => {
    const modifiedHTML = `
        <html>
        <head>
        <title>404 - Are you sure you want to go there?</title>
        </head>
        <body>
        <h1>Are you sure you want to go there?</h1>
        <p>You're here because we think that is a really bad idea.</p>
        <hr>
        <p>Varnish cache server</p>
        </body>
        </html>
    `;
    res.send(modifiedHTML);
})

// Metrics Endpoints ---------------------------------------------------------------//-----------------
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});  
app.get('/health', (req, res) => {
    const message = "Healthy!";
    res.status(200).json({ info: message })
})
app.get('/ready', (req, res) => {
    const message = "Ready!";
    res.status(200).json({ info: message })
})

// ---------------------------------------------------------------------------------//-----------------
// ---------------------------------------------------------------------------------//-----------------