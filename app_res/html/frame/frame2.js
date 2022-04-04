var data_Comp = []
var myChart_index1 = echarts.init(document.getElementById('chart2'));
var myChart_index2 = echarts.init(document.getElementById('chart3_1'));

function movement(){
    var myChart = echarts.init(document.getElementById('Personal_index'));
    myChart.showLoading();
    $.get('les-miserables.gexf', function (xml) {
        myChart.hideLoading();
    
        var graph = echarts.dataTool.gexf.parse(xml);
        var categories = [];
        for (var i = 0; i < 9; i++) {
            categories[i] = {
                name: '类目' + i
            };
        }
        graph.nodes.forEach(function (node) {
            node.itemStyle = null;
            node.value = node.symbolSize;
            node.symbolSize /= 1.5;
            node.label = {
                show: node.symbolSize > 30
            };
            node.category = node.attributes.modularity_class;
        });
        option = {
            tooltip: {
                trigger:'item'
            },
            // legend: [{
            //     // selectedMode: 'single',
            //     data: categories.map(function (a) {
            //         return a.name;
            //     })
            // }],
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    name: '系统架构关系图',
                    type: 'graph',
                    layout: 'none',
                    data: graph.nodes,
                    links: graph.links,
                    categories: categories,
                    roam: true,
                    focusNodeAdjacency: true,
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                    },
                    label: {
                        position: 'right',
                        formatter: '{b}'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3
                    },
                    emphasis: {
                        lineStyle: {
                            width: 10
                        }
                    }
                }
            ]
        };
    
        myChart.setOption(option);
    }, 'xml');
}
function piechart(){
    var data = genComData();
    option = {
        title: {
            text: '数据成分统计',
            left:'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        series: [
            {
                name: "Alpha Project",
                type: 'pie',
                radius: '65%',
                center: ['55%', '55%'],
                data: data.seriesData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    return option;
}
function longchart(){
    option = {
        title: {
            text: '服务器历史数据'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['历史数据1', '历史数据2', '历史数据3', '历史数据4', '历史数据5']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '历史数据1',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100)]
            },
            {
                name: '历史数据2',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100)]
            },
            {
                name: '历史数据3',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100)]
            },
            {
                name: '历史数据4',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100)]
            },
            {
                name: '历史数据5',
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {},
                data: [100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100), 100+parseInt(Math.random()*100)]
            }
        ]
    };
    return option;    
}
function genComData() {
    getComposition();
    var nameList = ['<1s','1-10min','10-20min','20-30min','30-40min','40-50min','50-60min','60-180min','180-360min'];
    var legendData = [];
    var seriesData = [];
    var selected = {};
    for (var i = 0; i < 9; i++) {
        name = nameList[i];
        legendData.push(name);
        seriesData.push({
            name: name,
            value: data_Comp[i]
        });
        selected[name] = i < 9;
    }
    return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
    };
}

function getComposition(){
    var url = "http://zyhdbw.cn/RES/DataClean.php";
    htmlobj=$.ajax({
        url:url,
        async:false,
        dataType:"json",
        success:function(result){
                if(result){
                    for(var i = 1;i<=9;i++){
                        data_Comp.push(parseInt(result[('s'+i)]));
                    }
                }
            },
        error:function(errmsg) {
            alert("Ajax获取数据错误,请检查您的网络连接！"+errmsg);
        }
    });
}

$(function(){
    myChart_index1.setOption(piechart());
    myChart_index2.setOption(longchart());
    movement();
    // myChart_index3.setOption(movement());
    window.onresize = function(){
        myChart_index1.resize;
        myChart_index2.resize;
        // myChart_index3.resize;
    }

})