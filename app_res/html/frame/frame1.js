label_list = [];
val_list_second = [];
weight_list_second = [];
duringTime_list_second = [];
data_site = [];
data_temp = [];
var geoCoordMap_site = {};
var myChart1_1 = echarts.init(document.getElementById('container_site'));
var myChart1_2 = echarts.init(document.getElementById('chart1'));
var myChart1_3 = echarts.init(document.getElementById('chart2'));
var myChart1_4 = echarts.init(document.getElementById('chart3'));
function init_site_chart(){
  getSiteDate();
  var convertData = function (data_site) {
      var res = [];
      for (var i = 0; i < data_site.length; i++) {
          var geoCoord = geoCoordMap_site[data_site[i].name];
          if (geoCoord) {
              res.push({
                  name: data_site[i].name,
                  value: geoCoord.concat(data_site[i].value)
              });
          }
      }
      return res;
  };
  option = {
      tooltip : {
          trigger: 'item',
          formatter:function(params){
              // console.log(params)
              // params是echarts封装的参数
              return (params.data.name +"<br>权重:"+params.data.value[2])
          }
      },
      bmap:{
          center:[123.540859,41.812566],
          zoom:13,
          roam:true,
          mapStyle: {
              styleJson: [{
                  'featureType': 'water',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#d1d1d1'
                  }
              }, {
                  'featureType': 'land',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#f3f3f3'
                  }
              }, {
                  'featureType': 'railway',
                  'elementType': 'all',
                  'stylers': {
                      'visibility': 'on'
                  }
              }, {
                  'featureType': 'highway',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#fdfdfd'
                  }
              }, {
                  'featureType': 'highway',
                  'elementType': 'labels',
                  'stylers': {
                      'visibility': 'on'
                  }
              }, {
                  'featureType': 'arterial',
                  'elementType': 'geometry',
                  'stylers': {
                      'color': '#fefefe'
                  }
              }, {
                  'featureType': 'arterial',
                  'elementType': 'geometry.fill',
                  'stylers': {
                      'color': '#fefefe'
                  }
              }, {
                  'featureType': 'poi',
                  'elementType': 'all',
                  'stylers': {
                      'visibility': 'off'
                  }
              }, {
                  'featureType': 'green',
                  'elementType': 'all',
                  'stylers': {
                      'visibility': 'on'
                  }
              }, {
                  'featureType': 'subway',
                  'elementType': 'all',
                  'stylers': {
                      'visibility': 'on'
                  }
              }, {
                  'featureType': 'manmade',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#d1d1d1'
                  }
              }, {
                  'featureType': 'local',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#d1d1d1'
                  }
              }, {
                  'featureType': 'arterial',
                  'elementType': 'labels',
                  'stylers': {
                      'visibility': 'off'
                  }
              }, {
                  'featureType': 'boundary',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#fefefe'
                  }
              }, {
                  'featureType': 'building',
                  'elementType': 'all',
                  'stylers': {
                      'color': '#d1d1d1'
                  }
              }, {
                  'featureType': 'label',
                  'elementType': 'labels.text.fill',
                  'stylers': {
                      'color': '#999999'
                  }
              }]
          }
      },
      series : [
          {
              name: 'Top 10',
              type: 'effectScatter',
              coordinateSystem: 'bmap',
              data: convertData(data_site.sort(function (a, b) {
                  return b.value - a.value;
              }).slice(0, 10)),
              symbolSize: function (val) {
                  return 10+val[2] / 2;
              },
              showEffectOn: 'render',
              rippleEffect: {
                  brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
              },
              itemStyle: {
                  color: 'black',
                  shadowBlur: 10,
                  shadowColor: '#333'
              },
              zlevel: 1
          }
      ]
  }
  return option;
}


