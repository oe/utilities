// ==UserScript==
// @name         Gitlab Pro
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Gitlab Issue Assignee Names
// @author       You
// @match        https://git.landray.com.cn/*/issues*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  document.body.querySelectorAll('.issues-list .author-link').forEach(item => {
    const tn = document.createTextNode(item.title.replace(/^[\w\s]+to\s/, '') + ' ')
    item.insertBefore(tn, item.children[0])
  })
})();