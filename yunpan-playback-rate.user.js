// ==UserScript==
// @name         Baidu Playback Speed
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yun.baidu.com/*
// @match        https://pan.baidu.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  Element.prototype.attachShadow = null;
  window.addEventListener("load", function () {
    var root = this.document.getElementById("video-root");
    function onRootChange() {
      var video = document.querySelector("video#html5player_html5_api");
      if (!video) return;
      root.removeEventListener("DOMNodeInserted", onRootChange);
      console.log(video);

      video.addEventListener("play", addPlaybackControl);

      function addPlaybackControl() {
        const wrapper = document.createElement("div");
        wrapper.style =
          "position: relative; text-align: center; height: 100%; width: 5em;line-height: 3em;";
        const label = document.createElement("div");
        label.innerText = "倍速: 1";

        const select = document.createElement("select");
        select.onchange = function () {
          const speed = parseFloat(this.value);
          label.innerText = `倍速: ${speed}`;
          video.playbackRate = speed;
        };
        select.innerHTML = `
                <option value="1">1</option>
                <option value="1.2">1.2</option>
                <option value="1.5">1.5</option>
                <option value="1.7">1.7</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
                `;
        select.style =
          "position: absolute; top: 0; right: 0; width: 100%; height: 100%; opacity: 0;";
        wrapper.appendChild(label);
        wrapper.appendChild(select);

        const controller = document.querySelector(".vjs-control-bar");
        console.log(controller);
        controller.appendChild(wrapper);
        video.removeEventListener("play", addPlaybackControl);
      }
    }
    root.addEventListener("DOMNodeInserted", onRootChange);
  });
})();
