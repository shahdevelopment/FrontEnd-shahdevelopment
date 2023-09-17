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
                <p>Shahjehan (Shah) Solehria</p>
            </a>
            <h2 class="title">Dev-Ops | AWS/Azure Cloud | Security | Software</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Experience</button>
                        <div class="dropdown-content">
                            <a href="/seniorsystemsadmin">Senior IS Network Admin</a>
                            <a href="/i-sightII">Systems Administrator</a>
                            <a href="/i-sight">Junior Systems Admin</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                        <a href="/fastapi">FastAPI Server</a>
                        <a href="/geolocate">Geo Location App</a>
                        <a href="/selfie">Selfie App</a>
                        <a href="/shahgpt">ChatGPT Clone</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/education">Education</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/skills">Skills</a></button>
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
                <h1>nodeJS and neDB Selfie App</h1>
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
            <a href="/skills"><button class="dropbtn">Skills</button></a>
            <a href="/education"><button class="dropbtn">Education</button></a>
            <a href="/contactpage"><button class="dropbtn">Contact Me</button></a>
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
            <a class="name" href="/"><p>Shahjehan (Shah) Solehria</p></a>
            <h2 class="title">Dev-Ops | AWS/Azure Cloud | Security | Software</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Experience</button>
                        <div class="dropdown-content">
                            <a href="/seniorsystemsadmin">Senior IS Network Admin</a>
                            <a href="/i-sightII">Systems Administrator</a>
                            <a href="/i-sight">Junior Systems Admin</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/education">Education</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/skills">Skills</a></button>
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
            <a href="/skills"><button class="dropbtn">Skills</button></a>
            <a href="/education"><button class="dropbtn">Education</button></a>
            <a href="/contactpage"><button class="dropbtn">Contact Me</button></a>
        </div>
    </div>
    </html>
    `;
    res.send(modifiedHTML);
});
app.get('/education', (req, res) => {
    const modifiedHTML = `
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Education</title>
        <link rel="stylesheet" href="style/style.css">
    </head>
    <div class="topnav">
        <div>
            <a class="name" href="/"><p>Shahjehan (Shah) Solehria</p></a>
            <h2 class="title">Dev-Ops | AWS/Azure Cloud | Security | Software</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Experience</button>
                        <div class="dropdown-content">
                            <a href="/seniorsystemsadmin">Senior IS Network Admin</a>
                            <a href="/i-sightII">Systems Administrator</a>
                            <a href="/i-sight">Junior Systems Admin</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/education">Education</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/skills">Skills</a></button>
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
            <h1>EDUCATION</h1>
            <h3>Decoding DevOps (Certificate) - 40% Completed</h3>
            <h4>- Udemy</h4>
            <h3>Cisco CCNA 200-301 (Certificate) - 40% Completed</h3>
            <h4>- Udemy</h4>
            <h3>AZ-303 Azure Architecture Technologies (Certificate) - Dec 2021</h3>
            <h4>- Udemy</h4>
            <h3>AZ-104 Microsoft Azure Administrator (Certificate) - Aug 2021</h3>
            <h4>- Udemy</h4>
            <h3>AWS Certified Solutions Architect Associate (Certificate) - Aug 2021</h3>
            <h4>- Udemy</h4>
            <h3>Bachelor of Business Administration (Degree) - Jun 2018–Jan 2020</h3>
            <h4>- British Columbia Institute of Technology</h4>
            <h3>Business IT Management (Diploma) - Sept 2016–May 2018</h3>
            <h4>- British Columbia Institute of Technology</h4>
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
    <br></br>
    <div class="latnew"><h1>Quick Links</h1></div>
    <br></br>
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
    <div class="footer">
        <a href="/"><button class="dropbtn">Home</button></a>
        <div class="footmenu">
            <a href="/skills"><button class="dropbtn">Skills</button></a>
            <a href="/education"><button class="dropbtn">Education</button></a>
            <a href="/contactpage"><button class="dropbtn">Contact Me</button></a>
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
            <a class="name" href="/"><p>Shahjehan (Shah) Solehria</p></a>
            <h2 class="title">Dev-Ops | AWS/Azure Cloud | Security | Software</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Experience</button>
                        <div class="dropdown-content">
                            <a href="/seniorsystemsadmin">Senior IS Network Admin</a>
                            <a href="/i-sightII">Systems Administrator</a>
                            <a href="/i-sight">Junior Systems Admin</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/education">Education</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/skills">Skills</a></button>
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
                    Based on the FastAPI framework this is an app that supports uer creation, authentication, privacy,
                    password hashing, &
                    best practices in variable managemnt
                </li>
                <li>
                    Built with a robust catalogue of database managment tools from SQLAlchemy ORM, Alembic Database
                    Migration tool, and SQL insert statements
                </li>
                <li>
                    Visit the docs page for an easy to understand tutorial on how the site is organized and how you can get
                    started shown above! ^ 
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
            <a href="/skills"><button class="dropbtn">Skills</button></a>
            <a href="/education"><button class="dropbtn">Education</button></a>
            <a href="/contactpage"><button class="dropbtn">Contact Me</button></a>
        </div>
    </div>
    </html>
    `;
    res.send(modifiedHTML);
});
app.get('/i-sightII', (req, res) => {
    const modifiedHTML = `
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Systems Administrator</title>
        <link rel="stylesheet" href="style/style.css">
    </head>
    <div class="topnav">
        <div>
            <a class="name" href="/"><p>Shahjehan (Shah) Solehria</p></a>
            <h2 class="title">Dev-Ops | AWS/Azure Cloud | Security | Software</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Experience</button>
                        <div class="dropdown-content">
                            <a href="/seniorsystemsadmin">Senior IS Network Admin</a>
                            <a href="/i-sightII">Systems Administrator</a>
                            <a href="/i-sight">Junior Systems Admin</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/education">Education</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/skills">Skills</a></button>
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
            <h1>Systems Administrator (i-Sight)</h1>
            <ul>
                <li>Dealt with various issues, change management, and development of Dev-Ops environment</li>
                <ul>
                    <li>Administration of Jenkins platform and deployments</li>
                    <li>Working with Azure GUI & Azure CLI</li>
                    <li>Ansible/Python scripts & API</li>
                    <li>Bash Scripting</li>
                    <li>Docker Swarm & Docker Compose file deployments</li>
                    <li>SCCM</li>
                    <li>Docker images/artifacts</li>
                    <li>Makefiles</li>
                </ul>
                <li>Successfully dealt with a major outage:</li>
                <ul>
                    <li>Rebuilt Yellowfin JAVA servers paired with either MySQL or PostgreSQL</li>
                    <li>Rebuilt read only replica Postgres DB using pgcluster streaming replication</li>
                    <li>Backed up, migrate, and Restored virtual machines with VEAM</li>
                    <li>Perform disk checks/repairs on Linux and Windows Virtual Machines hosted in VMWARE</li>
                    <li>Revived NodeJS multi-tier Docker applications along with their respective database systems</li>
                    <li>Repaired Redis indexes when faced AOF corruption</li>
                </ul>
                <li>
                    Ensured availability of the i-Sight multi-tier application stack in the cloud including the
                    following technologies: Nodes.js, Quartz Redis, Nginx, Samba, Docker Swarm, Ubuntu,
                    RHEL, mounts (cifs, blob, file shares, and EBS), Linux Kernel, & Elasticsearch
                </li>
                <li>
                    Maintained security of SAAS application and supporting services with Palo Alto Firewalls,
                    Azure Networking, AWS Networking, Checkpoint VPN, DNS, Mail Gateway, NGINX
                    reverse proxy, Key Management Systems (KMS, Java Keytool/keystores, ssh keys), SSL
                    Certificates, and SFTP Server (GoAnywhereMFT)
                </li>
                <li>
                    Deployed multi-tiered i-Sight application with Ansible scripts and Jenkins in Azure Cloud
                    and on customer premises
                </li>
                <li>
                    Bridged the gap between developers and IT to resolve escalations, ensure efficient
                    communications, and resolve major issues at every level
                </li>
                <li>Supported the IBM Domino server and resolved major infrastructure issues</li>
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
                <a href="/i-sight">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/cons.png" width="343"
                        height="300" alt="Junior Sys Admin" />
                </a>
                <div class="fea-1"><h3>Exp: Junior Sys Admin</h3></div>
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
            <a href="/skills"><button class="dropbtn">Skills</button></a>
            <a href="/education"><button class="dropbtn">Education</button></a>
            <a href="/contactpage"><button class="dropbtn">Contact Me</button></a>
        </div>
    </div>
    </html>
    `;
    res.send(modifiedHTML);
});
app.get('/i-sight', (req, res) => {
    const modifiedHTML = `
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Junior System Admin</title>
        <link rel="stylesheet" href="style/style.css">
    </head>
    <div class="topnav">
        <div>
            <a class="name" href="/"><p>Shahjehan (Shah) Solehria</p></a>
            <h2 class="title">Dev-Ops | AWS/Azure Cloud | Security | Software</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Experience</button>
                        <div class="dropdown-content">
                            <a href="/seniorsystemsadmin">Senior IS Network Admin</a>
                            <a href="/i-sightII">Systems Administrator</a>
                            <a href="/i-sight">Junior Systems Admin</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/education">Education</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/skills">Skills</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/contactpage">Contact</a></button>
                    <button onclick="highlightButton(this)" class="menu">
                        <a href="Shah_Solehria_Resume.pdf" target="_blank">Resume</a>
                    </button>
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
            <h1>Junior Systems Administrator (i-Sight)</h1>
            <ul>
                <li>
                    Systems administrator, support, upgrade, & change management for:
                    Linux (Ubuntu & Redhat), MacOS (Intel & Apple Silicon), Windows Pro,
                    Windows Server (ADDS), Checkpoint Firewall, Rogers DNS, Palo Alto
                    Firewall, VPN, Go Anywhere MFT, JIRA software, Confluence, & JIRA
                    Service Management, Google Search Console, Office 365 Admin
                    Center including: Azure AD, Exchange Admin Center, & SharePoint
                </li>
                <li>
                    Platform support & change management for: Nginx, MYSQL, Postgres
                    SQL, Teleport, Docker (Desktop, Docker Swarm, Dockerfile, Docker
                    Compose), Azure Cloud, Jenkins, GitHub, Ansible, Yellowfin, & VMWARE
                    ESXI
                </li>
                <li>Aided migration from ADDS to Azure AD via PowerShell scripts</li>
                <li>
                    Setup custom deployments by initializing SSL certificates & custom
                    domain names for Nginx reverse proxy configuration
                </li>
                <li>
                    Managed security with SSH keys, PGP keys, password protected zip files,
                    strong password policies, firewall rules, OpenSSL, encryption at rest,
                    DKIM, SPF, application specific permissions, Two factor authentication,
                    GDPR complaint storage, protected client PI, & password-based
                    authentication
                </li>
                <li>Setup connections for IBM Lotus Notes to MYSQL for ODBC connections</li>
                <li>
                    Pioneered the deploy of Yellowfin in containerized form using Docker
                    with JDBC connector to PostgreSQL Database
                </li>
                <li>
                    Deployed Prod, PAT, and UAT environments for i-Sight app (VM in Azure)
                    with integrated Yellowfin analytics using Ansible, Jenkins, and Python
                </li>
                <li>
                    Provided excellent support for remote client change management/
                    support
                </li>
                <li>
                    Conducted user terminations, internal moves, access requests, & new
                    hire setup
                </li>
                <li>Worked with Google Admin to issue API keys & Recrawl URL’s</li>
                <li>Expanded space for VM’s using mountable Azure Blob Storage shares</li>
                <li>
                    Migrated data using PowerShell scripts, automated SFTP data transfers
                    using MFT, & Cron jobs in Linux (Bash scripting
                </li>
                <li>Pioneered deployment of Teams phone system to landline calling</li>
                <li>Provided support to developers for deployment issues i-Sight application</li>
                <li>
                    Effectively used internal resources along with self research to get myself
                    up to speed with company technologies
                </li>
                <li>
                    Built a NodeJS server hosting my resume website app with a
                    geolocation API & persistent storage
                </li>
                <li>
                    Built a Python API & SQL Alchemy database draft to eventually
                    automate Azure AD user creation upon a user being added to
                    BambooHR
                </li>
                <li>
                    Created Jira workflows, filters, views, automation to facilitate my
                    processes while also providing support for Jira
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
            <a href="/skills"><button class="dropbtn">Skills</button></a>
            <a href="/education"><button class="dropbtn">Education</button></a>
            <a href="/contactpage"><button class="dropbtn">Contact Me</button></a>
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
        <div><a class="name" href="/"><p>Shah Solehria's Web Portfolio</p></a></div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Experience</button>
                        <div class="dropdown-content">
                            <a href="/seniorsystemsadmin">Senior IS Network Admin</a>
                            <a href="/i-sightII">Systems Administrator</a>
                            <a href="/i-sight">Junior Systems Admin</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/education">Education</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/skills">Skills</a></button>
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
        <div class="pictcont"><div class="shahcont"><h2>Dev-Ops | AWS/Azure Cloud | Security | Software</h2></div></div>
        <div class="secdiv">
            <h1>Abstract</h1>
            <p>
                Experienced technology
                professional proficient in
                maintaining, developing, and
                managing full-stack multi-tier SAAS
                applications. Skilled in automating
                SDLC for enhanced efficiency,
                flexibility, and security. Excels at
                overseeing change management and
                optimizing performance. Strong
                expertise in designing secure
                infrastructures. Collaborative and
                committed to delivering high-quality
                results.
            </p>
            <div class="btn-shadow"><a href="/contactpage" class="btn">Reach Out</a></div>
        </div>
    </div>
    <br></br>
    <div class="latnew">
        <h2>Site Overview & Note</h2>
        <p>
            This website/web apps runtime is nodeJS and it was 
            deployed with NPM running in AWS EC2 instances managed by a Kubernetes Control Plane.
            For monitoring there is a Lens dashboard using a Prometheus integration.
            The entire cluster can be deployed easily with artifacts in GitHub Repo & DockerHub Repo.
            The Images for this site were created with Dockerfile which also conveniently runs in a
            Docker Swarm configuration as well.
            </br>
            The site makes use of various best practices including env variables, 
            server side & client side distinction and security benefits. Overall 
            the site uses the following languages: HTML, CSS, JavaScript, YAML, & Bash.
            </br>
            </br>
            On the top right of the page is a hamburger menu that if you click 
            will open up the site navigation menu. 
            </br>
            </br>
            Check out the Projects tab to see my JS API projects including: ChatGPT 
            Clone, Google Maps API and 
            Gelocation, Selfie Application that allows you to store your pictures 
            and a message You can permanently delete your images and post with 
            the delete button found by clicking on the "Data Repo" Button (Antivirus may 
            interfere with the webcam resource accessibility requirements for the proper 
            functioning of this page). Finally, 
            my Python (fastAPI) and Postgres Social Media App API.
            </br>
            </br>
            The resume tab if clicked will download a PDF copy of my resume to your screen.
            </br>
            </br>
            All Other sections you are free to explore!
            </br>
            </br>
            Best,
            </br>
            Shah Solehria
        </p>
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
                <img style='height: 100%; width: 100%; object-fit: contain' src="image/DevOps.jpg">1366X768
                <p class="captionText">DevOps Beginners to Advanced with Projects</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="image/BBA.jpg">1366X768
                <p class="captionText">Bachelor of Business Administration (BBA)</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="image/Diploma.jpg">
                <p class="captionText">Diploma in Business IT Management (BITMAN)</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="image/awsSArc.jpg">1366X768
                <p class="captionText">AWS Solutions Architect</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="image/AzureAZ104.jpg">
                <p class="captionText">Azure Administrator</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="image/Az303.jpg">
                <p class="captionText">Azure Architect</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="image/Certificate Coding.jpg">
                <p class="captionText">JS Coding</p>
            </div>
            <div class="imageHolder">
                <img style='height: 100%; width: 100%; object-fit: contain' src="image/Certificate Coding 2.jpg">
                <p class="captionText">JS Coding II</p>
            </div>
        </div>
        <div id="dotsContainer"></div>
    </div>
    <script src="js/myScript.js"></script>
    <br />
    <br />
    <br />
    <br />
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <div class="latnew"><h1>Quick Links</h1></div>
    <div class="features1">
        <div class="features-in">
            <div class="fea-item1">
                <a href="/skills">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/det.jpg" alt="Skills" />
                </a>
                <div class="fea-1"><h3>Skills</h3></div>
            </div>
            <div class="fea-item2">
                <a href="/education">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/comp5.png" alt="Education"
                        class=feature />
                </a>
                <div class="fea-1"><h3>Education</h3></div>
            </div>
            <div class="fea-item3">
                <a href="/selfie">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/active.jpg"
                        alt="nodeJS and neDB Selfie App" class=feature />
                </a>
                <div class="fea-1"><h3>nodeJS and neDB Selfie App</h3></div>
            </div>
        </div>
    </div>
    <br></br>
    <br></br>
    <br></br>
    </body>
    <div class="footer">
        <div class="footmenu">
            <a href="/skills"><button class="dropbtn">Skills</button></a>
            <a href="/education"><button class="dropbtn">Education</button></a>
            <a href="/contactpage"><button class="dropbtn">Contact Me</button></a>
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
            <a class="name" href="/"><p>Shahjehan (Shah) Solehria</p></a>
            <h2 class="title">Dev-Ops | Cloud | Security | Software</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Experience</button>
                        <div class="dropdown-content">
                            <a href="/seniorsystemsadmin">Senior IS Network Admin</a>
                            <a href="/i-sightII">Systems Administrator</a>
                            <a href="/i-sight">Junior Systems Admin</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/education">Education</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/skills">Skills</a></button>
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
            <a href="/skills"><button class="dropbtn">Skills</button></a>
            <a href="/education"><button class="dropbtn">Education</button></a>
            <a href="/contactpage"><button class="dropbtn">Contact Me</button></a>
        </div>
    </div>
    </html>
    `;
    res.send(modifiedHTML);
});
app.get('/seniorsystemsadmin', (req, res) => {
    const modifiedHTML = `
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Senior IS Network Administrator</title>
        <link rel="stylesheet" href="style/style.css">
    </head> 
    <div class="topnav">
        <div>
            <a class="name" href="/"><p>Shahjehan (Shah) Solehria</p></a>
            <h2 class="title">Dev-Ops | AWS/Azure Cloud | Security | Software</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Experience</button>
                        <div class="dropdown-content">
                            <a href="/rivermeadow">Migration Engineer</a>
                            <a href="/seniorsystemsadmin">Senior IS Network Admin</a>
                            <a href="/i-sightII">Systems Administrator</a>
                            <a href="/i-sight">Junior Systems Admin</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/education">Education</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/skills">Skills</a></button>
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
            <h1>Senior IS Network Administrator (Electrameccanica)</h1>
            <ul>
                <li>Migrated on premise Hyper-V systems to Azure cloud</li>
                <ul>
                    <li>Backed up, migrate, and Restored virtual machines with VEAM</li>
                    <li>Used remote management tool PSEXEC to fix RDP issues post migration
                    <li>Utilized Azure replication tools to test failover and ultimately migrate systems
                    <li>Configuration and management of Windows Server to support migration changes
                </ul>
                <li>Setup and configuration of Fortigate Fortinet firewalls</li>
                <ul>
                    <li>Site-to-Site VPN</li>
                    <li>ADVPN fully meshed topology
                    <li>Configuration of interfaces
                    <li>SDWAN deployment plan
                </ul>
                <li>Exported disks from Hyper-V and then created images</li>
                <li>Provisioning and management of Linux based appliance for Zscaler VPN</li>
                <li>Worked extensively with PLM/CAD manufacturing license servers</li>
                <li>Wired Meraki switches to support systems on-premise</li>
                <li>Configured Veeam software backups and worked with NAS to ensure backup</li>
                <li>Administrated Office 365 and Intune</li>
                <li>Setup server racks and fixed cabling issues</li>
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
                <a href="/i-sightII">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/cons.png" width="343"
                        height="300" alt="Systems Administrator" />
                </a>
                <div class="fea-1"><h3>Exp: Systems Administrator</h3></div>
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
            <a href="/skills"><button class="dropbtn">Skills</button></a>
            <a href="/education"><button class="dropbtn">Education</button></a>
            <a href="/contactpage"><button class="dropbtn">Contact Me</button></a>
        </div>
    </div>
    </html>
    `;
    res.send(modifiedHTML);
});
app.get('/skills', (req, res) => {
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
            <a class="name" href="/"><p>Shahjehan (Shah) Solehria</p></a>
            <h2 class="title">Dev-Ops | AWS/Azure Cloud | Security | Software</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Experience</button>
                        <div class="dropdown-content">
                            <a href="/rivermeadow">Migration Engineer</a>
                            <a href="/seniorsystemsadmin">Senior IS Network Admin</a>
                            <a href="/i-sightII">Systems Administrator</a>
                            <a href="/i-sight">Junior Systems Admin</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/education">Education</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/skills">Skills</a></button>
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
            <h1>Azure Cloud</h1>
            <ul>
                <li> Azure Kubernetes</li>
                <li> Hub and Spoke Network design and deployment in Microsoft Azure</li>
                <li> Applied knowledge of how to setup and use Troubleshooting tools like boot diagnostics, RUN Command,
                    Azure Cloud Shell & Setup and Use of Monitoring</li>
                <li> Peering, Site-to-Site VPN, Azure RDS, storage, & backups</li>
                <li> Azure CLI automating deployments in Windows and Linux deployment servers along with integrations into
                    build tools like Jenkins</li>
                <li> Azure Migrations, Azure Image based deployment for linux and windows based systems, replica management
                    for DR strategies</li>
                <li> Strong networking experience: NIC, NSG, network peering, VNET, & subnets</li>
                <li> Experience migrating Linux and Windows to Azure</li>
                <li> Experience with AD automation, dynamic role assignments, users, & groups</li>
            </ul>
            <h1>AWS Cloud</h1>
            <ul>
                <li> Migrating on-prem systems to AWS cloud</li>
                <li> Peering, Site-to-Site VPN, RDS, autoscaling, load balancing, & networking</li>
                <li> Strategic understanding of network design to ensure adherence to security best practices and
                    availability best practices</li>
                <li> AWS CLI for build automation, changes, or data collection</li>
                <li> Best practices for storage strategies, backups, availability, scalability, billing, security, and user
                    IAM roles</li>
                <li> AWS Kubernetes deployment experience</li>
                <li> Lambda automation for S3, triggers to start operations, and storage lifecycle automation</li>
                <li> Creating AMI and automating deployments using deployment scripts</li>
                <li> Experience migrating Linux and Windows to AWS</li>
            </ul>
            <h1>Dev-Ops</h1>
            <ul>
                <li> Fully automated Vagrant VM deployments and configuration of VagrantFile</li>
                <ul>
                    <li>o Multi-VM Vagrantfile with provisioning via external bash files</li>
                </ul>
                <li> Automating the build of Java applications with bash scripting, Vagrantfile, GIT, Maven, and Apache
                    Tomcat webserver deployments</li>
                <ul>
                    <li>o Memcached caching for MySQL and RabbitMQ for queueing</li>
                    <li>o Nginx front end redirecting request from port 80 to 8080</li>
                </ul>
                <li> MySQL & PostgreSQL migrations/deployments using dump files, alembic, and ORM</li>
                <li> Ansible deployment and automation experience for automating deployments</li>
                <li> Deploying fully secure Python API with JWT authentication using SQLAlchemy & MySQL</li>
                <li> Expert knowledge of Bash in Linux (loops, if logic, nested scripting, remote execution, dependency
                    calls, scheduling, key creation, ssh, API Calls) and Batch files in Windows (robocopy, file
                    manipulation, dependency calls, task scheduler, API calls)</li>
                <li> Applied knowledge of Networking, ports, routing technologies, and firewalls in the context of a cloud
                    and on prem environments</li>
                <li> Creating images with Dockerfile, Hyper-V, VMWARE, EC2 Images, Windows Sysprep, along with best
                    practices for storing images for security, version control, and ease of automated access during deploys
                </li>
                <li> Applied understanding of build tools like Maven, Jenkins, AWS CLI, Azure CLI, Cloud Formation, & AWS
                    templates</li>
                <li> Creating Docker microservices architecture, docker images, docker hub, building docker compose scripts,
                    API automation, code testing</li>
                <li> Built JAVA applications using Maven and deploy to Apache Tomcat Servers</li>
            </ul>
            <h1>Code</h1>
            <ul>
                <li> Full stack development of python API and Webserver with frameworks like FastAPI, Django, Flask, and
                    Postgres</li>
                <li> Understanding the implementation of Authentication via JWT tokens for FastAPI</li>
                <li> Web UI design with Jinja2 templates</li>
                <li> End to end Docker migration capabilities for python based API with technologies like Docker Compose,
                    Docker Swarm, Docker file images, Nginx reverse proxy, and automatic dependency install</li>
                <li> Hands on experience with validation and testing of python code and databases with assert</li>
                <li> Automated push and pull to GitHub using git and key based authentication</li>
                <li> Automated full stack deployments with batch scripting on windows, bash scripting on Linux, Vagrantfile
                    Ruby scripts</li>
                <li> Intermediate applied knowledge of autoscaling techniques in AWS, Azure, Docker Swarm, Docker Compose
                </li>
                <li> Applied expertise in the best practices for using environmental variables to ensure security, validity,
                    and flexibility of deployments and code storage</li>
                <li> Know how to plan security of at rest user data by hashing user data like passwords</li>
                <li> Managing Python deployments within the context of a virtual environment</li>
                <li> Automated creation and migration of database to PostgreSQL using Python models and Alembic</li>
                <li> Experience working with JAVA and Nodejs applications in an enterprise SAAS company environment</li>
                <li> JAVA, JSP, Servlets, JDBC, J2EE, configuring JVM, JRE config, & deploying JAVA apps</li>
                <li> Experience building JAVA apps, connecting to database, authentication, cookies</li>
                <li> Solid skills in HTML, CSS, and JavaScript</li>
                <li> Extensive experience using ChatGPT API, built a ChatGPT Clone, & skilled at ChatGPT querying to solve
                    code problems</li>
            </ul>
        </div>
    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <div class="latnew"><h1>Quick Links</h1></div>
    <br></br>
    <div class="features1">
        <div class="features-in">
            <div class="fea-item1">
                <a href="/">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/sum.png" width="343" height="300"
                        alt="Skills" />
                </a>
                <div class="fea-1"><h3>Professional Summary</h3></div>
            </div>
            <div class="fea-item2">
                <a href="/education">
                    <img style='height: 100%; width: 100%; object-fit: contain' src="image/privcloud.png" width="343"
                        height="300" alt="Education" />
                </a>
                <div class="fea-1"><h3>Education</h3></div>
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
            <a href="/skills"><button class="dropbtn">Skills</button></a>
            <a href="/education"><button class="dropbtn">Education</button></a>
            <a href="/contactpage"><button class="dropbtn">Contact Me</button></a>
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
            <a class="name" href="/"><p>Shahjehan (Shah) Solehria</p></a>
            <h2 class="title">Dev-Ops | AWS/Azure Cloud | Security | Software</h2>
        </div>
        <div>
            <div id="menu-bar">
                <div id="menu-buttons">
                    <div class="dropdown">
                        <button class="dropbtn">Experience</button>
                        <div class="dropdown-content">
                            <a href="/rivermeadow">Migration Engineer</a>
                            <a href="/seniorsystemsadmin">Senior IS Network Admin</a>
                            <a href="/i-sightII">Systems Administrator</a>
                            <a href="/i-sight">Junior Systems Admin</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Projects</button>
                        <div class="dropdown-content">
                            <a href="/fastapi">FastAPI Server</a>
                            <a href="/geolocate">Geo Location App</a>
                            <a href="/selfie">Selfie App</a>
                            <a href="/shahgpt">ChatGPT Clone</a>
                        </div>
                    </div>
                    <button onclick="highlightButton(this)" class="menu"><a href="/education">Education</a></button>
                    <button onclick="highlightButton(this)" class="menu"><a href="/skills">Skills</a></button>
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
            <a href="/skills"><button class="dropbtn">Skills</button></a>
            <a href="/education"><button class="dropbtn">Education</button></a>
            <a href="/contactpage"><button class="dropbtn">Contact Me</button></a>
        </div>
    </div>
    </html>
`;
    res.send(modifiedHTML);
});