const electron = require('electron');


const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
    const mainWindow = new BrowserWindow({
        minWidth: 500,
        minHeight: 250,
    });
    mainWindow.loadFile("kursogen/index.html");

    Menu.setApplicationMenu(null)

}

app.whenReady().then(createWindow);