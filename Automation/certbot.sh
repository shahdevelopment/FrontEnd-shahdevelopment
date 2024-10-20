#!/bin/bash

sudo apt update

sudo apt install snapd

sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

certbot certonly --manual -d *.shahsportfolio.online --preferred-challenges dns
- /etc/letsencrypt/live/shahsportfolio.online/fullchain.pem
- /etc/letsencrypt/live/shahsportfolio.online/privkey.pem

CERT_BASE64=$(base64 -w 0 < /etc/letsencrypt/live/shahsportfolio.online/fullchain.pem)
echo $CERT_BASE64
KEY_BASE64=$(base64 -w 0 < /etc/letsencrypt/live/shahsportfolio.online/privkey.pem)
echo $KEY_BASE64


# cronjob renewal

0 0 * * * certbot renew --post-hook "systemctl reload nginx" >/dev/null 2>&1
# if you want to be able to renew this when certbot is used to install the cert then 
# we need to keep the acme challenges in the DNS
# better yet take it down and store it in a folder or just create a new one 

# when certbot prompts you to input this name for the acme challenge _acme-challenge.shahdevelopment.tech.
# make sure to put the . at the end of the record





#check the certs that are installed 
certbot certificates


###if you are using Cloudflare as your DNS provider, your credentials.ini file might look like this:

makefile
Copy code
dns_cloudflare_api_key = your_cloudflare_api_key
dns_cloudflare_api_secret = your_cloudflare_api_secret
Once you have created the credentials.ini file with the correct API credentials, you would use it in the Certbot command like this:

css
Copy code
certbot certonly --dns-<your_dns_provider> \
                --dns-<your_dns_provider>-credentials /path/to/credentials.ini \
                -d *.yourdomain.com