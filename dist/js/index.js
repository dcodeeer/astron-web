parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
document.addEventListener("DOMContentLoaded",function(){document.addEventListener("scroll",function(e){var t=document.querySelector("header");window.scrollY>50?t.style.background="#0D0D0D":t.style.background="transparent"});new Swiper(".slider-container",{slidesPerView:"auto",spaceBetween:4,navigation:{nextEl:".next",prevEl:".prev"}}),new Swiper("#slider-tabs",{slidesPerView:"auto",navigation:{prevEl:"#tab-prev-btn",nextEl:"#tab-next-btn"},breakpoints:{1250:{spaceBetween:10}}});var e=new Swiper("#modal-slider",{init:!1,slidesPerView:"auto",navigation:{prevEl:"#modal-prev",nextEl:"#modal-next"},breakpoints:{1249:{spaceBetween:15},1250:{spaceBetween:64}}}),t=document.querySelector('.tab-slides[data-id="1"]');document.querySelector("#modal-slider .swiper-wrapper").innerHTML=t.innerHTML,e.init();var n=function(t){document.querySelectorAll(".tab-title").forEach(function(e){return e.classList.remove("active")}),t.currentTarget.classList.add("active");var n=t.currentTarget.getAttribute("data-id"),r=document.querySelector(".tab-slides[data-id='"+n+"']");console.log(r),document.querySelector("#modal-slider .swiper-wrapper").innerHTML=r.innerHTML,e.update();var o=document.querySelector(".tab-content[data-id='"+n+"']");document.querySelector(".tab-content.visible").classList.remove("visible"),o.classList.add("visible")};document.querySelectorAll(".tab-title").forEach(function(e){return e.addEventListener("click",n)});var r=function(){var e=document.querySelector("body"),t=document.querySelector(".modal-box");t.classList.add("modal-box-opened"),e.style.overflowY="hidden",document.getElementById("close-modal").addEventListener("click",function(){t.classList.remove("modal-box-opened"),e.style.overflowY="visible"})};document.querySelectorAll(".slide-open-modal").forEach(function(e){return e.addEventListener("click",r)})});
},{}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map