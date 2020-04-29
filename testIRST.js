var data1 = '藏书印文如宋接着是项目实践情况。我于2018年7月份，参加了上海图书馆开放数据应用开发竞赛，开发人文数据知识服务平台，并获得了优秀奖。'
    +'于2019年上半年，参与了软件工程课程的大作业实践，开发生鲜超市网站。除此之外，在前三年的大学课程实践中我一直担任小组组长，'
    +'协调队伍完成过如驾驶疲劳检测等项目，在课程实践中，我基本能让所有成员参与到项目中，为其分配清晰的任务内容与时间进度。项目实践项目实践#';
var queryStr = '项目';
var firstChar = data1[0];
var IRST = [];
var keys;

//创建算法
function createIRST(data) {
    // 提取字符集
    var dict1 = {
    };
    for (let i = 0; i < data.length; i++) {
        if (dict1.hasOwnProperty(data[i])) {
            dict1[data[i]] += 1;
        }
        else{
            dict1[data[i]] = 1;
        }
    // console.log(str[i])
    }

    // 初始化树
    let mid = {

    };
    for (key in dict1) {
        var child = [{index:0}];
        for (let i = 0; i < dict1[key]; i++) {
            child.push({
                nextD: '',
                nextI: -1
            });
        }
        mid = {
            root: key,
            children: child
        };
        IRST.push(mid)
    }
    // console.log(IRST[0].children)
    // console.log(IRST[0])

    // 创建后继树
    keys = Object.getOwnPropertyNames(dict1);
    let j,k,index1,index2;

    j = keys.indexOf(data[0]);
    index1 = IRST[j].children[0].index;
    IRST[j].children[index1+1].nextD = data[1];

    for (let i = 1; i < data.length - 1; i++) {
        j = keys.indexOf(data[i]);
        index1 = IRST[j].children[0].index;
        IRST[j].children[index1+1].nextD = data[i+1];

        k = keys.indexOf(data[i-1]);
        index2 = IRST[k].children[0].index;
        IRST[k].children[index2+1].nextI = index1;
        IRST[k].children[0].index += 1
    }

    console.log(IRST)
    console.log(IRST[0])
}

// 查询算法
function queryIRST(queryStr) {
    let count = 0;
    let index = keys.indexOf(queryStr[0]);
    if (queryStr.length === 1) {
        count = IRST[index].children[0].index;
    }

    let len = IRST[index].children.length;
    for (let i = 1; i < len; i++) {
        if (IRST[index].children[i].nextD === queryStr[1]) {
            if (queryStr.length === 2) {
                count += 1
            }
            if (query(queryStr.slice(1),IRST[index].children[i].nextI)){
                count += 1
            }
        }
    }

    function query(qs,i){
        let index2 = keys.indexOf(qs[0]);
        if (IRST[index2].children[i+1].nextD === qs[1]) {
            if (qs.length === 2) {
                return true
            } else {
                return query(qs.slice(1),IRST[index2].children[i+1].nextI)
            }
        }
        return false
    }
    console.log(count);
}
// 查询算法
// function queryIRST(queryStr) {
//     let count = 0;
//     let index = keys.indexOf(queryStr[0]);
//     if (queryStr.length === 1) {
//         count = IRST[index].children[0].index;
//     }
//
//     let len = IRST[index].children.length;
//     for (let i = 1; i < len; i++) {
//         if (IRST[index].children[i].nextD === queryStr[1]) {
//             if (query(queryStr.slice(1),IRST[index].children[i].nextI)){
//                 count += 1
//             }
//         }
//     }
//
//     function query(qs,i){
//         if (qs.length === 1) {
//             return true
//         }
//         let index2 = keys.indexOf(qs[0]);
//         if (IRST[index2].children[i+1].nextD === qs[1]) {
//             return query(queryStr.slice(1),IRST[index2].children[i+1].nextI)
//         }
//         return false
//     }
//     console.log(count);
// }

// 还原原文
function restoreText() {
    let res = firstChar;
    let index = keys.indexOf(firstChar);

    if (IRST[index].children[1].nextD !== '#') {
        let mid = IRST[index].children[1].nextD;
        res += mid;
        query(mid,IRST[index].children[1].nextI)
    }

    function query(qs,i){
        let index2 = keys.indexOf(qs);
        if (IRST[index2].children[i+1].nextD !== '#') {
            let mid = IRST[index2].children[i+1].nextD;
            res += mid;
            query(mid,IRST[index2].children[i+1].nextI)
        }
        else{
            res += '#';
        }
    }
    console.log(res);
}

// 测试
createIRST(data1);
queryIRST(queryStr);
restoreText();

// console.log(keys);

