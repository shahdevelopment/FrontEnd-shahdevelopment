@echo off

echo enter the commit tag.......
set /p commit_msg=

git rm -r --cached *

git add .

git commit -m "%commit_msg%"

git push --mirror origin