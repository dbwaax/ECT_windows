const {app, BrowserWindow,remote} = require('electron');
const path = require('path');
const electron = require('electron');
const Menu = electron.Menu;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';  //Disable Warning
app.allowRendererProcessReuse = true;
const {ipcMain} = require('electron');
const { createMainWindow } = require('./personal');
const { createCommandWindow } = require('./command_callback');
const url = require('url');

global.saveDefault= {
  data:"1231"
}

app.on('ready', ()=>{
  const winAnimation = createWindow();
})
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame:false,
    menu:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      zoomFactor: 1,
      nodeIntegration: true,
      webviewTag:true,
    }
  })
  Menu.setApplicationMenu(null);
  // mainWindow.loadURL(winURL + 'app_res/html/index.html');
  // mainWindow.loadFile('app_res/html/index.html');
  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'app_res/html/index.html'),
      protocol: 'file:',
      slashes: true
  }))
  return mainWindow;
}
function createBannerWindow () {
  const f1_mainWindow = new BrowserWindow({
    width: 1000,
    height: 550,
    frame:false,
    resizable:false,
    transparent: true,
    webPreferences: {
      preload: "./preload.js",
      nodeIntegration: true,
      webviewTag:true,
    }
  })
  //const menu = Menu.buildFromTemplate(template)
  //Menu.setApplicationMenu(menu);
  Menu.setApplicationMenu(null);
  f1_mainWindow.loadFile('app_res/html/main.html');
  //f1_mainWindow.webContents.openDevTools();
  f1_mainWindow.setMaximumSize(1000,550);
  f1_mainWindow.setMinimumSize(1000,550);
  return f1_mainWindow;
}
app.on('quit', function(){
  console.log("好走不送");
})
let main_win;
ipcMain.on('asynchronous-message',(event,arg)=>{
   if(arg=='ping'){
     
    //createBannerWindow();
    //createMainWindow();
    console.log("123")
   }
   if(arg=='quit'){
    console.log("quit")
   }
   if(arg=='enter'){
    createMainWindow();
   }
   if(arg=='command11')
   {
    main_win = createCommandWindow();
    main_win.webContents.openDevTools();
   }
   else
   {
     console.log('1231231231231231231231231');
    //event.sender.send('reply', arg);
    }
})
let personal_window;
let command_window;
ipcMain.handle('open-window', (event, ...args) => {
  switch (args[0]) {
    case 'pw':
      personal_window = createMainWindow();
      console.log("Personal:\n"+personal_window);
      command_window = createCommandWindow();
      command_window.hide();
      personal_window.on('close',()=>{
        command_window.destroy();// = null;
      })
      break;
    case 'cw':
        command_window.show();
      break;
    default:
      break;
  }
})
ipcMain.handle('get-process-id', (event, processName) => {
  switch (processName) {
    case 'main':
      return 0; // 偷懒一下
    case 'pw':
      return personal_window.webContents.id;
    case 'cw':
      console.log(command_window.webContents.id);
      return (command_window.webContents.id);
    default:
      break;
  }
})
app.on('window-all-closed', function () {
  console.log("14544545");
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
