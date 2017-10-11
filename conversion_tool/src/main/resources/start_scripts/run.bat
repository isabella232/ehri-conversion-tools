@echo off

start cmd /k "cd lib && java -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8000 -jar demo-0.0.1-SNAPSHOT.jar -Xmx=1G"
ping -n 10 127.0.0.1 >nul
start http://localhost:8080


