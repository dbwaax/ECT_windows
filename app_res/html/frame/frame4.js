var myChart_time = echarts.init(document.getElementById('chart'));
var myChart_cd1 = echarts.init(document.getElementById('cd1'));
var myChart_cd2 = echarts.init(document.getElementById('cd2'));
var myChart_cd3 = echarts.init(document.getElementById('cd3'));
var myChart_cd4 = echarts.init(document.getElementById('cd4'));
var myChart_cd5 = echarts.init(document.getElementById('cd5'));
var myChart_cd6 = echarts.init(document.getElementById('cd6'));
var myChart_cd7 = echarts.init(document.getElementById('cd7'));
data = [];
geoCoordMap = {};
data1 = [];
geoCoordMap1 = {};
data2 = [];
geoCoordMap2 = {};
data3 = [];
geoCoordMap3 = {};
data4 = [];
geoCoordMap4 = {};
data5 = [];
geoCoordMap5 = {};
data6 = [];
geoCoordMap6 = {};
$(document).ready(function(){
    var op1 = initChart();
    var op2 = count_chart1();
    var op3 = count_chart2();
    var op4 = count_chart3();
    var op5 = count_chart4();
    var op6 = count_chart5();
    var op7 = count_chart6();
    var op8 = count_chart7();
    $.fakeLoader({
        timeToHide:500,
        bgColor:"#ffffff",
        spinner:"spinner3"
    });
    myChart_time.setOption(op1);
    myChart_cd1.setOption(op2);
    myChart_cd2.setOption(op3);
    myChart_cd3.setOption(op4);
    myChart_cd4.setOption(op5);
    myChart_cd5.setOption(op6);
    myChart_cd6.setOption(op7);
    myChart_cd7.setOption(op8);
    // $("#detail_chart1").css({'display':'block','top':'50px','animation':'1s sub_window_move_detail'});
    $("#detail_chart2").css({'display':'block','top':'15px','animation':'1s sub_window_move_detail2'});
    $("#cd1").css({'display':'block','top':'50px','animation':'1s cd_move_13'});
    $("#cd2").css({'display':'block','top':'290px','animation':'1s cd_move_24'});
    $("#cd3").css({'display':'block','top':'50px','animation':'1s cd_move_13'});
    $("#cd4").css({'display':'block','top':'290px','animation':'1s cd_move_24'});
    window.onresize = function(){
        myChart_time.resize;
        myChart_cd1.resize;
        myChart_cd2.resize;
        myChart_cd3.resize;
        myChart_cd4.resize;
        myChart_cd5.resize;
        myChart_cd6.resize;
        myChart_cd7.resize;
    }
})
function initChart(){
    gettimeClusterDate1();
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
        return res;
    };
    var convertData1 = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap1[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    var convertData2 = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap2[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    var convertData3 = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap3[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    var convertData4 = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap4[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    var convertData5 = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap5[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    var convertData6 = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap6[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    option = {
        title: {
            text: '驻留区域地图映射',
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
            center:[123.39269251867277,41.846436438110374],
            zoom:12,
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
                data: a1 = convertData(data.sort(function (a, b) {
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
                itemStyle: {
                    color: '#FF9900',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            },
            {
                name: 'Top 7',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: a1 = convertData1(data1.sort(function (a, b) {
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
                itemStyle: {
                    color: '#CC0000',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            },
            {
                name: 'Top 7',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: a1 = convertData2(data2.sort(function (a, b) {
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
                itemStyle: {
                    color: '#00FFFF',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            },
            {
                name: 'Top 7',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: a1 = convertData3(data3.sort(function (a, b) {
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
                itemStyle: {
                    color: '#0099FF',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            },
            {
                name: 'Top 7',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: a1 = convertData4(data4.sort(function (a, b) {
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
                itemStyle: {
                    color: '#669999',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            },
            {
                name: 'Top 7',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: a1 = convertData5(data5.sort(function (a, b) {
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
                itemStyle: {
                    color: '#663366',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            },
            {
                name: 'Top 7',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: a1 = convertData6(data6.sort(function (a, b) {
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
                itemStyle: {
                    color: '#FFCCFF',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            },
        ]
    }
    return option;
}
function count_chart1(){
    data_loc = []
    for(var i = 0;i<data.length;i++){
        data_loc.push(data[i].value)
    }
    option = {
        tooltip : {
            trigger: 'item',
        },
        angleAxis: {
            type: 'category',
            data: labels1,
            textStyle:{
                fontSize: '26',		//字体大小
                fontWeight: 'bolder'		//字体加粗
            },
            axisLabel:{
                interval:0,
                formatter: function(params){
                    if(params.length>5){
                        return params[4]+params[5]+params[6]+".";
                    }

                }
            },
        },
        center: ['30%', '50%'],
        radiusAxis: {
        },
        polar: {
        },
        series: [{
            type: 'bar',
            data: data_loc,
            coordinateSystem: 'polar',
            name: 'A',
            stack: 'a',
            itemStyle: {
                normal: {
                    color: '#FF9900'
                    },
                },
        }],
    };
    return option;
}
function count_chart2(){
    data_loc = []
    for(var i = 0;i<data1.length;i++){
        data_loc.push(data1[i].value)
    }
    option = {
        tooltip : {
            trigger: 'item',
        },
        angleAxis: {
            type: 'category',
            data: labels2,
            textStyle:{
                fontSize: '26',		//字体大小
                fontWeight: 'bolder'		//字体加粗
            },
            axisLabel:{
                interval:0,
                formatter: function(params){
                    if(params.length>5){
                        return params[4]+params[5]+params[6]+".";
                    }

                }
            },
        },
        center: ['30%', '50%'],
        radiusAxis: {
        },
        polar: {
        },
        series: [{
            type: 'bar',
            data: data_loc,
            coordinateSystem: 'polar',
            name: 'B',
            stack: 'b',
            itemStyle: {
                normal: {
                    color: '#CC0000'
                    },
                },
        }],
    };
    return option;
}
function count_chart3(){
    data_loc = []
    for(var i = 0;i<data2.length;i++){
        data_loc.push(data2[i].value)
    }
    option = {
        tooltip : {
            trigger: 'item',
        },
        angleAxis: {
            type: 'category',
            data: labels3,
            textStyle:{
                fontSize: '26',		//字体大小
                fontWeight: 'bolder'		//字体加粗
            },
            axisLabel:{
                interval:0,
                formatter: function(params){
                    if(params.length>5){
                        return params[4]+params[5]+params[6]+".";
                    }

                }
            },
        },
        center: ['30%', '50%'],
        radiusAxis: {
        },
        polar: {
        },
        series: [{
            type: 'bar',
            data: data_loc,
            coordinateSystem: 'polar',
            name: 'C',
            stack: 'b',
            itemStyle: {
                normal: {
                    color: '#00FFFF'
                    },
                },
        }],
    };
    return option;
}
function count_chart4(){
    data_loc = []
    for(var i = 0;i<data3.length;i++){
        data_loc.push(data3[i].value)
    }
    option = {
        tooltip : {
            trigger: 'item',
        },
        angleAxis: {
            type: 'category',
            data: labels4,
            textStyle:{
                fontSize: '26',		//字体大小
                fontWeight: 'bolder'		//字体加粗
            },
            axisLabel:{
                interval:0,
                formatter: function(params){
                    if(params.length>5){
                        return params[4]+params[5]+params[6]+".";
                    }

                }
            },
        },
        center: ['30%', '50%'],
        radiusAxis: {
        },
        polar: {
        },
        series: [{
            type: 'bar',
            data: data_loc,
            coordinateSystem: 'polar',
            name: 'D',
            stack: 'd',
            itemStyle: {
                normal: {
                    color: '#0099FF'
                    },
                },
        }],
    };
    return option;
}
function count_chart5(){
    data_loc = []
    for(var i = 0;i<data4.length;i++){
        data_loc.push(data4[i].value)
    }
    option = {
        tooltip : {
            trigger: 'item',
        },
        angleAxis: {
            type: 'category',
            data: labels5,
            textStyle:{
                fontSize: '26',		//字体大小
                fontWeight: 'bolder'		//字体加粗
            },
            axisLabel:{
                interval:0,
                formatter: function(params){
                    if(params.length>5){
                        return params[4]+params[5]+params[6]+".";
                    }

                }
            },
        },
        center: ['30%', '50%'],
        radiusAxis: {
        },
        polar: {
        },
        series: [{
            type: 'bar',
            data: data_loc,
            coordinateSystem: 'polar',
            name: 'E',
            stack: 'e',
            itemStyle: {
                normal: {
                    color: '#669999'
                    },
                },
        }],
    };
    return option;
}
function count_chart6(){
    data_loc = []
    for(var i = 0;i<data5.length;i++){
        data_loc.push(data5[i].value)
    }
    option = {
        tooltip : {
            trigger: 'item',
        },
        angleAxis: {
            type: 'category',
            data: labels6,
            textStyle:{
                fontSize: '26',		//字体大小
                fontWeight: 'bolder'		//字体加粗
            },
            axisLabel:{
                interval:0,
                formatter: function(params){
                    if(params.length>5){
                        return params[4]+params[5]+params[6]+".";
                    }

                }
            },
        },
        center: ['30%', '50%'],
        radiusAxis: {
        },
        polar: {
        },
        series: [{
            type: 'bar',
            data: data_loc,
            coordinateSystem: 'polar',
            name: 'F',
            stack: 'f',
            itemStyle: {
                normal: {
                    color: '#663366'
                    },
                },
        }],
    };
    return option;
}
function count_chart7(){
    data_loc = []
    for(var i = 0;i<data6.length;i++){
        data_loc.push(data6[i].value)
    }
    option = {
        tooltip : {
            trigger: 'item',
        },
        angleAxis: {
            type: 'category',
            data: labels7,
            textStyle:{
                fontSize: '26',		//字体大小
                fontWeight: 'bolder'		//字体加粗
            },
            axisLabel:{
                interval:0,
                formatter: function(params){
                    if(params.length>5){
                        return params[4]+params[5]+params[6]+".";
                    }

                }
            },
        },
        center: ['30%', '50%'],
        radiusAxis: {
        },
        polar: {
        },
        series: [{
            type: 'bar',
            data: data_loc,
            coordinateSystem: 'polar',
            name: 'G',
            stack: 'g',
            itemStyle: {
                normal: {
                    color: '#FFCCFF'
                    },
                },
        }],
    };
    return option;
}
function gettimeClusterDate1(){
    var url = "http://zyhdbw.cn/RES/time_cluster.php";
    htmlobj=$.ajax({
        url:url,
        async:false,
        dataType:"json",
        success:function(result){
                if(result){             
                        data = [];
                        geoCoordMap = {};
                        labels1 = JSON.parse(result['s1'])['label'].replace(/\[|]/g,'').split(",");
                        vals1 = JSON.parse(result['s1'])['val'].replace(/\[|]/g,'').split(",");
                        weights1 = JSON.parse(result['s1'])['weight'].replace(/\[|]/g,'').split(",");
                        nearbys1 = JSON.parse(result['s1'])['nearby'].replace(/\[|]/g,'').split(",");
                        
                        labels2 = JSON.parse(result['s2'])['label'].replace(/\[|]/g,'').split(",");
                        vals2 = JSON.parse(result['s2'])['val'].replace(/\[|]/g,'').split(",");
                        weights2 = JSON.parse(result['s2'])['weight'].replace(/\[|]/g,'').split(",");
                        nearbys2 = JSON.parse(result['s2'])['nearby'].replace(/\[|]/g,'').split(",");

                        labels3 = JSON.parse(result['s3'])['label'].replace(/\[|]/g,'').split(",");
                        vals3 = JSON.parse(result['s3'])['val'].replace(/\[|]/g,'').split(",");
                        weights3 = JSON.parse(result['s3'])['weight'].replace(/\[|]/g,'').split(",");
                        nearbys3 = JSON.parse(result['s3'])['nearby'].replace(/\[|]/g,'').split(",");

                        labels4 = JSON.parse(result['s4'])['label'].replace(/\[|]/g,'').split(",");
                        vals4 = JSON.parse(result['s4'])['val'].replace(/\[|]/g,'').split(",");
                        weights4 = JSON.parse(result['s4'])['weight'].replace(/\[|]/g,'').split(",");
                        nearbys4 = JSON.parse(result['s4'])['nearby'].replace(/\[|]/g,'').split(",");

                        labels5 = JSON.parse(result['s5'])['label'].replace(/\[|]/g,'').split(",");
                        vals5 = JSON.parse(result['s5'])['val'].replace(/\[|]/g,'').split(",");
                        weights5 = JSON.parse(result['s5'])['weight'].replace(/\[|]/g,'').split(",");
                        nearbys5 = JSON.parse(result['s5'])['nearby'].replace(/\[|]/g,'').split(",");

                        labels6 = JSON.parse(result['s6'])['label'].replace(/\[|]/g,'').split(",");
                        vals6 = JSON.parse(result['s6'])['val'].replace(/\[|]/g,'').split(",");
                        weights6 = JSON.parse(result['s6'])['weight'].replace(/\[|]/g,'').split(",");
                        nearbys6 = JSON.parse(result['s6'])['nearby'].replace(/\[|]/g,'').split(",");

                        labels7 = JSON.parse(result['s7'])['label'].replace(/\[|]/g,'').split(",");
                        vals7 = JSON.parse(result['s7'])['val'].replace(/\[|]/g,'').split(",");
                        weights7 = JSON.parse(result['s7'])['weight'].replace(/\[|]/g,'').split(",");
                        nearbys7 = JSON.parse(result['s7'])['nearby'].replace(/\[|]/g,'').split(",");

                        for(var i = 0;i<labels1.length;i++){
                            var jsonObj = {"name":labels1[i], "value":parseInt(weights1[i])};
                            data.push(jsonObj);
                            var NEW_NAME= labels1[i];
                            var new_data = [];
                            new_data.push(parseFloat(vals1[i*2]));
                            new_data.push(parseFloat(vals1[i*2+1]));
                            geoCoordMap[NEW_NAME] = new_data;
                        }
                        for(var i = 0;i<labels2.length;i++){
                            var jsonObj = {"name":labels2[i], "value":parseInt(weights2[i])};
                            data1.push(jsonObj);
                            var NEW_NAME= labels2[i];
                            var new_data = [];
                            new_data.push(parseFloat(vals2[i*2]));
                            new_data.push(parseFloat(vals2[i*2+1]));
                            geoCoordMap1[NEW_NAME] = new_data;
                        }
                        for(var i = 0;i<labels3.length;i++){
                            var jsonObj = {"name":labels3[i], "value":parseInt(weights3[i])};
                            data2.push(jsonObj);
                            var NEW_NAME= labels3[i];
                            var new_data = [];
                            new_data.push(parseFloat(vals3[i*2]));
                            new_data.push(parseFloat(vals3[i*2+1]));
                            geoCoordMap2[NEW_NAME] = new_data;
                        }
                        for(var i = 0;i<labels4.length;i++){
                            var jsonObj = {"name":labels4[i], "value":parseInt(weights4[i])};
                            data3.push(jsonObj);
                            var NEW_NAME= labels4[i];
                            var new_data = [];
                            new_data.push(parseFloat(vals4[i*2]));
                            new_data.push(parseFloat(vals4[i*2+1]));
                            geoCoordMap3[NEW_NAME] = new_data;
                        }
                        for(var i = 0;i<labels5.length;i++){
                            var jsonObj = {"name":labels5[i], "value":parseInt(weights5[i])};
                            data4.push(jsonObj);
                            var NEW_NAME= labels5[i];
                            var new_data = [];
                            new_data.push(parseFloat(vals5[i*2]));
                            new_data.push(parseFloat(vals5[i*2+1]));
                            geoCoordMap4[NEW_NAME] = new_data;
                        }
                        for(var i = 0;i<labels6.length;i++){
                            var jsonObj = {"name":labels6[i], "value":parseInt(weights6[i])};
                            data5.push(jsonObj);
                            var NEW_NAME= labels6[i];
                            var new_data = [];
                            new_data.push(parseFloat(vals6[i*2]));
                            new_data.push(parseFloat(vals6[i*2+1]));
                            geoCoordMap5[NEW_NAME] = new_data;
                        }
                        for(var i = 0;i<labels7.length;i++){
                            var jsonObj = {"name":labels7[i], "value":parseInt(weights7[i])};
                            data6.push(jsonObj);
                            var NEW_NAME= labels7[i];
                            var new_data = [];
                            new_data.push(parseFloat(vals7[i*2]));
                            new_data.push(parseFloat(vals7[i*2+1]));
                            geoCoordMap6[NEW_NAME] = new_data;
                        }   
                }
            },
        error:function(errmsg) {
            alert("Ajax获取数据错误,请检查您的网络连接！"+JSON.stringify(errmsg));
        }
    });
}