/*import {app, BrowserWindow} from 'electron';
import path from 'path';
import url from 'url';*/

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;

const isDevelopmentServer = () => {
  return process.env.DEV || false;
};

const getURL = () => {

  if (isDevelopmentServer()) {
    return process.env.ELECTRON_START_URL;
  }

  return url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  });
};

const createMainWindow = () => {

  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(getURL());

  if (isDevelopmentServer()) {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null
  });
};

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createMainWindow()
  }
});
