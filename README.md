本项目基于2018年上海图书馆开放数据应用开发竞赛所设计开发的人文知识服务平台，原项目地址见https://github.com/TDYe123/Data_Streams

本项目在原来的基础上进行了互关联后继树模型（IRST）的实现与设计应用，具体的数据结构如下，其算法实现见文件testIRST.js

[
  {
    root: 'a',
    children: [ [Object], [Object], [Object], [Object], [Object] ]
  },
  {
    root: 'b',
    children: [ [Object], [Object], [Object], [Object], [Object] ]
  },
  { root: 'c', children: [ [Object], [Object], [Object], [Object] ] }
]

{
  root: 'a',
  children: [
    { index: 4 },
    { nextD: 'b', nextI: 0 },
    { nextD: 'b', nextI: 1 },
    { nextD: 'c', nextI: 1 },
    { nextD: 'b', nextI: 3 }
  ]
}


项目目录结构介绍：

bin：www为启动文件
public：包含前端页面设计，css，js，img等
routes：后端处理

