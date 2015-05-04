
getPageContent = (url, cb)->
	psQuery.ajax url,{
		dataType: 'text'
		success: cb
	}
	return

getImgUrl = (html)->
	needle = '";getImgString()'
	endIndex = html.indexOf needle
	return '' if endIndex is -1
	html = html.substring 0, endIndex
	endIndex = html.lastIndexOf '"'
	imgUrl = html.substring endIndex + 1
	imgUrl = imgUrl.replace 'big', 'pic'
	imgUrl

getPageLength = (html)->
	startIndex = html.search /"pageList">/i
	return false if startIndex is -1
	startIndex += 11
	endIndex = html.indexOf '</div>', startIndex
	listHtml = html.substring startIndex, endIndex
	listHtml = listHtml.replace(/<[^>]+>/g,' ').replace(/\s+/g, ' ').replace /^\s+|\s+$/g,''
	listArr = listHtml.split ' '
	while last = listArr.pop()
		last = +last
		return last if not isNaN last
	return false

imageUrls = (url, length)->
	res = []
	return res if length is false or length < 2
	url = url.replace '.html', ''
	for i in [2..length]
		res.push url + "-#{i}.html"
	res

appendImg2Preview = (imgUrl)->
	preveiwElm = document.getElementById 'isa-preview'
	return if not imgUrl
	imgHtml = "<img src='#{imgUrl}'>"
	imgElm = document.createElement 'article'
	imgElm.innerHTML = imgHtml
	preveiwElm.appendChild imgElm
	return

extraImg2Preview = (html)->
	appendImg2Preview getImgUrl html
	return

appendStyle = ->
	styleId = 'isa-preview-style'
	return if document.getElementById styleId

	style = document.createElement 'style'
	style.id = styleId

	style.setAttribute 'type', 'text/css'
	style.innerText = '#isa-preview-wrapper {z-index: 99999999;position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: rgba(0,0,0,.4); } #close-preview {z-index: 999999999; cursor: pointer;position: fixed; top: 10px; right: 20px; font-weight: bolder; font-size: 100px; color: #000; } #close-preview:hover {color: #777; } #isa-preview {overflow: auto; position: absolute; top: 0; bottom: 0; left: 0; right: 0; } #isa-preview:after {content: " "; display: block; } #isa-preview>article:first-child {margin-top: 40px; } #isa-preview>article {display: block; margin: 0 auto; margin-bottom: 40px; width: 80%; text-align: center; } #isa-preview>article>img {max-width: 100%; height: auto; }'
	document.head.appendChild style
	return

appendHtml = ->
	doc = document.createElement 'div'
	doc.id = 'isa-preview-wrapper'
	doc.innerHTML = '<div id="close-preview">×</div> <div id="isa-preview"> </div>'
	document.body.appendChild doc
	return

removePreviewWrapper = (wrapper)->
	wrapper = wrapper or document.getElementById 'isa-preview-wrapper'
	if wrapper
		wrapper.parentElement.removeChild wrapper
	return

onEscapePress = (e)->
	if e.keyCode is 27
		wrapper = document.getElementById 'isa-preview-wrapper'
		if wrapper then do unloadPreview
	return

onCloseClick = (e)->
	do unloadPreview
	return

unloadPreview = ->
	document.body.removeEventListener 'keyup', onEscapePress
	document.getElementById('close-preview').removeEventListener 'click', onCloseClick
	do removePreviewWrapper
	return

attachEvent = ->
	document.body.addEventListener 'keyup', onEscapePress
	document.getElementById('close-preview').addEventListener 'click', onCloseClick
	return

onGalleryUrlClick = (e)->
	do appendStyle
	do appendHtml
	galleryUrl = this.href
	setTimeout ->
		do attachEvent
		return
	, 0
	getPageContent galleryUrl, (html)->
		extraImg2Preview html

		restUrls = imageUrls galleryUrl, getPageLength html
		restUrls.forEach (url)->
			getPageContent url, extraImg2Preview
			return
		return
	do e.preventDefault
	return


listen = (link)->
	link.addEventListener 'click', onGalleryUrlClick
	return

listen link for link in  document.querySelectorAll 'a[href$=".html"]' when link.href.length > 40
	