var appendHtml, appendImg2Preview, appendStyle, attachEvent, extraImg2Preview, getImgUrl, getPageContent, getPageLength, imageUrls, link, listen, onCloseClick, onEscapePress, onGalleryUrlClick, removePreviewWrapper, unloadPreview, _i, _len, _ref;

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
  setTimeout(function() {
    attachEvent();
  }, 0);
  getPageContent(galleryUrl, function(html) {
    var restUrls;
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
