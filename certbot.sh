#!/bin/bash

sudo apt update

sudo apt install snapd

sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

certbot certonly --manual -d *.shahdevelopment.tech --preferred-challenges dns