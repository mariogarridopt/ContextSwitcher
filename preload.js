const fs = require('fs')

const { contextBridge } = require('electron');

const saveFilePath = 'data/'
contextBridge.exposeInMainWorld('db', {
    'getObject': () => {
        try {
            let dataString = fs.readFileSync(saveFilePath + 'active.json', 'utf8');
            return JSON.parse(dataString);
          } catch (err) {
            return [];
          }
    },
    'saveObject': (obj) => {
        try {
            fs.writeFileSync(saveFilePath + 'active.json', JSON.stringify(obj))
          } catch (err) {
            console.error(err)
          } 
    },
    'addToHistory': (obj) => {
        let filename = 'trash.json';
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