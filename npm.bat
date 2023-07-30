@echo off
npm install -g npm@latest

npm cache clean --force


npm init -y

npm install express
npm install nedb
npm install dotenv

git rm -r --cached *

git add .

git remote -v 

