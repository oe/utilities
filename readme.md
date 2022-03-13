# Funny utilities within a single javascript
脚本中已有部分改为 user scripts, 可以通过脚本工具安装; 未改为 user scripts的可以打开浏览器开发者工具, 切换到 console, 将代码拷贝至里面执行即可

## scripts list
1. [mnsfz脚本](./view-beauty-onepage-mnsfz-com.user.js) 可在一个页面上查看网站 美女私房照 的美女图片, 无需频繁翻页. 已不可使用
2. [文件批量重命名](./batch-file-rename.js) nodejs 脚本
3. [批量下载zol上的壁纸](./batch-fetch-zol-com-wallpaper.js) nodejs 脚本, 可批量下载 http://desk.zol.com.cn 上的壁纸, 可通过修改 `resolution` 来修改 想要获取的分辨率; 修改 `start` 函数的参数来修改要下载的壁纸分类及页码数量
4. [抽奖](./lottery.js) JS代码片段. 针对最近爆出的微信抢红包金额有正态分布规律的问题, 在此使用简单的方法重写, 不存在正态分布规律
5. [下载icons8 上的svg](./download-svn-icons8/download-svn-icon8.user.js) user script. 可使用改脚本免费从 icons8.com 上下载矢量的 svg 文件
6. [Gitlab Pro](https://raw.githubusercontent.com/oe/utilities/master/gitlab-pro.user.js) gitlab功能增强插件, 目前可为issue的显示责任人人名字
7. [Baidu Playback Speed](https://raw.githubusercontent.com/oe/utilities/master/yunpan-playback-rate.user.js) 为百度网盘视频播放器增加播放速度控制功能
8. [北大法宝案例快速下载](https://raw.githubusercontent.com/oe/utilities/master/beida-laws.user.js)  北大法宝案例快速下载:
   1. 搜索到案件后, 点击案件案号所在行, 可以直接下载案件的doc文件: 蓝色表示处理中, 绿色表示下载完成, 红色表示下载失败(会备注出失败原因)
   2. 下载的文件使用 `[案号]案件名称.doc` 方式命名, 可修改浏览器的下载文件默认存放路径, 方便管理下载的案件
   3. 在页面上 `s` 会自动定位到搜索框, 并选中搜索框的文字, 此时可直接粘贴新案号并按回车搜索, 提高效率
