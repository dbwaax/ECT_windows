var data = [];
var geoCoordMap = {};
var myChart1 = echarts.init(document.getElementById('chart3'));
var myChart2 = echarts.init(document.getElementById('chart1_3'));
var myChart3 = echarts.init(document.getElementById('chart2_3'));
function init_chart(){
    // var myChart = echarts.init(document.getElementById('chart3'));
    getDate();
    //gettimeClusterDate();
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        console.log(res)
        return res;

    };
    option = {
        title: {
            text: '0-6点驻留区域地图映射',
            subtext: '地图',
            left: 'center'
        },
        tooltip : {
            trigger: 'item',
            formatter:function(params){
                // console.log(params)
                // params是echarts封装的参数
                return (params.data.name +"<br>权重:"+params.data.value[2])
            }
        },
        bmap:{
            center:[123.38269251867277,41.806436438110374],
            zoom:10,
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
                        'visibility': 'off'
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
                        'visibility': 'off'
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
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
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
                name: 'Top 7',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 7)),
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
    //myChart.setOption(option);
    return option;
}
function second_chart(){
    // var myChart = echarts.init(document.getElementById('chart1_3'));
    var data  = getSecondData();
    option = {
        title: {
            text: '0-6点驻留区域统计表',
            subtext: '饼图',
            // left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },
        legend: {
            type: 'scroll',
            orient: 'horizontal',
            right: 'center',
            top: 40,
            bottom: 30,
            data: data.legendData,

            selected: data.selected
        },
        series: [
            {
                top:60,
                left:50,
                name: '姓名',
                type: 'pie',
                radius: '78%',
                center: ['40%', '50%'],
                data: data.seriesData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    //myChart.setOption(option);
    return option;
}
function third_chart(){
    // var myChart = echarts.init(document.getElementById('chart2_3'));
    source_data = [['score', 'amount', 'product']];
    for(var i = 0;i<label_list.length;i++){
        var new_data = []
        new_data.push(parseFloat(weight_list[i])/2+10.0)
        new_data.push(parseInt(weight_list[i]))
        new_data.push(label_list[i])
        source_data.push(new_data);
    }
    option = {
        top:30,
        title: {
            text: '0-6点驻留区域统计表',
            subtext: '柱状图',
            // left: 'center'
        },
        dataset: {
            source:source_data
        },
        tooltip : {
            trigger: 'item',
            // formatter:function(params){
            //     // console.log(params)
            //     // params是echarts封装的参数
            //     return (params.data.name +"<br>权重:"+params.data.value[2])
            // }
        },
        left: 'center',
        grid: {containLabel: true},
        xAxis: {name: 'amount'},
        yAxis: {type: 'category',
                    axisLabel:{
                        interval:0,
                        formatter: function(params){
                            if(params.length>5){
                                return "";
                            }

                        }
                    }},
        visualMap: {
            orient: 'horizontal',
            top:0,
            left:'center',
            min: 10,
            max: 100,
            text: ['人口密度大', '人口密度小'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                //color: ['#D7DA8B', '#E15457']
                color:['#FFA07A','#000000']
            }
        },
        series: [
            {
                top:0,
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'product'
                }
            }
        ]
    };
    //myChart.setOption(option);
    return option;
}
function getDate(){
    var url = "http://zyhdbw.cn/RES/Resident.php";
    htmlobj=$.ajax({
        url:url,
        async:false,
        dataType:"json",
        success:function(result){
                if(result){
                    label = result['label'];
                    val = result['val'].replace(/\[|]/g,'');
                    weight = result['weight'];
                    label_list = label.replace("[","").replace("]","").split(",")
                    val_list = val.split(',');
                    weight_list = weight.replace(/\[|]/g,'').split(',');
                    for(var i = 0;i<label_list.length;i++){
                        var jsonObj = {"name":label_list[i], "value":parseInt(weight_list[i])};
                        data.push(jsonObj);
                        var NEW_NAME= label_list[i];
                        var new_data = [];
                        new_data.push(parseFloat(val_list[i*2]));
                        new_data.push(parseFloat(val_list[i*2+1]));
                        geoCoordMap[NEW_NAME] = new_data;
                    }
                }
            },
        error:function(errmsg) {
            alert("Ajax获取数据错误,请检查您的网络连接！"+errmsg);
        }
    });
}
function getSecondData() {
    var nameList = label_list;
    var legendData = [];
    var seriesData = [];
    var selected = {};
    for (var i = 0; i < nameList.length; i++) {
        name = nameList[i];
        legendData.push(name);
        seriesData.push({
            name: name,
            value: weight_list[i]
        });
        selected[name] = i < nameList.length;
    }
    return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
    };
}
$(document).ready(function(){
    var op1 = init_chart();
    var op2 = second_chart();
    var op3 = third_chart();
    $.fakeLoader({
        timeToHide:400,
        bgColor:"#ffffff",
        spinner:"spinner3"
    });
    myChart1.setOption(op1);
    window.onresize = myChart1.resize;
    myChart2.setOption(op2);
    window.onresize = myChart2.resize;
    myChart3.setOption(op3);
    window.onresize = myChart3.resize;
    $('.chart33').css({'border-right':'gray solid 3px'});
    $('.chart11_3').css({'border-bottom':'gray solid 3px'});
});