function second_site_chart(){
    option = {
        title: {
            text: '站点分析图',
            subtext: '权重+平均等候时间'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            left: '30%',
            data: ['权重', '平均等候时间(min)']
        },
        grid: {
            left: '0%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'category',
            data: label_list,
        },
        series: [
            {
                name: '权重',
                type: 'bar',
                data: weight_list_second
            },
            {
                name: '平均等候时间(min)',
                type: 'bar',
                data: duringTime_list_second
            }
        ]
    };
    return option;  
}
function third_site_chart(){
    getProportionDate();
    label_temp = [{"value":1,"name":"地铁"},{"value":1,"name":"公交"},{"value":1,"name":"其他"}]
    option = {
        title: {
            text: '出行占比情况',
            left: '50%',
            textAlign: 'center',
            top: '20%'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },
        color: ['#000000'],
        series: [{
            type: 'pie',
            data: data_temp,
            roseType: 'area',
            itemStyle: {
                normal: {
                    color: 'white',
                    borderColor: '#000000'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    show: false
                }
            }
        }, {
            type: 'pie',
            data: label_temp,
            radius: ['75%', '90%'],
            zlevel: -2,
            itemStyle: {
                normal: {
                    color: '#000000',
                    borderColor: 'white'
                }
            },
            label: {
                normal: {
                    position: 'inside'
                }
            }
        }]
    };
    return option;
}
var forth_data = [];
function forth_site_chart(){
    for(var i =0;i<weight_list_second.length;i++){
        
        forth_data.push( {value:weight_list_second[i], name: label_list[i]})
    }
    option = {
        top:20,
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            top:25,
            orient: 'vertical',
            left: 0,
            data: label_list
        },
        series: [
            {
                left:160,
                name: '车站占比',
                type: 'pie',
                radius: ['50%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '10',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: forth_data
            }
        ]
    };
    return option;
}
$(document).ready(function(){
  var op1 = init_site_chart();
  var op2 = second_site_chart();
  var op3 = third_site_chart();
  var op4 =  forth_site_chart();
  $.fakeLoader({
      timeToHide:200,
      bgColor:"#ffffff",
      spinner:"spinner3"
  });
  myChart1_1.setOption(op1);
  myChart1_2.setOption(op2);
  myChart1_3.setOption(op3);
  myChart1_4.setOption(op4);
  $('#container_chart1').css({'display':'block','top':'15px','animation':'0.6s window_move'});
  $('#chart1').css({'display':'block','top':'25px','animation':'0.6s sub_window_move_1'});
  $('#chart2').css({'display':'block','top':'320px','animation':'0.6s sub_window_move_23'});
  $('#chart3').css({'display':'block','top':'320px','animation':'0.6s sub_window_move_23'});
  window.onresize = function (){
      now_window_width = $(this.window).width()
      myChart1_1.resize;
      myChart1_2.resize;
      myChart1_3.resize;
      myChart1_4.resize;
      if(now_window_width<1200){
         $('#chart3').css({'right':'300px'});
      }else{
        $('#chart3').css({'right':'330px'});
      }
  }
});
function getSiteDate(){
  var url = "http://zyhdbw.cn/RES/popular_site.php";
  htmlobj=$.ajax({
      url:url,
      async:false,
      dataType:"json",
      success:function(result){
              if(result){
                  label = result['label'];
                  val = result['val'].replace(/\[|]/g,'');
                  weight = result['weight'];
                  duringTime = result['duringTime'];
                  label_list = label.replace("[","").replace("]","").split(",")
                  duringTime_list = duringTime.replace(/\[|]/g,'').split(',');
                  val_list = val.split(',');
                  weight_list = weight.replace(/\[|]/g,'').split(',');
                  for(var i = 0;i<label_list.length;i++){
                      var jsonObj = {"name":label_list[i], "value":parseInt(weight_list[i])};
                      data_site.push(jsonObj);
                      weight_list_second.push(parseInt(weight_list[i]))
                      duringTime_list_second.push(parseFloat(duringTime_list[i])/60000)
                      var NEW_NAME= label_list[i];
                      var new_data = [];
                      new_data.push(parseFloat(val_list[i*2]));
                      new_data.push(parseFloat(val_list[i*2+1]));
                      geoCoordMap_site[NEW_NAME] = new_data;
                  }
              }
          },
      error:function(errmsg) {
          alert("Ajax获取数据错误,请检查您的网络连接！"+errmsg);
      }
  });
}
function getProportionDate(){
    var url = "http://zyhdbw.cn/RES/TripProportion.php";
    htmlobj=$.ajax({
        url:url,
        async:false,
        dataType:"json",
        success:function(result){
                if(result){
                    subway = parseInt(result['subway']);
                    var jsonObj = {"value":subway,"name":"subway"};
                    data_temp.push(jsonObj);
                    bus = parseInt(result['bus']);
                    var jsonObj = {"value":bus,"name":"bus"};
                    data_temp.push(jsonObj);
                    others = parseInt(result['others']);
                    var jsonObj = {"value":others,"name":"others"};
                    data_temp.push(jsonObj);
                }
            },
        error:function(errmsg) {
            alert("Ajax获取数据错误,请检查您的网络连接！"+errmsg);
        }
    });
}
var flag = true;
function boxStyle1(box_id){
    var bTop = $(box_id).offset().top;//盒子距离其父元素的top值
    var bLeft = $(box_id).offset().left;//盒子距离其父元素的left值
    var W = $(box_id).innerWidth();//盒子的长度width
    var H = $(box_id).innerHeight();//盒子的宽度height
    $(box_id).mouseenter(function(){
        $(box_id).mousemove(function(e){
            var mX = e.pageX-bLeft;//鼠标相对盒子x轴坐标值
            var mY = e.pageY-bTop;//鼠标相对盒子y轴坐标值
            var xdeg = -(mY - H/2)/15;
            var ydeg = (mX - W/2)/15;
            if(flag){
              flag = false;
              $(box_id).css('marginRight',180);
              $(box_id).css('marginTop',100);
            }
            if(mX<(W/2)&&mY<(H/2)){
                $(box_id).css({"transform":"rotateX("+xdeg+"deg) rotateY("+ydeg+"deg) scale(2)"});
            }else if(mX<(W/2)&&mY>(H/2)){
                $(box_id).css({"transform":"rotateX("+xdeg+"deg) rotateY("+ydeg+"deg) scale(2)"});
            }else if(mX>(W/2)&&mY<(H/2)){
                $(box_id).css({"transform":"rotateX("+xdeg+"deg) rotateY("+ydeg+"deg) scale(2)"});
            }else if(mX>(W/2)&&mY>(H/2)){
                $(box_id).css({"transform":"rotateX("+xdeg+"deg) rotateY("+ydeg+"deg) scale(2)"});
            }
        });
        $(box_id).mouseout(function(){
            flag = true;
            $(box_id).css({"transform":"rotateX(0deg) rotateY(0deg) scale(1)"});
            $(box_id).css('marginLeft','30px');
            $(box_id).removeAttr('style');
            $(box_id).mousemove = null;
            $(box_id).mouseout = null;
        });
    })
}