/*
 * @Author: your name
 * @Date: 2020-10-19 17:01:11
 * @LastEditTime: 2020-10-19 18:02:48
 * @LastEditors: Please set LastEditors
 * @Description: supervisor
 * @FilePath: \BatchProcessingVideo\src\index.js
 */
const got = require('got');
const express = require('express');
const app = express();

got('https://v.douyin.com/JPjUkFM/', {
    timeout: 10000
})
.then(response => {
    // console.log(Object.keys(response), response.url)
    // 得到地址
    const query = response.url.split('?')[1];
    // 抖音用户数据列表
    const host = 'https://www.iesdouyin.com/web/api/v2/aweme/post/?';
    console.log(host + query);

    got(host + '?sec_uid=MS4wLjABAAAAJRGd8njPGcGlqQfig55Y17_ur5y5VIGnQGIIy9pll44&count=21&max_cursor=0&aid=1128&_signature=qP.NpgAA94FAJe.bP9lNeaj.zb&dytk=')
    .then(resList => {
        let list = Object.values(resList)
        console.log('抖音用户数据列表',Object.keys(resList), resList);
    })
    .catch(error => {
        console.log(error)
    })
})
.catch(error => {
    console.log('Something went wrong:\n' + error)
})


app.listen(8001, function () {
    console.log('Example app listening on port 3000!');
  });