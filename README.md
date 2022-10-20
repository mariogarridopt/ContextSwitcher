ContextSwitcher
===

An electron app that keep track of the tasks you are doing with a simple interface.
Click on the item or just hit Enter to add new tasks. Click to make the timer active. Right click to remove it. Simple!

![example of context switcher](images/example.png)

## Try it youself
This app runs with nodejs and build to any OS using Electron.
To build a version of the app to your os run the node command:

```bash
npm install && npm run make
```

If you just want to make it run so you can work on the code you can always make it run without building with:

```bash
npm install && npm start
```

The files are organized in a way that the mas dir is responsable to make the app run inside Electron and everything that the WebPage needs to run is inside /app.
