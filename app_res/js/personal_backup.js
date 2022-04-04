const { BrowserWindow } = require('electron');
const url = require('url');
const Menu = require('electron').Menu;
let peronal_win;

module.exports.createMainWindow = ()=>{
  if(peronal_win){
    peronal_win.show();
  } else{
      peronal_win = new BrowserWindow({
        width: 1280,
        height: 720,
        frame:true,
        resizable:false,
        transparent: false,
        webPreferences: {
          preload: "./preload.js",
          nodeIntegration: true,
          webviewTag:true,
        }
      })
      Menu.setApplicationMenu(null);
      peronal_win.loadURL(url.format({
        pathname: path.join(__dirname, 'app_res/html/index.html'),
        protocol: 'file:',
        slashes: true
    }))
      peronal_win.webContents.openDevTools();
      // peronal_win.loadFile('app_res/html/personal.html');
      //peronal_win.loadFile('html/personal.html');
      peronal_win.setMaximumSize(1280,720);
      peronal_win.setMinimumSize(1280,720);
  } 
  return peronal_win;
}