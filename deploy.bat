@echo off
set script_path=%~dp0
"C:\Program Files\Git\bin\bash.exe" -c "cd \"$script_path\" && ./deploy.sh"
pause
