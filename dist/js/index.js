parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t,o){return(t=r(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function r(t){var r=o(t,"string");return"symbol"==e(r)?r:String(r)}function o(t,r){if("object"!=e(t)||!t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var i=o.call(t,r||"default");if("object"!=e(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector(".pdf-modal"),r=function t(r){console.log(r.target),e.classList.remove("show"),e.removeEventListener("click",t),document.querySelector("body").style.overflowY="visible"};pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js";var o=function(t){var o=document.getElementById("pdf-embed");pdfjsLib.getDocument(t).promise.then(function(e){e.getPage(1).then(function(e){var t=e.getViewport({scale:1}),r=o.getContext("2d");o.height=t.height,o.width=t.width,e.render({canvasContext:r,viewport:t})})}),e.classList.add("show"),document.querySelector("body").style.overflowY="hidden",e.addEventListener("click",r)};document.querySelectorAll(".fifth .item .name").forEach(function(e){return e.addEventListener("click",function(e){o(e.currentTarget.getAttribute("data-value"))})}),document.addEventListener("scroll",function(e){var t=document.querySelector("header");window.scrollY>50?t.style.background="#0D0D0D":t.style.background="transparent"});new Swiper(".slider-container",{slidesPerView:"auto",spaceBetween:4,navigation:{nextEl:".next",prevEl:".prev"}}),new Swiper("#slider-tabs",{slidesPerView:"auto",navigation:{prevEl:"#tab-prev-btn",nextEl:"#tab-next-btn"},breakpoints:{1250:{spaceBetween:10}}});var i=new Swiper("#modal-slider",{init:!1,effect:"fade",observer:!0,observeParents:!0,navigation:{prevEl:"#modal-prev",nextEl:"#modal-next"}});i.on("slideChange",function(e){var t=document.querySelector(".slider-right"),r=t.querySelectorAll("img");e.realIndex<e.previousIndex?t.insertBefore(r[r.length-1],t.firstChild):t.appendChild(r[0])});var n=document.querySelector('.tab-slides[data-id="1"]');document.querySelector("#modal-slider .swiper-wrapper").innerHTML=n.innerHTML,i.init();var a=function(e){document.querySelectorAll(".tab-title").forEach(function(e){return e.classList.remove("active")}),e.currentTarget.classList.add("active");var t=e.currentTarget.getAttribute("data-id"),r=document.querySelector(".tab-slides[data-id='"+t+"']");document.querySelector("#modal-slider .swiper-wrapper").innerHTML=r.innerHTML,i.update();var o=document.querySelector(".tab-content[data-id='"+t+"']");document.querySelector(".tab-content.visible").classList.remove("visible"),o.classList.add("visible");var n=r.querySelectorAll("img"),a=document.querySelector(".slider-right");a.innerHTML="",n.forEach(function(e){a.appendChild(e.cloneNode())})};document.querySelectorAll(".tab-title").forEach(function(e){return e.addEventListener("click",a)});var c=function(){var e=document.querySelector("body"),t=document.querySelector(".modal");t.classList.add("opened"),e.style.overflowY="hidden",document.getElementById("close-modal").addEventListener("click",function(){t.classList.remove("opened"),e.style.overflowY="visible"})};document.querySelectorAll(".slide-open-modal").forEach(function(e){return e.addEventListener("click",c)});document.querySelector(".open-dropdown").addEventListener("click",function(e){var t=e.currentTarget,r=e.currentTarget.parentNode.querySelector(".dropdown");e.stopImmediatePropagation(),r.dispatchEvent(new Event("click")),r.classList.remove("hidden"),r.classList.add("show"),t.classList.add("hidden"),dropdownCloseListener=function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e){t.classList.remove("hidden"),r.classList.add("hidden"),r.removeEventListener("close",dropdownCloseListener)}),r.addEventListener("close",dropdownCloseListener)}),document.getElementById("pdf-value").addEventListener("change",function(e){o(e.currentTarget.value)}),document.getElementById("go-to-bottom").addEventListener("click",function(e){gsap.to(window,t(t({duration:1,scrollTo:""},"scrollTo",{y:"#index-fourth",offsetY:150}),"ease","Power1.easeInOut"))});var l=function(e){"A"===e.currentTarget.tagName&&(e.preventDefault(),gsap.to(window,t(t({duration:1,scrollTo:""},"scrollTo",{y:e.currentTarget.getAttribute("href"),offsetY:150}),"ease","Power1.easeInOut")))};document.querySelectorAll(".nav-scroll-link").forEach(function(e){return e.addEventListener("click",l)}),gsap.to(".left-brick",{yPercent:30,ease:"none",scrollTrigger:{trigger:".left-brick",start:"-100px top",end:"bottom 300px",scrub:!0}}),gsap.to(".right-brick",{yPercent:40,ease:"none",scrollTrigger:{trigger:".right-brick",start:"-100px top",end:"bottom 300px",scrub:!0}}),gsap.to(".sixth-right-brick",{yPercent:40,ease:"none",scrollTrigger:{trigger:".sixth-right-brick",start:"-400px top",end:"bottom 300px",scrub:!0}}),gsap.to(".sixth-left-brick",{yPercent:20,ease:"none",scrollTrigger:{trigger:".sixth-left-brick",start:"-400px top",end:"bottom 300px",scrub:!0}}),gsap.fromTo(".index-page .first .container",{y:100,opacity:0},{y:0,opacity:1,delay:.5});var s={trigger:{trigger:".index-page .second",start:"0px bottom",end:"bottom top",toggleActions:"play pause resume reset"}};gsap.fromTo(".index-page .second .container .top",{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:s.trigger}),gsap.fromTo(".index-page .second .container .list",{y:100,opacity:0},{y:0,opacity:1,delay:.8,scrollTrigger:s.trigger});var d={trigger:{trigger:".index-page .third .container",start:"0px bottom",end:"bottom top",toggleActions:"play pause resume reset"}};gsap.fromTo(".index-page .third .container .mini-title",{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:d.trigger}),gsap.fromTo(".index-page .third .container .title",{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:d.trigger}),gsap.fromTo(".index-page .third .container .tabs",{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:d.trigger}),gsap.fromTo(".index-page .third .slider-container",{y:100,opacity:0},{y:0,opacity:1,delay:1.25,scrollTrigger:d.trigger});var g={trigger:{trigger:".index-page .fourth",start:"0px bottom",end:"bottom top",toggleActions:"play pause resume reset"}};gsap.fromTo(".index-page .fourth .container .left .title",{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:g.trigger}),gsap.fromTo(".index-page .fourth .container .right .box",{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:g.trigger});var p={trigger:{trigger:".index-page .fifth",start:"0px bottom",end:"bottom top",toggleActions:"play pause resume reset"}};gsap.fromTo(".index-page .fifth .left .title .text",{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:p.trigger});for(var y=0;y<3;y++){var u="item-first";1==y?u="item-second":2==y?u="item-third":3==y&&(u="item-fourth"),gsap.fromTo(".index-page .fifth .left .list .".concat(u," .top"),{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:p.trigger}),gsap.fromTo(".index-page .fifth .left .list .".concat(u," .H1"),{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:p.trigger}),gsap.fromTo(".index-page .fifth .left .list .".concat(u," .body-3"),{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:p.trigger})}gsap.fromTo(".index-page .fifth .right .title .text",{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:p.trigger});for(var f=0;f<3;f++){var m="item-first";1==f?m="item-second":2==f?m="item-third":3==f&&(m="item-fourth"),gsap.fromTo(".index-page .fifth .right .list .".concat(m," .top"),{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:p.trigger}),gsap.fromTo(".index-page .fifth .right .list .".concat(m," .H1"),{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:p.trigger}),gsap.fromTo(".index-page .fifth .right .list .".concat(m," .body-3"),{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:p.trigger})}var v={trigger:{trigger:".index-page .sixth",start:"0px bottom",end:"bottom top",toggleActions:"play pause resume reset"}};gsap.fromTo(".index-page .sixth .container .left",{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:v.trigger}),gsap.fromTo(".index-page .sixth .container .right",{y:100,opacity:0},{y:0,opacity:1,delay:.5,scrollTrigger:v.trigger})});
},{}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map