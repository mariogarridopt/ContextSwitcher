// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const fs = require('fs');

const isDev = process.env.NODE_ENV == "development";

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: isDev ? 920 : 1080,
    height: isDev ? 400 : 102,
    frame: true,
    //resizable: isDev,
    //titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegrationInWorker: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: 'images/icon.icns'
  });

  // Open the DevTools.
  if(isDev) {
    mainWindow.webContents.openDevTools()
  }

  var position = getConfig('position', [0,0]);
  mainWindow.setPosition(position[0], position[1]);

  // and load the index.html of the app.
  mainWindow.loadFile('app/index.html');

  mainWindow.on('moved', function(e){
    saveConfig('position', mainWindow.getPosition())
});

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  // implement menu
  const mainMenu = Menu.buildFromTemplate([
    { role: 'appMenu' },
    { role: 'fileMenu' },
    { role: 'editMenu' },
    { role: 'viewMenu' }
  ]);
  Menu.setApplicationMenu(mainMenu);

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// app data storage
function saveConfig(name ,obj) {
  var rootPath = app.getPath('userData');
  try {
    fs.writeFileSync(rootPath + '/' + name + '.json', JSON.stringify(obj))
  } catch (err) {
    console.error(err)
  } 
}

function getConfig(name, defReturn = []) {
  var rootPath = app.getPath('userData');
  try {
    let dataString = fs.readFileSync(rootPath + '/' + name + '.json', 'utf8');
    return JSON.parse(dataString);
  } catch (err) {
    return defReturn;
  }
}