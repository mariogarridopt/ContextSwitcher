const fs = require('fs');
const path = require('path');

const { contextBridge } = require('electron');

const saveFilePath = getAppDataPath();

if(!fs.existsSync(saveFilePath)){
    fs.mkdirSync(saveFilePath)
}

contextBridge.exposeInMainWorld('db', {
    'getObject': () => {
        try {
            let dataString = fs.readFileSync(saveFilePath + '/active.json', 'utf8');
            return JSON.parse(dataString);
          } catch (err) {
            return [];
          }
    },
    'saveObject': (obj) => {
        try {
            fs.writeFileSync(saveFilePath + '/active.json', JSON.stringify(obj))
          } catch (err) {
            console.error(err)
          } 
    },
    'addToHistory': (obj) => {
        let filename = '/trash.json';
        let data = [];
        try {
            let dataString = fs.readFileSync(saveFilePath + filename, 'utf8')
            data = JSON.parse(dataString);
        } catch (err) {
            data = [];
        }

        try {
            data.push(obj);
            fs.writeFileSync(saveFilePath + filename, JSON.stringify(data))
        } catch (err) {
            console.error(err)
        } 
    }
});

function getAppDataPath() {
    switch (process.platform) {
      case "darwin": {
        return path.join(process.env.HOME, "Library", "Application Support", "context-switcher-data");
      }
      case "win32": {
        return path.join(process.env.APPDATA, "context-switcher-data");
      }
      case "linux": {
        return path.join(process.env.HOME, ".context-switcher-data");
      }
      default: {
        return 'data';
      }
    }
  }