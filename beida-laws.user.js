// ==UserScript==
// @name         北大法宝案例下载
// @namespace    http://evecalm.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*.fbch.oca.swupl.edu.cn/case/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=swupl.edu.cn
// @grant        none
// ==/UserScript==

/**
 * 请根据不同学校域名修改上述 @match 地址
 */

(function () {
  'use strict';
  const CATE = location.pathname.split('/').pop()

  const CATE_CONFIGS = {
    // 案例
    case: {library:  'pfnl', index: 2 },
    // 法规
    chl: { library: 'chl', index: 1},
    // 期刊
    qikan: { library: 'qikan', index: 0},
    // 律所实务
    lawfirmarticles: { library: 'lawfirmarticles', index: 1},
  }

  const CURRENT_CATE_CONFIG = CATE_CONFIGS[CATE]
  if (!CURRENT_CATE_CONFIG) return

  function getFileContent(id) {
    let url = location.protocol + '//' + location.host + '/Tool/DownloadFulltext'
    const queryString = new URLSearchParams({
      library: CURRENT_CATE_CONFIG.library,
      gid: id,
      type: 'Doc',
      flag: 'Doc',
      keepFields: 'false',
      keepFblxInFulltext: 'false',
      keepRelatedFile: 'false',
      tbWidth: '880',
      downloadType: 'DownloadFile',
      currentUrl: location.href,
    })
    url += '?' + queryString.toString()
    return fetch(url).then(res => res.blob())
  }

  function downloadFile(fileName, id) {
    return getFileContent(id).then(blob => {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName + '.doc'
      a.click()
    })
  }

  function download(row) {
    const id = row.querySelector('.checkbox').value
    let fileName = row.querySelector('a').innerText.trim()
    let caseNoInfo = row.querySelector('.related-info').innerText.trim().split('/')

    fileName = `[${caseNoInfo[CURRENT_CATE_CONFIG.index]}]${fileName}`
    return downloadFile(fileName, id)
  }

  document.body.addEventListener('click', async function (e) {
    if (!e.target.matches('.related-info')) return
    const relatedInfoElm = e.target
    const row = relatedInfoElm.closest('.block')
    if (!row) return
    try {
      relatedInfoElm.style.color = 'blue'
      await download(row)
      relatedInfoElm.style.color = 'green'
    } catch (error) {
      relatedInfoElm.style.color = 'red'
      const err = document.createElement('span')
      err.style.color = 'red'
      err.innerText = error.message
      relatedInfoElm.appendChild(err)
    }
  }, true)

  function addStyle() {
    const style = document.createElement('style')
    style.innerText = `
    .related-info { cursor: pointer; }
  `
    document.head.appendChild(style)
  }

  addStyle()

  document.body.addEventListener('keyup', function (e) {
    if (e.target.tagName === 'INPUT') return
    if (e.key.toLocaleLowerCase() === 's') {
      focusSearch()
    }
  })
  function focusSearch() {
    const searchInput = document.getElementById('txtSearch')
    searchInput.focus()
    searchInput.select()
  }

})();