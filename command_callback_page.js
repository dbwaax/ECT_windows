const { BrowserWindow, ipcRenderer } = require('electron')
document.getElementById("command").innerHTML = '123';
ipcRenderer.on('new_data', (e, msg) => {
    document.getElementById("command").innerHTML = msg;
})
window.onload = function(){
    setInterval(function () {
        onGetMessage();
    }, 400);
}
msg_end = document.getElementById("msg_end1");
function onGetMessage()
{
    msg_end.scrollIntoView();
}