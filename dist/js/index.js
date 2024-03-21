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
  var modalSlider = new Swiper('#modal-slider', {
    init: false,
    slidesPerView: "auto",
    navigation: {
      prevEl: '#modal-prev',
      nextEl: '#modal-next'
    },
    breakpoints: {
      1249: {
        spaceBetween: 15
      },
      1250: {
        spaceBetween: 64
      }
    }
  });

  // tab

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
    console.log(slides);
    document.querySelector('#modal-slider .swiper-wrapper').innerHTML = slides.innerHTML;
    modalSlider.update();
    var content = document.querySelector(".tab-content[data-id='" + id + "']");
    var currentVisible = document.querySelector(".tab-content.visible");
    currentVisible.classList.remove('visible');
    content.classList.add('visible');
  };
  var tabs = document.querySelectorAll('.tab-title');
  tabs.forEach(function (tab) {
    return tab.addEventListener('click', tabOpenListener);
  });

  // tab

  // modal

  var modalOpenListener = function modalOpenListener() {
    var body = document.querySelector('body');
    var modal = document.querySelector('.modal-box');
    modal.classList.add('modal-box-opened');
    body.style.overflowY = 'hidden';
    document.getElementById('close-modal').addEventListener('click', function () {
      modal.classList.remove('modal-box-opened');
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
    console.log('opend');
    var target = e.currentTarget;
    var dropdown = e.currentTarget.parentNode.querySelector('.dropdown');
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
    gsap.to(window, {
      duration: 1,
      scrollTo: '#index-fifth',
      ease: "Power1.easeInOut"
    });
  });
  ScrollTrigger.create({
    trigger: ".left-brick",
    start: "-100px top",
    end: "bottom 300px",
    pin: ".left-brick"
  });
  ScrollTrigger.create({
    trigger: ".right-brick",
    start: "-100px top",
    end: "bottom 300px",
    pin: ".right-brick"
  });
  ScrollTrigger.create({
    trigger: ".sixth-right-brick",
    start: "-200px top",
    end: "bottom 300px",
    pin: ".sixth-right-brick"
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42033" + '/');
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