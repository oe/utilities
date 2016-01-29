// ==UserScript==
// @name           Download SVG from icon8.com
// @namespace      Saiya.icons8.link
// @description    add a download button to download svn from icon8.com
// @match          *://*.icons8.com/*
// @version        0.0.2
// ==/UserScript==

var main,proxy;proxy=function(e){var t;return t=document.createElement("script"),t.textContent="("+e.toString()+")(window);",document.body.appendChild(t)},main=function(){var e,t,n;return(t=document.querySelector(".icon-preview"))?(n=function(){var e,t,n,o;return(n=document.querySelector(".icon-preview__svg"))?(o=encodeURIComponent(n.innerHTML),t=document.querySelector(".icon-preview__title").textContent.trim()+".svg",e=document.createElement("a"),e.setAttribute("href","data:text/plain;charset=utf-8,"+o),e.setAttribute("download",t),e.click()):void 0},e=document.createElement("div"),e.className="b-bar-btns c-btn",e.style.textAlign="center",e.style.width="100%",e.style.backgroundColor="green",e.style.borderColor="#efeaea",e.textContent="Download SVG",e.onclick=n,t.appendChild(e)):void 0},proxy(main);

