const { BrowserWindow } = require('electron');
const Menu = require('electron').Menu;
let command_win;
module.exports.createCommandWindow =() =>{
    if(command_win){
        command_win.show();
    }else{
        command_win = new BrowserWindow({
            width: 400,
            height: 500,
            frame:true,
            resizable:true,
            transparent: false,
            webPreferences: {
              preload: "./preload.js",
              nodeIntegration: true,
              webviewTag:true,
            }
        })
        command_win.on('close',(e)=>{
            e.preventDefault();
            command_win.hide();
          })
        Menu.setApplicationMenu(null);
        command_win.loadFile('app_res/html/command_callback.html');
        //command_win.webContents.openDevTools();
        // command_win.setMaximumSize(1280,720);
        // command_win.setMinimumSize(1280,720);
    }
    return command_win;
}