const express = require('express');
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Set the MIME type for JavaScript files
app.set('view engine', 'js');
app.engine('js', (_, options, callback) => {
    callback(null, options.source);
});

// require('dotenv').config();

app.use(express.static('public', {
    setHeaders: (response, path, stat) => {
        if (path.endsWith('js')) {
            response.setHeader('Content-Type', 'application/javascript');
        }
    }
}));
app.use(express.json({ limit: '1mb' }));

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
// #######################################################################
// app.get('/', (req, res) => {
//     res.redirect('/index');
// });
app.get('/health', (req, res) => {
    const message = "Healthy!";
    res.status(200).json({ info: message })
})
app.get('/ready', (req, res) => {
    const message = "Ready!";
    res.status(200).json({ info: message })
})
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
                        <a href="/selfie">Selfie App</a>
                        <a href="/shahgpt">ChatGPT Clone</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/contactpage">Contact</a></button>
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
        <script type="application/javascript" src="js/app.js"></script>
    </body>
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
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
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
    <div class="workexp">
        <div class="workexpc">
            <h1> Contact Page</h1>
            <div class="features1">
                <div class="features-in">
                    <div class="fea-item1">
                        <a href="mailto:shahjehan-solehria@hotmail.com" id="email">
                            <img style='height: 100%; width: 100%; object-fit: contain' src="image/email.jpg" width="343"
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
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <div class="latnew"><h1>Quick Links</h1></div>
    <div class="features1">
        <div class="features-in">
            <div class="fea-item1">
                <a href="/i-sightII">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/r.jpg" width="343" height="300"
                        alt="Skills" />
                </a>
                <div class="fea-1"><h3>Exp: Systems Administrator</h3></div>
            </div>
            <div class="fea-item2">
                <a href="/skills">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/det.jpg" width="343" height="300"
                        alt="Education" />
                </a>
                <div class="fea-1"><h3>Skills</h3></div>
            </div>
            <div class="fea-item3">
                <a href="/i-sight">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/privcloud.png" width="343"
                        height="300" alt="Jr. Systems Administrator" />
                </a>
                <div class="fea-1"><h3>Exp: Jr. Systems Admin</h3></div>
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
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
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
    <div class="workexp">
        <div class="workexpc">
            <h1>FastAPI & PostgreSQL API</h1>
            <h2>API Endpoint ==> https://fastapi-shah.herokuapp.com/docs</h2>
            <ul>
                <li>
                    ❖ Redefined existing understanding of Python: designed authenticated (OAuth2) social-media backend API on AWS.
                </li>
                <li>
                    ❖ Validated & parameterized i/o for path operations achieving desired data states in PostgreSQL.
                </li>
                <li>
                    ❖ Secured code in GitHub using variables & online with access-controlled Nginx Reverse Proxy.
                </li>
                <li>
                    ❖ Defined front-end, back-end, & Nginx with Docker Compose: services & API calls to test i/o.
                </li>
                <li>
                    ❖ Alembic used for Postgres DB deploy.
                </li>
                <li>
                    ❖ Postman for test, authentication, & environment variables.
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
                <a href="/selfie">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/active.jpg" width="343"
                        height="300" alt="nodeJS and neDB Selfie App" />
                </a>
                <div class="fea-1"><h3>nodeJS and neDB Selfie App</h3></div>
            </div>
            <div class="fea-item2">
                <a href="/seniorsystemsadmin">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/cons.png" width="343"
                        height="300" alt="Senior IS Systems Admin" />
                </a>
                <div class="fea-1"><h3>Exp: Senior IS Sys Admin</h3></div>
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
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
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
    <div class="bodymain">
        <div class="pictcont">
            <div class="shahcont">
                <img src="image/shah.jpg" width="343" height="300" />
            </div>
        </div>
        <div class="secdiv">
            <h1>Abstract</h1>
            <p>Software Engineer proficient with full-stack SAAS applications written in Python, Java, or JavaScript. Subject matter expert in "DevOps" & "Site Reliability Engineering" at enterprise scale!</p>

            <p>Excels at overseeing change management, optimizing performance, designing secure infrastructure.</p>
            
            <p>Committed to delivering high-quality & timely results.</p>
            <div class="btn-shadow"><a href="/contactpage" class="btn">Reach Out</a></div>
        </div>
    </div>
    <br></br>
    <div class="latnew">
        <h1>Site CI/CD & Security Evolution</h1>

        <p>Project began with a simple static HTML, CSS, & JS site originally deployed on GitHub pages. Today the site is full CI/CD, KOPS Infrastructure as Code (IaC), microservices Kubernetes (K8s) deployment in AWS cloud!</p>

        <p>Major revisions have been categorized into three categories:</p>
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

        <p>Also, there is proxy security over the web with Nginx Ingress Controller (AWS ELB) http origin security, redirects, & SSL.</p>

        <h1>Site Overview</h1>
        <p>On the top right of the page is a hamburger menu used to navigate the site:</p>
        <ul>
            <li>Projects: Selfie App, Geolocation App, ChatGPT App, & my FastAPI App.</li>
            <li>Resume: Download a PDF copy of my resume to your screen.</li>
            <li>Contact: Links to my communication platforms.</li>
        </ul>
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
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/websecurity&bugbounty.jpg">1366X768
                <p class="captionText">Web Security & Bug Bounty - 2023</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/DevOps.jpg">1366X768
                <p class="captionText">DevOps Beginners to Advanced with Projects</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/Job_Interview_Tips_for_Software_Engineers.png">1366X768
                <p class="captionText">Job Interview Tips for Software Engineers</p>
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
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/internet_security_remote_work.png">1366X768
                <p class="captionText">Internet Security - Remote</p>
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
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/BBA.jpg">1366X768
                <p class="captionText">Bachelor of Business Administration (BBA)</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/Diploma.jpg">
                <p class="captionText">Diploma in Business IT Management (BITMAN)</p>
            </div>            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/Certificate Coding.jpg">
                <p class="captionText">JS Coding</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/Certificate Coding 2.jpg">
                <p class="captionText">JS Coding II</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="academia/InterPrep.jpg">
                <p class="captionText">Interview Preperation</p>
            </div>            
        </div>
        <div id="dotsContainer"></div>
    </div>
    <script src="js/myScript.js"></script>
    <br></br>

    <div class="latnew"><h1>Quick Links</h1></div>
    <div class="features1">
        <div class="features-in">
            <div class="fea-item1">
                <a href="/contactpage">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/contact.png" width="343"
                        height="300" alt="Contact Me" />
                </a>
                <div class="fea-1"><h3>Contact Me</h3></div>
            </div>
            <div class="fea-item2">
                <a href="/geolocate">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/abc.jpg" alt="Geo Location App"
                        class=feature />
                </a>
                <div class="fea-1"><h3>Geo Location App</h3></div>
            </div>
            <div class="fea-item3">
                <a href="/selfie">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/active.jpg"
                        alt="Selfie App" class=feature />
                </a>
                <div class="fea-1"><h3>Selfie App</h3></div>
            </div>
        </div>
    </div>
    <br></br>
    <br></br>
    <br></br>
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
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
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
            <script src="js/camera.js"></script>
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
    </html>
    `;
    res.send(modifiedHTML);
});
app.get('/data', (req, res) => {
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
        <div class="workexp">
            <div class="workexpc">
                <h1>Selfie App Logs</h1>
                <div><a href="/selfie" class="geo">Create Capture</a></div>
                <script src="js/logs.js"></script>
            </div>
        </div>
        <div id="log_div">
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