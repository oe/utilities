// ==UserScript==
// @name         beida laws
// @namespace    http://evecalm.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://gfggi66f6a8ad06ba47d9skvvofo55pqbv6ubo.fbch.oca.swupl.edu.cn/case/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=swupl.edu.cn
// @grant        none
// ==/UserScript==

/**
 * 请根据不同学校域名修改上述 @match 地址
 */

(function () {
  'use strict';

  function getFileContent(id) {
    let url = 'http://gfggi66f6a8ad06ba47d9skvvofo55pqbv6ubo.fbch.oca.swupl.edu.cn/Tool/DownloadFulltext'
    const queryString = new URLSearchParams({
      library: 'pfnl',
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

    fileName = `[${caseNoInfo[caseNoInfo.length - 2]}]${fileName}`
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