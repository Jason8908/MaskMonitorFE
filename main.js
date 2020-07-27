const { app, BrowserWindow } = require('electron');
const ElectronTitlebarWindows = require('electron-titlebar-windows');

function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        minWidth: 960,
        minHeight: 540,
        maxWidth: 1920,
        maxHeight: 1080,
        webPreferences: {
            nodeIntegration: true
        },
        icon:'images/icon2.png',
        frame: false,
        enableRemoteModule: true
    });
    //Load the file
    win.loadFile('index.html');
}    

app.whenReady().then(createWindow);
