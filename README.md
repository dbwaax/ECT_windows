## 交通时空大数据分析挖掘系统(Windows 客户端)


## 1.什么是交通时空大数据分析挖掘系统？
交通时空大数据分析挖掘系统：设计并实现了一种交通时空大数据分析挖掘系统。系统的主要组成部分为:云服务器、移动端应用(安卓)、windows端应用。  
为了实现高效的分布式处理过程,系统的分布式环境采用spark+hadoop,在利用hdfs分布式存储的情况下充分发挥出spark快速处理分布式数据的优势,并支持用户采用pyspark + jupyter notebook对任务程序进行编写并提交任务运行。在分布式系统中对手机信令数据的处理主要分为:数据上传与数据抓取、数据清洗、数据处理、数据分析、数据可视化。


## 2.基于什么开发？
Windows桌面应用的设计基于**Electron** + **Node.js** + **VScode**,主要设计语言是**HTML+JS**，图形表格插件用到**Echarts.js**。


## 3.功能介绍
①数据清洗成分介绍：调用服务器数据清晰成分接口，获得数据在前端进行以显示。  
②系统功能介绍：对系统的功能进行一定的介绍。  
③数据上传：利用服务器文件上传接口上传用户文件。  
④可视化数据处理：调用强制清洗数据接口对用户上传数据进行处理，并实时反馈处理结果。  
⑤出行分析：调用相对应接口获得出行分析结果。  
⑥人口驻留可视化：对人口驻留聚类数据利用Echart上进行可视化展示。  
⑧分时端驻留可视化：对分时驻留聚类数据利用Echart上进行可视化展示。  
⑨动态热力图等：使用Echart生成动态热力图。  

## 4.效果展示
![image](https://github.com/dbwaax/ECT_windows/master/image/windows1.png)  
![image](https://github.com/dbwaax/ECT_windows/master/image/windows2.png)  
![image](https://github.com/dbwaax/ECT_windows/master/image/windows3.png)  
![image](https://github.com/dbwaax/ECT_windows/master/image/windows4.png)  
![image](https://github.com/dbwaax/ECT_windows/master/image/windows5.png)  
![image](https://github.com/dbwaax/ECT_windows/master/image/windows6.png)  
![image](https://github.com/dbwaax/ECT_windows/master/image/windows7.png)  
![image](https://github.com/dbwaax/ECT_windows/master/image/wwwww1w1w1w1.png)  



## License

[CC0 1.0 (Public Domain)](LICENSE.md)
