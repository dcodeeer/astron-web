parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"SafX":[function(require,module,exports) {
document.addEventListener("DOMContentLoaded",function(){var e=new Swiper(".slider-container",{init:!1,effect:"coverflow",loop:!0,centeredSlides:!0,initialSlide:1,slidesPerView:3,loopedSlides:4,spaceBetween:"-25%",coverflowEffect:{rotate:0,stretch:0,depth:200,modifier:1,slideShadows:!0},navigation:{nextEl:".next",prevEl:".prev"}});e.on("slideChange",function(e){document.querySelector("#current-slide").innerHTML=e.realIndex+1}),e.on("init",function(e){document.querySelector("#slides-count").innerHTML=e.slides.length}),e.init();var n=document.querySelector(".modal"),t=function e(t){n.classList.remove("show"),n.removeEventListener("click",e)},i=function(e){n.classList.add("show"),n.querySelector("img").src=e.currentTarget.src,n.addEventListener("click",t)};document.querySelectorAll(".open-modal").forEach(function(e){return e.addEventListener("click",i)})});
},{}]},{},["SafX"], null)
//# sourceMappingURL=/permits.js.map