// ==UserScript==
// @name           MNSFZ Photos
// @namespace      Saiya.mnsfz.link
// @description    Make it easier to use google search(including cse)
// @match          http://www.mnsfz.com/*
// @version        0.34
// ==/UserScript==
function proxy(fn) {
	var script = document.createElement('script');
	script.textContent = '(' + fn.toString() + ')(window);';
	document.body.appendChild(script);
}

function main(Global){
	(function(n){"use strict";var e=+new Date,f=!0,r="string",i=function(n,t){return typeof n===t},u={isFunction:function(n){return!!n&&i(n,"function")},lastArgumentCallback:function(n,t){var i=n[n.length-1];return u.isFunction(i)?(t&&i(),i):undefined},extend:function(n){return Array.prototype.slice.call(arguments,1).forEach(function(t){for(var i in t)t[i]!==undefined&&(n[i]=t[i])}),n}},o=function(){for(var i=[JSON,document.querySelectorAll,n.XMLHttpRequest],t=0;t<i.length;t++)if(!i[t])return!1;return!0},t=function(n){return new t.fn.init(n)};t.fn=t.prototype={constructor:t,init:function(n){if(!o())throw"Error: Cannot load psQuery. Required browser features are not available.";try{if(n)!n.nodeType||n.nodeType!==1&&n.nodeType!==9?i(n,r)&&(this.els=document.querySelectorAll(n)):this.els=[n];else throw"Error: Invalid selector";if(this.length=this.els.length,this.length===0)throw"Error: No elements found with that selector.";return this}catch(t){if(f)throw t;else return undefined}},each:function(n){var r=this.els,i=0,t,f;if(!u.isFunction(n))throw"Error: no function supplied to loop.";for(t=0,f=r.length;t<f;t++)n.call(r[t],t)===!1?i--:i++;return i},nth:function(n){var i=n<0?this.els.length+n:n;return t.fn.init(this.els[i])},get:function(n){return this.nth(n)},first:function(){return this.nth(0)},last:function(){return this.nth(-1)},parent:function(){return t(this.els[0])},children:function(){},val:function(n){if(n)this.each(function(){this.value=n});else return this.els[0].value},html:function(n){return i(n,r)?(this.each(function(){this.innerHTML=n}),this):this.els[0].innerHTML},text:function(n){return i(n,r)?(this.each(function(){this.innerText=n}),this):this.els[0].innerText},hide:function(){var n=function(){this.style.display="none"};this.each(n)},show:function(){var n=function(){this.style.display=""};this.each(n)},remove:function(){return this.each(function(){this.parentElement.removeChild(this)}),this},hasClass:function(n){n=n.trim();var t=this.each(function(){return this.className.indexOf(n)>-1});return t+this.length>0},toggleClass:function(n){return n=n.trim(),this.each(function(){var t=$(this);t.hasClass(n)?t.removeClass(n):t.addClass(n)}),this},addClass:function(n){var t=function(){for(var u,f=(this.className+" "+n.trim()).split(" "),e={},o=[],t=0,s=f.length;t<s;t++)e[f[t]]=!0;for(u in e)i(u,r)&&o.push(u);this.className=o.join(" ").trim()};return i(n,r)&&this.each(t),this},removeClass:function(n){var t=function(){for(var t=this.className+"",r=n.trim().split(" "),i=0;i<r.length;i++)t=t.replace(r[i],"");this.className=t};return this.each(t),this},css:function(n){var t=function(){return undefined};if(n)this.each(t);else return"";return this},click:function(n){this.on("click",n)},on:function(n){var i=u.lastArgumentCallback(arguments),t=n.split(" ");return this.each(function(){for(var n=0;n<t.length;n++)this.addEventListener(t[n],i,!1)}),this},off:function(n){var i=u.lastArgumentCallback(arguments),t=n.split(" ");return this.each(function(){for(var n=0;n<t.length;n++)this.removeEventListener(t[n],i,!1)}),this},data:function(){},attr:function(n,t){if(t&&i(t,r))this.each(function(){this.setAttribute(n,t)});else return this.els[0].getAttribute(n);return this}};t.ajax=function(n,t){var e=arguments,o,h,c,s;t=e.length===1?e[0]:e[1];o=function(){};h={url:e.length===2&&i(n,r)?n:".",cache:!0,data:{},headers:{},context:null,type:"GET",success:o,error:o,complete:o};t=u.extend(h,t||{});c={"application/json":"json","text/html":"html","text/plain":"text"};t.cache||(t.url=t.url+(t.url.indexOf("?")?"&":"?")+"noCache="+Math.floor(Math.random()*9e9));var a=function(n,t,i){var r="success";i.success.call(i.context,n,r,t);l(r,t,i)},v=function(n,t,i,r){r.error.call(r.context,i,t,n);l(t,i,r)},l=function(n,t,i){i.complete.call(i.context,t,n)},f=new XMLHttpRequest;f.addEventListener("readystatechange",function(){var n,i,r;if(f.readyState===4){if(f.status>=200&&f.status<300||f.status===304){r=f.getResponseHeader("content-type");i=c[r]||"text";n=f.responseText;try{i==="json"&&(n=JSON.parse(n));a(n,f,t);return}catch(u){}}v(null,"error",f,t);return}},!1);f.open(t.type,t.url);t.type==="POST"&&(t.headers=u.extend(t.headers,{"X-Requested-With":"XMLHttpRequest","Content-type":"application/x-www-form-urlencoded"}));for(s in t.headers)f.setRequestHeader(s,t.headers[s]);return f.send(t.data),this};t.fn.init.prototype=t.fn;n.psQuery=t;n.$||(n.$=t);f&&(n.utils=u);n.ps=n.ps||{};n.ps.timings=n.ps.timings||{};n.ps.timings.psQuery={start:e,end:+new Date}})(this);
	
	var appendHtml, appendImg2Preview, appendStyle, attachEvent, extraImg2Preview, getImgUrl, getPageContent, getPageLength, imageUrls, link, listen, onCloseClick, onEscapePress, onGalleryUrlClick, removePreviewWrapper, unloadPreview, _i, _len, _ref;

	var currentUrl;

	getPageContent = function(url, cb) {
	  psQuery.ajax(url, {
	    dataType: 'text',
	    success: cb
	  });
	};

	getImgUrl = function(html) {
	  var endIndex, imgUrl, needle;
	  needle = '";getImgString()';
	  endIndex = html.indexOf(needle);
	  if (endIndex === -1) {
	    return '';
	  }
	  html = html.substring(0, endIndex);
	  endIndex = html.lastIndexOf('"');
	  imgUrl = html.substring(endIndex + 1);
	  imgUrl = imgUrl.replace('big', 'pic');
	  return imgUrl;
	};

	getPageLength = function(html) {
	  var endIndex, last, listArr, listHtml, startIndex;
	  startIndex = html.search(/"pageList">/i);
	  if (startIndex === -1) {
	    return false;
	  }
	  startIndex += 11;
	  endIndex = html.indexOf('</div>', startIndex);
	  listHtml = html.substring(startIndex, endIndex);
	  listHtml = listHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
	  listArr = listHtml.split(' ');
	  while (last = listArr.pop()) {
	    last = +last;
	    if (!isNaN(last)) {
	      return last;
	    }
	  }
	  return false;
	};

	imageUrls = function(url, length) {
	  var i, res, _i;
	  res = [];
	  if (length === false || length < 2) {
	    return res;
	  }
	  url = url.replace('.html', '');
	  url = url.replace(/-\d+$/,'');
	  for (i = _i = 2; 2 <= length ? _i <= length : _i >= length; i = 2 <= length ? ++_i : --_i) {
	    res.push(url + ("-" + i + ".html"));
	  }
	  return res;
	};

	appendImg2Preview = function(imgUrl) {
	  var imgElm, imgHtml, preveiwElm;
	  preveiwElm = document.getElementById('isa-preview');
	  if (!imgUrl) {
	    return;
	  }
	  imgHtml = "<img src='" + imgUrl + "'>";
	  imgElm = document.createElement('article');
	  imgElm.innerHTML = imgHtml;
	  preveiwElm.appendChild(imgElm);
	};

	extraImg2Preview = function(html) {
	  appendImg2Preview(getImgUrl(html));
	};

	appendStyle = function() {
	  var style, styleId;
	  styleId = 'isa-preview-style';
	  if (document.getElementById(styleId)) {
	    return;
	  }
	  style = document.createElement('style');
	  style.id = styleId;
	  style.setAttribute('type', 'text/css');
	  style.innerText = '#isa-preview-wrapper {z-index: 99999999;position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: rgba(0,0,0,.4); } #close-preview {z-index: 999999999; cursor: pointer;position: fixed; top: 10px; right: 20px; font-weight: bolder; font-size: 100px; color: #000; } #close-preview:hover {color: #777; } #isa-preview {overflow: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0; } #isa-preview:after {content: " "; display: block; } #isa-preview>article:first-child {margin-top: 40px; } #isa-preview>article {display: block; margin: 0 auto; margin-bottom: 40px; width: 80%; text-align: center; } #isa-preview>article>img {max-width: 100%; height: auto; }';
	  document.head.appendChild(style);
	};

	appendHtml = function() {
	  var doc;
	  doc = document.createElement('div');
	  doc.id = 'isa-preview-wrapper';
	  doc.innerHTML = '<div id="close-preview">×</div> <div id="isa-preview"> </div>';
	  document.body.appendChild(doc);
	};

	removePreviewWrapper = function(wrapper) {
	  wrapper = wrapper || document.getElementById('isa-preview-wrapper');
	  if (wrapper) {
	    wrapper.parentElement.removeChild(wrapper);
	  }
	};

	onEscapePress = function(e) {
	  var wrapper;
	  if (e.keyCode === 27) {
	    wrapper = document.getElementById('isa-preview-wrapper');
	    if (wrapper) {
	      unloadPreview();
	    }
	  }
	};

	onCloseClick = function(e) {
	  unloadPreview();
	};

	unloadPreview = function() {
	  document.body.removeEventListener('keyup', onEscapePress);
	  document.getElementById('close-preview').removeEventListener('click', onCloseClick);
	  removePreviewWrapper();
	};

	attachEvent = function() {
	  document.body.addEventListener('keyup', onEscapePress);
	  document.getElementById('close-preview').addEventListener('click', onCloseClick);
	};

	onGalleryUrlClick = function(e) {
	  var galleryUrl;
	  appendStyle();
	  appendHtml();
	  galleryUrl = this.href;
	  currentUrl = galleryUrl;
	  setTimeout(function() {
	    attachEvent();
	  }, 0);
	  getPageContent(galleryUrl, function(html) {
	    var restUrls;
	    firstImgUrl = getImgUrl(html);
	    if(!firstImgUrl) window.location = currentUrl;
	    appendImg2Preview(firstImgUrl);
	    extraImg2Preview(html);
	    restUrls = imageUrls(galleryUrl, getPageLength(html));
	    restUrls.forEach(function(url) {
	      getPageContent(url, extraImg2Preview);
	    });
	  });
	  e.preventDefault();
	};

	listen = function(link) {
	  link.addEventListener('click', onGalleryUrlClick);
	};

	_ref = document.querySelectorAll('a[href$=".html"]');
	for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	  link = _ref[_i];
	  if (link.href.length > 40) {
	    listen(link);
	  }
	}


}

proxy(main);