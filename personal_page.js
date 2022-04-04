const renderer = require('electron').ipcRenderer
const exec = require('child_process').exec;
const exec1 = require('child_process').exec;
const { shell } = require('electron');
var sub1Id;
window.onload = function(){
    setTimeout(() => {
        load_flag = 'ok';
    }, 1000);
  sub1Id = handleGetCommandWindowId();
  $('#id_selector').fadeOut(1);
  $('.frame_content').css({"width":"100%"});  
}
setInterval(function () {
    Loading();
}, 500);
btn_mainPage = document.getElementById("content_logo");
btn_mainPage.addEventListener("click",()=>{
    frame.setAttribute('src','frame/index2.html');
})
frame = document.getElementById("frame_content");
btn_outStyle = document.getElementById("index1");
btn_outStyle.addEventListener("click",()=>{
    // frame.setAttribute('src','http:zyhdbw.cn/RES/heatmap.html');//'frame/index2.html');
    frame.setAttribute('src','frame/heatmap.html');
})

btn_heatmap = document.getElementById("index2");
btn_heatmap.addEventListener("click",()=>{
    frame.setAttribute('src','frame/index1.html');
})
btm_residency = document.getElementById("index3");
btm_residency.addEventListener("click",(e)=>{
    frame.setAttribute('src','frame/index3.html');
})
btn_time = document.getElementById("index4");
btn_time.addEventListener("click",(e)=>{
    frame.setAttribute('src','frame/index4.html');
})
id_selector = document.getElementById('id_selector');
id_selector.addEventListener("mouseleave",(e)=>{
    $('#id_selector').fadeOut(100);
    $('#selector_bg').fadeOut(100);
    $('.frame_content').css({"width":"100%"});
    document.getElementById('frame_content').contentWindow.location.reload(true)
    // $('#frame_content').contentWindow.location.reload(true);
})
list_button = document.getElementById('list_button');
list_button.addEventListener("mouseover",(e)=>{
    $('#id_selector').fadeIn(100);
    $('#selector_bg').fadeIn(100);
    $('.frame_content').css({"width":"80%"});
})


exec_btn = document.getElementById('exec');
exec_btn.addEventListener("click",(e)=>{
    me = document.getElementById("exec");
    me.innerHTML = "数据处理中....";
    me.setAttribute("disabled", true);
    renderer.invoke('open-window', 'cw');
    handleComunicateCommandWindow(" ")
    runExec1();
})
upload = document.getElementById('up');
upload.addEventListener("click",(e)=>{
    me = document.getElementById("up");
    me.innerHTML = "加载中....";
    me.setAttribute("disabled", true);
    // load_flag ='reload';
    runExec();
})
oindex = document.getElementById('oindex');
oindex.addEventListener('click',(e)=>{
    me = document.getElementById("oindex");
    me.innerHTML = "跳转中....";
    me.setAttribute("disabled", true);
    e.preventDefault();
    shell.openExternal("http://zyhdbw.cn/");
    me.removeAttribute("disabled");
    me.innerHTML = "访问官网";
})
async function handleGetCommandWindowId () {
    sub1Id = await renderer.invoke('get-process-id', 'cw');
    console.log('sub1Id'+sub1Id);
}

function handleComunicateCommandWindow (data) {
   renderer.sendTo(sub1Id,'new_data',data);
}

//Upload CSV File

function runExec() {
  let cmdStr = 'ssh_test.exe qwerty';
  let cmdStr_move = 'exec_script.exe 123456 python mv1.py';
  let cmdPath = 'E:/Aelectrion/APP/electron-quick-start/app_res/exe' 
  let workerProcess
  me = document.getElementById("up");
  workerProcess = exec(cmdStr, {cwd: cmdPath});
  workerProcess = exec(cmdStr_move, {cwd: cmdPath});
  workerProcess.stdout.on('data', function (data) {
    handleComunicateCommandWindow(data);
    console.log('stdout: ' + data);
  });
  workerProcess.on('close', function (code) {
    console.log('out code：' + code);
    if(code==0){
        me.removeAttribute("disabled");
        me.innerHTML="上传文件";
    }
  })
}
function runExec1() {
    let cmdStr1 = 'exec_script.exe qwerty 0 0';
    let cmdPath1 = 'E:/Aelectrion/APP/electron-quick-start/app_res/exe';
    let workerProcess1;
    workerProcess1 = exec1(cmdStr1, {cwd: cmdPath1})
    workerProcess1.stdout.on('data', function (data) {
        handleComunicateCommandWindow(data);
        console.log('stdout: ' + data);
    });
    workerProcess1.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    workerProcess1.on('close', function (code) {
        me = document.getElementById("exec");
        me.innerHTML = "数据处理";
        me.removeAttribute("disabled");
    })
}
var flag = true;
function boxStyle(box_id){
    var bTop = $(box_id).offset().top;//盒子距离其父元素的top值
    var bLeft = $(box_id).offset().left;//盒子距离其父元素的left值
    var W = $(box_id).innerWidth();//盒子的长度width
    var H = $(box_id).innerHeight();//盒子的宽度height
    $(box_id).mouseenter(function(){
        if(flag){
            flag = false;
            $(box_id).css('marginLeft',50);
            $(box_id).css({'background-color':'#D58512','border-radius':'6%','box-shadow':'0 0 10px rgba(0,0,0,0.5)'});
        }
        $(box_id).mousemove(function(e){
            var mX = e.pageX-bLeft;//鼠标相对盒子x轴坐标值
            var mY = e.pageY-bTop;//鼠标相对盒子y轴坐标值
            var xdeg = -(mY - H/2)/5;
            var ydeg = (mX - W/2)/5;
            // $(box_id).css('left',150);
            if(mX<(W/2)&&mY<(H/2)){
                $(box_id).css({"transform":"rotateX("+xdeg+"deg) rotateY("+ydeg+"deg) scale(1.25)"});
            }else if(mX<(W/2)&&mY>(H/2)){
                $(box_id).css({"transform":"rotateX("+xdeg+"deg) rotateY("+ydeg+"deg) scale(1.25)"});
            }else if(mX>(W/2)&&mY<(H/2)){
                $(box_id).css({"transform":"rotateX("+xdeg+"deg) rotateY("+ydeg+"deg) scale(1.25)"});
            }else if(mX>(W/2)&&mY>(H/2)){
                $(box_id).css({"transform":"rotateX("+xdeg+"deg) rotateY("+ydeg+"deg) scale(1.25)"});
            }
        });
        $(box_id).mouseout(function(){
            flag = true;
            $(box_id).css({"transform":"rotateX(0deg) rotateY(0deg) scale(1)"});
            $(box_id).css('marginLeft',0);
            $(box_id).removeAttr('style');
            $(box_id).mousemove = null;
            $(box_id).mouseout = null;
        });
    })
}
  
