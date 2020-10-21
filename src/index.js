/*
 * @Author: your name
 * @Date: 2020-10-19 17:01:11
 * @LastEditTime: 2020-10-21 18:06:05
 * @LastEditors: Please set LastEditors
 * @Description: supervisor
 * @FilePath: \BatchProcessingVideo\src\index.js
 */
const got = require('got');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const qs = require('qs');
const http = require('http');
const https = require('https');
const os = require('os');
const path = require('path');
const fs = require('fs');
const child = require('child_process');
let mp4 = path.join(__dirname, '/video/2.mp4');
const m = `ffmpeg -ss 00:00:02  -i ${mp4} -r 24 p.mp4`

var options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    cwd: null,
    env: null
}
child.exec('node D:/gitup/BatchProcessingVideo/src/test.js',options, (err,stdout, stderr) => {
    console.error('错误', JSON.stringify(err),stdout, stderr);
})
// console.log(m.toString())
// child.exec(m, (err, stdout, stderr) => {
//     if (err) {
//       console.error('错误', JSON.stringify(err));
//       return;
//     }
//     console.log(stdout);
//   });


app.use(bodyParser.urlencoded({ extended: false }));
app.listen(8001, function () {
    console.log('Example app listening on port 3000!');
});

class downVideo  {
    constructor(option) {
        console.log(option)
        this.option = option;
        // 视频地址
        this.videoUrl = 'https://aweme.snssdk.com/aweme/v1/playwm/?video_id='
        // 用户列表
        this.baseUrl = 'https://www.amemv.com/web/api/v2/aweme/post/?';
    }
    // 用户分享码解析
    shareCodeParsing() {
        got(this.option.userUrl, {
            timeout: 10000
        }).then(response => {
            let arr = response.url.split('?');
            // 获取用户 sec_uid
            let param = qs.parse(arr[1]);
            // 条数
            param.count = 2
            param.max_cursor = 0
            param.aid = 1128
            // 抖音用户数据列表
            const path = this.baseUrl + qs.stringify(param)
            this.userInfo(path)
        }).catch(error => {
            console.log('用户分享码解析' + error)
        })
    }

    // 用户视频列表
    userInfo(path) {
        got(path).then(resList => {
            const res = JSON.parse(resList.body);
            for (let item of res.aweme_list) {
                this.videoParsing(this.videoUrl + item.video.vid);
            }
        }).catch(error => {
            console.log('用户视频列表' + error)
        })
    }

    // 下载文件
    downFile(url, name) {
        const homeDir = __dirname || os.homedir()   //获取用户主目录地址
        const filename = path.join(homeDir, '/video', name)  //组装文件存放地址
        const file = fs.createWriteStream(filename)   //生成一个写入文件的流
        let httpType
        if (url.split('://')[0] === 'http') {   //判断是什么类型的请求
            httpType = http
        } else {
            httpType = https
        }

        httpType.get(url, response => {
            response.pipe(file)    //将文件流写入
            response.on('end', () => {
                console.log(filename)
            })
            response.on('error', err => {
                reject(err)
            })
        })
    }

    // 视频地址解析
    videoParsing(path) {
        got(path).then(res => {
            this.downFile(res.url, `${+new Date()}.mp4`)
        }).catch(err => {
            console.log('视频地址解析', err)
        })
    }

}
// const downVideo1 = new downVideo({userUrl: 'https://v.douyin.com/JPAGUg3/'})
// downVideo1.shareCodeParsing()