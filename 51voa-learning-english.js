/**
 * 自动播放51voa上的voa音频
 *
 * 使用方法:
 * 1. 在chrome浏览器中打开网站 http://www.51voa.com
 * 2. 打开开发者工具, Sources → Snippets → new snippet → 运行代码
 * 3. 在控制台执行 playNext() 可以切换至下一首.
 */

var baseURL = 'http://www.51voa.com';
var links = [];
var currentIndex = null;
var audioElement = document.createElement('audio');
audioElement.addEventListener('ended', playNext);
function playNext() {
    if (currentIndex === null || currentIndex >= links.length) {
        currentIndex = 0;
    } else {
        ++currentIndex;
    }
    audioUrl = links[currentIndex] ? links[currentIndex].audioUrl : '';
    if(audioUrl) {
        console.log('play next: ' + audioUrl);
        audioElement.src = audioUrl;
        audioElement.play();
    }
}
$.get(baseURL,function(html){

    frg = document.createElement('div');
    frg.innerHTML = html
    list = frg.querySelectorAll('#list li');
    links = $.map(list, function(item){
       anchor = item.lastElementChild;
       fileName = anchor.href.split('/').pop().replace(/-\d+\.html$/,'')
       title = anchor.innerText.replace(/\([^)]+\)$/,'');
       month = anchor.innerText.match(/\(([\d]+(\-[\d]+){2})\)/)[1]
       month = month.split('-');
       month = month[0] + (month[1] < 10 ? '0' : '') + month[1];
       return {
           postUrl: baseURL + anchor.href,
           title: title,
           audioUrl: 'http://uuu.51voa.com/' + month + '/' + fileName + '.mp3'
       };
    });
    frg = null;
    playNext();
});
