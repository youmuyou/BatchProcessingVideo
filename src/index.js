/*
 * @Author: your name
 * @Date: 2020-10-19 17:01:11
 * @LastEditTime: 2020-10-20 18:21:58
 * @LastEditors: Please set LastEditors
 * @Description: supervisor
 * @FilePath: \BatchProcessingVideo\src\index.js
 */
const got = require('got');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
got('https://v.douyin.com/JPAGUg3/', {
    timeout: 10000
})
.then(response => {
    console.log(Object.keys(response), response.url)
    // 更换地址 获取用户列表
    const url = response.url.replace('iesdouyin', 'amemv');
    // 抖音用户数据列表
    const path = 'https://www.amemv.com/web/api/v2/aweme/post/?' + response.url.split('?')[1]
    console.log(path);
    app.post(path, function (req, res) {
        console.log(res, '444');
    })
    // got(path)
    // .then(resList => {
    //     delete resList.body;
    //     console.log('抖音用户数据列表',Object.keys(resList), resList);
    // })
    // .catch(error => {
    //     console.log(error)
    // })
})
.catch(error => {
    console.log('Something went wrong:\n' + error)
})


app.listen(8001, function () {
    console.log('Example app listening on port 3000!');
  });