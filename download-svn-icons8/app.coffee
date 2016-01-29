
proxy = (fn)->
  script = document.createElement 'script'
  script.textContent = '(' + fn.toString() + ')(window);'
  document.body.appendChild script

main = ->
  iconPreview = document.querySelector '.icon-preview'
  return unless iconPreview

  saveSVG = ->
    svgWrapper = document.querySelector '.icon-preview__svg'
    return unless svgWrapper
    text = encodeURIComponent svgWrapper.innerHTML
    filename = document.querySelector('.icon-preview__title').textContent.trim() + '.svg'
    dom = document.createElement 'a'
    dom.setAttribute 'href', 'data:text/plain;charset=utf-8,' + text
    dom.setAttribute 'download', filename
    dom.click()

  btn = document.createElement 'div'
  btn.className = 'b-bar-btns c-btn'
  btn.style.textAlign = 'center'
  btn.style.width = '100%'
  btn.style.backgroundColor = 'green'
  btn.style.borderColor = '#efeaea'
  btn.textContent = 'Download SVG'
  btn.onclick = saveSVG

  iconPreview.appendChild btn

proxy main

