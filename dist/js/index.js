// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.querySelector('.pdf-modal');
  var closeModal = function closeModal(e) {
    console.log(e.target);
    modal.classList.remove('show');
    modal.removeEventListener('click', closeModal);
    document.querySelector('body').style.overflowY = 'visible';
  };
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';
  var openModal = function openModal(path) {
    var canvas = document.getElementById('pdf-embed');
    pdfjsLib.getDocument(path).promise.then(function (pdf) {
      pdf.getPage(1).then(function (page) {
        var viewport = page.getViewport({
          scale: 1.0
        });
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({
          canvasContext: context,
          viewport: viewport
        });
      });
    });
    modal.classList.add('show');
    document.querySelector('body').style.overflowY = 'hidden';
    modal.addEventListener('click', closeModal);
  };
  document.querySelectorAll('.fifth .item .name').forEach(function (btn) {
    return btn.addEventListener('click', function (e) {
      openModal(e.currentTarget.getAttribute('data-value'));
    });
  });

  // header
  document.addEventListener('scroll', function (e) {
    var header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.style.background = '#0D0D0D';
    } else {
      header.style.background = 'transparent';
    }
  });
  // header end

  var swiper = new Swiper('.slider-container', {
    slidesPerView: "auto",
    spaceBetween: 4,
    navigation: {
      nextEl: '.next',
      prevEl: '.prev'
    }
  });
  var swiper2 = new Swiper('#slider-tabs', {
    slidesPerView: "auto",
    navigation: {
      prevEl: '#tab-prev-btn',
      nextEl: '#tab-next-btn'
    },
    breakpoints: {
      1250: {
        spaceBetween: 10
      }
    }
  });
  var data = JSON.parse('{"exac":[{"title":"the title","count":"2","left_title":"Техническое Описание","left_list":[{"key":"value"}],"left_images":["asda","asdsad"],"right_title":"Техническое Описание","right_list":[{"key":"value"}],"right_images":["asda","asdsad"]}],"exac_2":[{"title":"the title 2","count":"2","left_title":"Техническое Описание","left_list":[{"key":"value"}],"left_images":["asda","asdsad"],"right_title":"Техническое Описание","right_list":[{"key":"value"}],"right_images":["asda","asdsad"]}]}');
  document.querySelectorAll('.tab').forEach(function (elem, index) {
    elem.addEventListener('click', function (e) {
      swiper2.slideTo(index);
      var category = e.currentTarget.getAttribute('data-category-slag');
      var list = data[category];
      if (list) {
        var html = '';
        list.forEach(function (item, index) {
          item.category = category;
          item.index = index;
          html += createSlideFromList(item);
        });
        var swiperWrapper = document.querySelector('.third .slider-container .swiper-wrapper');
        swiperWrapper.innerHTML = html;
        swiper.update();
        swiper.updateSize();
        var _blocks = document.querySelectorAll('.slide-open-modal');
        _blocks.forEach(function (block) {
          return block.addEventListener('click', modalOpenListener);
        });
      }
    });
  });
  var createSlideFromList = function createSlideFromList(_ref) {
    var index = _ref.index,
      title = _ref.title,
      preview = _ref.preview,
      isNew = _ref.isNew,
      count = _ref.count,
      category = _ref.category;
    var output = "\n      <div class='swiper-slide slide-open-modal' data-id='".concat(index, "' data-category-slag='").concat(category, "'>\n            <div class='image'>");
    if (isNew) {
      output += "<div class='new body-1'>NEW ARRIVING</div>";
    }
    output += "<img src='".concat(preview, "' />\n            </div>\n            <div class='info'>\n              <div class='left'>\n                <div class='H1'>").concat(title, "</div>\n                <div class='body-3-sarala'></div>\n              </div>\n              <div class='right'>\n                <div class='count'>\n                  <div class='number'>").concat(count, "</div>\n                  <div class='text body-4'>\u043E\u0434\u0438\u043D\u0438\u0446\u0456</div>\n                </div>\n                <div class='icon'>\n                  <svg width=\"24\" height=\"19\" viewBox=\"0 0 24 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M0.25 9.5H21.75M21.75 9.5L14.25 2M21.75 9.5L14.25 17\" stroke=\"currentColor\" stroke-width=\"3\"/>\n                    </svg>\n                    \n                </div>\n              </div>\n            </div>\n          </div>");
    return output;
  };
  var modalSlider = new Swiper('#modal-slider', {
    init: false,
    effect: 'fade',
    observer: true,
    observeParents: true,
    navigation: {
      prevEl: '#modal-prev',
      nextEl: '#modal-next'
    }
  });

  // tab

  modalSlider.on('slideChange', function (swiper) {
    var slider = document.querySelector('.slider-right');
    var slides = slider.querySelectorAll('img');
    if (swiper.realIndex < swiper.previousIndex) {
      slider.insertBefore(slides[slides.length - 1], slider.firstChild);
      return;
    }
    slider.appendChild(slides[0]);
  });
  var slides = document.querySelector('.tab-slides[data-id="1"]');
  document.querySelector('#modal-slider .swiper-wrapper').innerHTML = slides.innerHTML;
  modalSlider.init();
  var tabOpenListener = function tabOpenListener(e) {
    document.querySelectorAll('.tab-title').forEach(function (tabTitle) {
      return tabTitle.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    var id = e.currentTarget.getAttribute('data-id');
    var slides = document.querySelector(".tab-slides[data-id='" + id + "']");
    document.querySelector('#modal-slider .swiper-wrapper').innerHTML = slides.innerHTML;
    modalSlider.update();
    var content = document.querySelector(".tab-content[data-id='" + id + "']");
    var currentVisible = document.querySelector(".tab-content.visible");
    currentVisible.classList.remove('visible');
    content.classList.add('visible');
    var images = slides.querySelectorAll('img');
    var sliderRight = document.querySelector('.slider-right');
    sliderRight.innerHTML = '';
    images.forEach(function (img) {
      sliderRight.appendChild(img.cloneNode());
    });
  };
  var tabs = document.querySelectorAll('.tab-title');
  tabs.forEach(function (tab) {
    return tab.addEventListener('click', tabOpenListener);
  });

  // tab

  // modal

  var modalOpenListener = function modalOpenListener(e) {
    var body = document.querySelector('body');
    var modal = document.querySelector('.modal');
    modal.classList.add('opened');
    body.style.overflowY = 'hidden';
    var category = e.currentTarget.getAttribute('data-category-slag');
    var id = e.currentTarget.getAttribute('data-id');
    var item = data[category][id];
    modal.querySelector('[data-name="preview_mini"]').innerHTML = item.preview_mini;
    modal.querySelector('[data-name="title"]').innerHTML = item.title;
    modal.querySelector('[data-name="left_title"]').innerHTML = item.left_title;
    modal.querySelector('[data-name="right_title"]').innerHTML = item.right_title;
    modal.querySelector('[data-name="count"]').innerHTML = item.count;
    var left_slider = modal.querySelector('[data-name="left_slider"]');
    item['left_images'].forEach(function (image) {
      var slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      var img = document.createElement('img');
      img.src = image;
      slide.append(img);
      left_slider.innerHTML = '';
      left_slider.append(slide);
    });
    var right_slider = modal.querySelector('[data-name="right_slider"]');
    item['right_images'].forEach(function (image) {
      var slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      var img = document.createElement('img');
      img.src = image;
      slide.append(img);
      right_slider.innerHTML = '';
      right_slider.append(slide);
    });
    var left_list = modal.querySelector('[data-name="left_list"]');
    var right_list = modal.querySelector('[data-name="right_list"]');
    item['left_list'].forEach(function (value) {
      Object.entries(value).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];
        var div = document.createElement('div');
        div.classList.add('row', 'body-3-sarala');
        var keyElem = document.createElement('div');
        keyElem.classList.add('key');
        keyElem.innerHTML = key;
        div.append(keyElem);
        var valueElem = document.createElement('div');
        valueElem.classList.add('value');
        valueElem.innerHTML = value;
        div.append(valueElem);
        left_list.innerHTML = '';
        left_list.append(div);
      });
    });
    item['right_list'].forEach(function (value) {
      Object.entries(value).forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
          key = _ref5[0],
          value = _ref5[1];
        var div = document.createElement('div');
        div.classList.add('row', 'body-3-sarala');
        var keyElem = document.createElement('div');
        keyElem.classList.add('key');
        keyElem.innerHTML = key;
        div.append(keyElem);
        var valueElem = document.createElement('div');
        valueElem.classList.add('value');
        valueElem.innerHTML = value;
        div.append(valueElem);
        right_list.innerHTML = '';
        right_list.append(div);
      });
    });
    document.getElementById('close-modal').addEventListener('click', function () {
      modal.classList.remove('opened');
      body.style.overflowY = 'visible';
    });
  };
  var blocks = document.querySelectorAll('.slide-open-modal');
  blocks.forEach(function (block) {
    return block.addEventListener('click', modalOpenListener);
  });
  // modal

  var openDropdownButton = document.querySelector('.open-dropdown');
  var openDropdownListener = function openDropdownListener(e) {
    var target = e.currentTarget;
    var dropdown = e.currentTarget.parentNode.querySelector('.dropdown');
    e.stopImmediatePropagation();
    dropdown.dispatchEvent(new Event('click'));
    dropdown.classList.remove('hidden');
    dropdown.classList.add('show');
    target.classList.add('hidden');
    dropdownCloseListener = function (_dropdownCloseListener) {
      function dropdownCloseListener(_x) {
        return _dropdownCloseListener.apply(this, arguments);
      }
      dropdownCloseListener.toString = function () {
        return _dropdownCloseListener.toString();
      };
      return dropdownCloseListener;
    }(function (e) {
      target.classList.remove('hidden');
      dropdown.classList.add('hidden');
      dropdown.removeEventListener('close', dropdownCloseListener);
    });
    dropdown.addEventListener('close', dropdownCloseListener);
  };
  openDropdownButton.addEventListener('click', openDropdownListener);
  document.getElementById('pdf-value').addEventListener('change', function (e) {
    openModal(e.currentTarget.value);
  });

  // animation

  document.getElementById('go-to-bottom').addEventListener('click', function (e) {
    gsap.to(window, _defineProperty(_defineProperty({
      duration: 1,
      scrollTo: ''
    }, "scrollTo", {
      y: "#index-fourth",
      offsetY: 150
    }), "ease", "Power1.easeInOut"));
  });
  var navScrollToListener = function navScrollToListener(e) {
    if (e.currentTarget.tagName !== 'A') return;
    e.preventDefault();
    gsap.to(window, _defineProperty(_defineProperty({
      duration: 1,
      scrollTo: ''
    }, "scrollTo", {
      y: e.currentTarget.getAttribute('href'),
      offsetY: 150
    }), "ease", "Power1.easeInOut"));
  };
  var navLinks = document.querySelectorAll('.nav-scroll-link');
  navLinks.forEach(function (navLink) {
    return navLink.addEventListener('click', navScrollToListener);
  });

  // paralax start

  // paralax end

  // ScrollTrigger.create({
  //   trigger: ".left-brick",
  //   start: "-100px top", 
  //   end: "bottom 300px",
  //   pin: ".left-brick"
  // });

  gsap.to('.left-brick', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: ".left-brick",
      start: "-100px top",
      end: "bottom 300px",
      scrub: true
    }
  });
  gsap.to('.right-brick', {
    yPercent: 40,
    ease: 'none',
    scrollTrigger: {
      trigger: ".right-brick",
      start: "-100px top",
      end: "bottom 300px",
      scrub: true
    }
  });
  gsap.to('.sixth-right-brick', {
    yPercent: 40,
    ease: 'none',
    scrollTrigger: {
      trigger: ".sixth-right-brick",
      start: "-400px top",
      end: "bottom 300px",
      scrub: true
    }
  });
  gsap.to('.sixth-left-brick', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: ".sixth-left-brick",
      start: "-400px top",
      end: "bottom 300px",
      scrub: true
    }
  });

  // gsap.fromTo(
  //   'header',
  //   { y: -100, opacity: 0 },
  //   { y: 0, opacity: 1, delay: 0.5 });

  // first
  gsap.fromTo('.index-page .first .container', {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 0.5
  });

  // second
  var second = {};
  second.trigger = {
    trigger: '.index-page .second',
    start: '0px bottom',
    end: 'bottom top',
    toggleActions: "play pause resume reset"
  };
  gsap.fromTo('.index-page .second .container .top', {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 0.5,
    scrollTrigger: second.trigger
  });
  gsap.fromTo('.index-page .second .container .list', {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 0.8,
    scrollTrigger: second.trigger
  });

  // third
  var third = {};
  third.trigger = {
    trigger: '.index-page .third .container',
    start: '0px bottom',
    end: 'bottom top',
    toggleActions: "play pause resume reset"
  };
  gsap.fromTo('.index-page .third .container .mini-title', {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 0.5,
    scrollTrigger: third.trigger
  });
  gsap.fromTo('.index-page .third .container .title', {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 0.5,
    scrollTrigger: third.trigger
  });
  gsap.fromTo('.index-page .third .container .tabs', {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 0.5,
    scrollTrigger: third.trigger
  });
  gsap.fromTo('.index-page .third .slider-container', {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 1.25,
    scrollTrigger: third.trigger
  });
  var fourth = {};
  fourth.trigger = {
    trigger: '.index-page .fourth',
    start: '0px bottom',
    end: 'bottom top',
    toggleActions: "play pause resume reset"
  };
  gsap.fromTo('.index-page .fourth .container .left .title', {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 0.5,
    scrollTrigger: fourth.trigger
  });
  gsap.fromTo('.index-page .fourth .container .right .box', {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 0.5,
    scrollTrigger: fourth.trigger
  });

  // fifth
  var fifth = {};
  fifth.trigger = {
    trigger: '.index-page .fifth',
    start: '0px bottom',
    end: 'bottom top',
    toggleActions: "play pause resume reset"
  };
  gsap.fromTo(".index-page .fifth .left .title .text", {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 0.5,
    scrollTrigger: fifth.trigger
  });
  for (var i = 0; i < 3; i++) {
    var className = 'item-first';
    if (i == 1) {
      className = 'item-second';
    } else if (i == 2) {
      className = 'item-third';
    } else if (i == 3) {
      className = 'item-fourth';
    }
    gsap.fromTo(".index-page .fifth .left .list .".concat(className, " .top"), {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      delay: 0.5,
      scrollTrigger: fifth.trigger
    });
    gsap.fromTo(".index-page .fifth .left .list .".concat(className, " .H1"), {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      delay: 0.5,
      scrollTrigger: fifth.trigger
    });
    gsap.fromTo(".index-page .fifth .left .list .".concat(className, " .body-3"), {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      delay: 0.5,
      scrollTrigger: fifth.trigger
    });
  }
  gsap.fromTo(".index-page .fifth .right .title .text", {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 0.5,
    scrollTrigger: fifth.trigger
  });
  for (var _i = 0; _i < 3; _i++) {
    var _className = 'item-first';
    if (_i == 1) {
      _className = 'item-second';
    } else if (_i == 2) {
      _className = 'item-third';
    } else if (_i == 3) {
      _className = 'item-fourth';
    }
    gsap.fromTo(".index-page .fifth .right .list .".concat(_className, " .top"), {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      delay: 0.5,
      scrollTrigger: fifth.trigger
    });
    gsap.fromTo(".index-page .fifth .right .list .".concat(_className, " .H1"), {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      delay: 0.5,
      scrollTrigger: fifth.trigger
    });
    gsap.fromTo(".index-page .fifth .right .list .".concat(_className, " .body-3"), {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      delay: 0.5,
      scrollTrigger: fifth.trigger
    });
  }

  // sixth 
  var sixth = {};
  sixth.trigger = {
    trigger: '.index-page .sixth',
    start: '0px bottom',
    end: 'bottom top',
    toggleActions: "play pause resume reset"
  };
  gsap.fromTo('.index-page .sixth .container .left', {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 0.5,
    scrollTrigger: sixth.trigger
  });
  gsap.fromTo('.index-page .sixth .container .right', {
    y: 100,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    delay: 0.5,
    scrollTrigger: sixth.trigger
  });
});
},{}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37737" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)