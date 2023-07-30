@echo off
setlocal EnableDelayedExpansion
echo Buildiing image press any key to continue
echo or
echo to cancel press ctrl + c then enter Y at the prompt
pause

REM Check if the script is already running with elevated permissions
>nul 2>&1 "%SYSTEMROOT%\System32\cacls.exe" "%SYSTEMROOT%\System32\config\system"

@REM if %ERRORLEVEL% NEQ 0 (
@REM   REM If not running with elevated permissions, restart the script with elevated permissions
@REM   echo Script is not running with elevated permissions. Restarting with elevated permissions...
@REM   set "batchargs=%*"
@REM   set "elevated_cmd=runas /env /user:shahj "cmd /c \"%~0\" %batchargs%""
@REM   %elevated_cmd%
@REM @REM   exit /b
@REM )
REM Your batch script code goes here with elevated permissions
echo Script is running with elevated permissions!

echo Building image now ....

cd .utils

rem Read the previous tag from a file (if available)
set "previous_tag="
if exist "tag.txt" (
    < "tag.txt" set /p previous_tag=
)
echo Previous tag: %previous_tag%

rem Prompt the user for the new tag
set /p "new_tag=Enter the new tag: "

rem Record the new tag to the file
echo %new_tag%>tag.txt

echo New tag: %new_tag%

cd ..

echo Starting build........

docker build --no-cache -t shahdevelopment/kube:%new_tag% . > build_logs\build.txt 2>&1

if %ERRORLEVEL% NEQ 0 (
    docker rmi shahdevelopment/kube:%new_tag%
    goto buildfail
)

echo Build success!

echo.
echo.
echo Starting image push....
docker push shahdevelopment/kube:%new_tag% > build_logs\push.txt 2>&1

if %ERRORLEVEL% NEQ 0 (
    docker rmi shahdevelopment/kube:%new_tag%
    goto pushfail
)

echo Image pushed successfully!
echo.
echo shahdevelopment/kube:%new_tag% image is ready for pull!
echo.
echo         image: shahdevelopment/kube:%new_tag%
echo.
echo docker pull shahdevelopment/kube:%new_tag%
echo.
echo.
echo Deleting local copy of image: shahdevelopment/kube:%new_tag%
echo ctrl + c and then type Y when prompted to abort action....
pause
docker rmi shahdevelopment/kube:%new_tag%
goto end

:buildfail
echo Docker build has failed!
echo.
cd .utils
echo %previous_tag%>tag.txt
cd ..
echo.
echo Starting log output......
echo.
type build_logs\build.txt
echo.
echo.
echo Need to rebuild and then push!

goto end

:pushfail
echo Docker image push has failed!
echo.
cd .utils
echo %previous_tag%>tag.txt
cd ..
echo.
echo Starting log output......
echo.
type build_logs\push.txt
echo.
echo.
echo Do not rebuild we only need to push the image!




:end
