// ==UserScript==
// @name         getJson
// @author       MameQ
// @version      1.0
// @description  Grabs image links from JSON response
// @match        https://mamequ.github.io/5/*
// @match        https://konachan.net/post.json*
// @match        file:///*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.href.startsWith("https://konachan.net/post.json")) {
        var jsonData = JSON.parse(document.body.textContent);
        var imageLinks = jsonData.map(function(item) {
            return item.file_url;
        });
        GM_setValue("KonLinks", JSON.stringify(imageLinks));
        window.close();
    }

   if (document.querySelector("#customDuration")) {
     console.log("amhere");
     const someKey = GM_getValue("KonLinks", null);
     document.querySelector("body > div:nth-child(2) > textarea").value = someKey;
   }
})();