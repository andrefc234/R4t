lightblue=`tput setaf 14` 
green=`tput setaf 46`     
RED=`tput setaf 196`      
yellow=`tput setaf 11`    
purple=`tput setaf 129` 

apt update
apt install -y wget nodejs npm figlet  wine wine64 xterm
npm i -G yarn 
yarn install
wget https://www.python.org/ftp/python/3.6.0/python-3.6.0.exe
wine python-3.6.0.exe
rm python-3.6.0.exe
wget https://github.com/upx/upx/releases/download/v3.96/upx-3.96-win32.zip
unzip upx-3.96-win32.zip
rm -r *.zip

wine /$(whoami)/.wine/drive_c/users/$(whoami)/'Local Settings'/'Application Data'/Programs/Scripts/pip.exe install -r  requierements.txt
sudo bash start.sh