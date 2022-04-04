const { remote, ipcRenderer } = require('electron');
var quit = document.getElementById("quit_btn");
quit.addEventListener("click", ()=>{
    ipcRenderer.send('asynchronous-message','quit');
    const current_window = remote.getCurrentWindow();
    current_window.destroy();
})
var enter = document.getElementById("enter_btn");
enter.addEventListener("click", ()=>{
    ipcRenderer.invoke('open-window', 'pw');
    const current_window = remote.getCurrentWindow();
    current_window.destroy();
})
