//main.js -> the electron controls that builds the frame for the application
const { BrowserWindow, app } = require('electron')

let win

const makeWindow = () => {
    win = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences:{
            nodeIntegration: true
        }
    })
win.loadFile("index.html")
 }

 app.on('ready',()=> makeWindow())