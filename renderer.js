const { remote, ipcRenderer } = require('electron');
window.onload = function(){
  window.setTimeout(function(){
    //ipcRenderer.send('asynchronous-message','ping')
    ipcRenderer.invoke('open-window', 'pw');
    const current_window = remote.getCurrentWindow();
    current_window.destroy();
  },1000)
}