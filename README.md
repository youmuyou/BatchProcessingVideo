<!--
 * @Author: your name
 * @Date: 2020-10-19 16:00:13
 * @LastEditTime: 2020-10-21 13:58:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \BatchProcessingVideo\README.md
-->
# tf
1.批量下载抖音视频
2.处理水印
3.之前的链接上加上了sec_uid参数。该参数为抖音app上对应的用户ID。
4.用户主页： https://www.amemv.com/share/user/102064772608?sec_uid=



5.抖音用户主页分享->https://v.douyin.com/JPU6cfJ/ 请求换回用户 sec_uid
6.通过https://www.amemv.com/web/api/v2/aweme/post/? 添加条数获取用户视频列表
7.单独视频播放地址： https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0d00fee0000bu5c2ah9eprige0u1mo0&ratio=720p&line=0 


视频切图
ffmpeg -ss 00:00:02  -i 1.mp4  -r 1 -q:v 100 -vframes 50  -f image2 image-%d.png
-r：每秒提取的帧数，如上面为每秒1帧，即一张图像
-q:v ：图片质量
-f：图片格式，上述为image2
image-%d.jpeg：生成图像的文件名，可以加上完整路径，%d会使文件名按整数编号，如上述生成图像为image-1.jpeg, image-2.jpeg, ...
-t：持续时间，如-t 4表示持续4s
-ss：起始时间，如-ss 01:30:14，从01:30:14开始
-vframes：指定抽取的帧数，如-vframes 120，指定抽取120张
-s：格式大小，如-s 640x360
-y：覆盖，直接使用

视频剪切
ffmpeg -ss 00:00:15 -t 00:00:05 -i input.mp4 -vcodec copy -acodec copy output.mp4 
-ss表示开始切割的时间，-t表示要切多少。上面就是从15秒开始，切5秒钟出来。

视频合并
ffmpeg -f concat -i filelist.txt -c copy output.mkv

人脸识别
https://cloud.baidu.com/doc/FACE/s/Pjwvxqpcz
图像识别
https://ai.baidu.com/docs#/ImageClassify-API/top


https://cloud.baidu.com/doc/FACE/s/Pjwvxqpcz