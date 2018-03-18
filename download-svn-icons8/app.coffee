
proxy = (fn)->
  script = document.createElement 'script'
  script.textContent = '(' + fn.toString() + ')(window);'
  document.body.appendChild script

main = ->
  iconPreview = document.querySelector '.icon-workspace .download-icon'
  return unless iconPreview

  saveSVG = ->
    svgWrapper = document.querySelector '.icon.transparent-background>div'
    return unless svgWrapper
    text = encodeURIComponent svgWrapper.innerHTML
    filename = document.querySelector('.icon-workspace .title').textContent.trim() + '.svg'
    dom = document.createElement 'a'
    dom.setAttribute 'href', 'data:text/plain;charset=utf-8,' + text
    dom.setAttribute 'download', filename
    dom.click()

  btn = document.createElement 'div'
  btn.className = 'button'
  btn.style.textAlign = 'center'
  btn.style.width = '100%'
  btn.style.backgroundColor = 'green'
  btn.style.borderColor = '#efeaea'
  btn.style.marginTop = '10px'
  btn.textContent = 'Download SVG'
  btn.onclick = saveSVG

  iconPreview.appendChild btn

proxy main

