const electron = require('electron');


const { app, BrowserWindow } = require('electron');

function createWindow() {
    const mainWindow = new BrowserWindow();
    mainWindow.loadFile("kursogen/index.html");

}

app.whenReady().then(createWindow);