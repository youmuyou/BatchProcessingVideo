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
const qs = require('qs');
app.use(bodyParser.urlencoded({ extended: false }));
// 用户列表
const baseUrl = 'https://www.amemv.com/web/api/v2/aweme/post/?';
// 视频地址
const videoUrl = 'https://aweme.snssdk.com/aweme/v1/playwm/?'
function a(path) {
    let param = {
        video_id: ''
    }
    got(path)
    .then(resList => {
        const res = JSON.parse(resList.body);
        console.log('抖音用户数据列表',res.aweme_list);
        const vidArr = res.aweme_list.map((item) => {
            return item.video.vid;
        })
        console.log(vidArr)

    })
    .catch(error => {
        console.log(error)
    })
}

got('https://v.douyin.com/JPAGUg3/', {
    timeout: 10000
})
.then(response => {
    // console.log(response.url)
    let arr = response.url.split('?');
    // 获取用户 sec_uid
    let param = qs.parse(arr[1]);
    // 条数
    param.count = 2
    param.max_cursor = 0
    param.aid = 1128
    // 抖音用户数据列表
    const path = baseUrl + qs.stringify(param)
    console.log(path)
    a(path)

})
.catch(error => {
    console.log(error)
})


app.listen(8001, function () {
    console.log('Example app listening on port 3000!');
  });