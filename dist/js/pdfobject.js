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
})({"pdfobject.js":[function(require,module,exports) {
var define;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 *  PDFObject v2.3.0
 *  https://github.com/pipwerks/PDFObject
 *  @license
 *  Copyright (c) 2008-2024 Philip Hutchison
 *  MIT-style license: http://pipwerks.mit-license.org/
 *  UMD module pattern from https://github.com/umdjs/umd/blob/master/templates/returnExports.js
 */

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.PDFObject = factory();
  }
})(this, function () {
  "use strict";

  //PDFObject is designed for client-side (browsers), not server-side (node)
  //Will choke on undefined navigator and window vars when run on server
  //Return boolean false and exit function when running server-side
  if (typeof window === "undefined" || window.navigator === undefined || window.navigator.userAgent === undefined) {
    return false;
  }
  var pdfobjectversion = "2.3.0";
  var win = window;
  var nav = win.navigator;
  var ua = nav.userAgent;
  var suppressConsole = false;

  //Fallback validation when navigator.pdfViewerEnabled is not supported
  var isModernBrowser = function isModernBrowser() {
    /*
       userAgent sniffing is not the ideal path, but most browsers revoked the ability to check navigator.mimeTypes 
       for security purposes. As of 2023, browsers have begun implementing navigator.pdfViewerEnabled, but older versions
       do not have navigator.pdfViewerEnabled or the ability to check navigator.mimeTypes. We're left with basic browser 
       sniffing and assumptions of PDF support based on browser vendor.
    */

    //Chromium has provided native PDF support since 2011.
    //Most modern browsers use Chromium under the hood: Google Chrome, Microsoft Edge, Opera, Brave, Vivaldi, Arc, and more.
    //Chromium uses the PDFium rendering engine, which is based on Foxit's PDF rendering engine.
    //Note that MS Edge opts to use a different PDF rendering engine. As of 2024, Edge uses a version of Adobe's Reader
    var isChromium = win.chrome !== undefined;

    //Safari on macOS has provided native PDF support since 2009. 
    //This code snippet also detects the DuckDuckGo browser, which uses Safari/Webkit under the hood.
    var isSafari = win.safari !== undefined || nav.vendor !== undefined && /Apple/.test(nav.vendor) && /Safari/.test(ua);

    //Firefox has provided PDF support via PDFJS since 2013.
    var isFirefox = win.Mozilla !== undefined || /irefox/.test(ua);
    return isChromium || isSafari || isFirefox;
  };

  /*
     Special handling for Internet Explorer 11.
     Check for ActiveX support, then whether "AcroPDF.PDF" or "PDF.PdfCtrl" are valid.
     IE11 uses ActiveX for Adobe Reader and other PDF plugins, but window.ActiveXObject will evaluate to false. 
     ("ActiveXObject" in window) evaluates to true.
     MS Edge does not support ActiveX so this test will evaluate false for MS Edge.
  */
  var validateAX = function validateAX(type) {
    var ax = null;
    try {
      ax = new ActiveXObject(type);
    } catch (e) {
      //ensure ax remains null when ActiveXObject attempt fails
      ax = null;
    }
    return !!ax; //convert resulting object to boolean
  };
  var hasActiveXPDFPlugin = function hasActiveXPDFPlugin() {
    return "ActiveXObject" in win && (validateAX("AcroPDF.PDF") || validateAX("PDF.PdfCtrl"));
  };
  var checkSupport = function checkSupport() {
    //Safari on iPadOS doesn't report as 'mobile' when requesting desktop site, yet still fails to embed PDFs
    var isSafariIOSDesktopMode = nav.platform !== undefined && nav.platform === "MacIntel" && nav.maxTouchPoints !== undefined && nav.maxTouchPoints > 1;
    var isMobileDevice = isSafariIOSDesktopMode || /Mobi|Tablet|Android|iPad|iPhone/.test(ua);

    //As of June 2023, no mobile browsers properly support inline PDFs. If mobile, just say no.
    if (isMobileDevice) {
      return false;
    }

    //Modern browsers began supporting navigator.pdfViewerEnabled in late 2022 and early 2023.
    var supportsPDFVE = typeof nav.pdfViewerEnabled === "boolean";

    //If browser supports nav.pdfViewerEnabled and is explicitly saying PDFs are NOT supported (e.g. PDFJS disabled by user in Firefox), respect it.
    if (supportsPDFVE && !nav.pdfViewerEnabled) {
      return false;
    }
    return supportsPDFVE && nav.pdfViewerEnabled || isModernBrowser() || hasActiveXPDFPlugin();
  };

  //Determines whether PDF support is available
  var supportsPDFs = checkSupport();

  //Create a fragment identifier for using PDF Open parameters when embedding PDF
  var buildURLFragmentString = function buildURLFragmentString(pdfParams) {
    var string = "";
    var prop;
    var paramArray = [];
    var fdf = "";

    //The comment, viewrect, and highlight parameters require page to be set first. 

    //Check to ensure page is used if comment, viewrect, or highlight are specified
    if (pdfParams.comment || pdfParams.viewrect || pdfParams.highlight) {
      if (!pdfParams.page) {
        //If page is not set, use the first page
        pdfParams.page = 1;

        //Inform user that page needs to be set properly
        embedError("The comment, viewrect, and highlight parameters require a page parameter, but none was specified. Defaulting to page 1.");
      }
    }

    //Let's go ahead and ensure page is always the first parameter.
    if (pdfParams.page) {
      paramArray.push("page=" + encodeURIComponent(pdfParams.page));
      delete pdfParams.page;
    }

    //FDF needs to be the last parameter in the string
    if (pdfParams.fdf) {
      fdf = pdfParams.fdf;
      delete pdfParams.fdf;
    }

    //Add all other parameters, as needed
    if (pdfParams) {
      for (prop in pdfParams) {
        if (pdfParams.hasOwnProperty(prop)) {
          paramArray.push(encodeURIComponent(prop) + "=" + encodeURIComponent(pdfParams[prop]));
        }
      }

      //Add fdf as the last parameter, if needed
      if (fdf) {
        paramArray.push("fdf=" + encodeURIComponent(fdf));
      }

      //Join all parameters in the array into a string
      string = paramArray.join("&");

      //The string will be empty if no PDF Parameters were provided
      //Only prepend the hash if the string is not empty
      if (string) {
        string = "#" + string;
      }
    }
    return string;
  };
  var embedError = function embedError(msg) {
    if (!suppressConsole) {
      console.log("[PDFObject]", msg);
    }
    return false;
  };
  var emptyNodeContents = function emptyNodeContents(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  };
  var getTargetElement = function getTargetElement(targetSelector) {
    //Default to body for full-browser PDF
    var targetNode = document.body;

    //If a targetSelector is specified, check to see whether
    //it's passing a selector, jQuery object, or an HTML element

    if (typeof targetSelector === "string") {
      //Is CSS selector
      targetNode = document.querySelector(targetSelector);
    } else if (win.jQuery !== undefined && targetSelector instanceof jQuery && targetSelector.length) {
      //Is jQuery element. Extract HTML node
      targetNode = targetSelector.get(0);
    } else if (targetSelector.nodeType !== undefined && targetSelector.nodeType === 1) {
      //Is HTML element
      targetNode = targetSelector;
    }
    return targetNode;
  };
  var convertBase64ToDownloadableLink = function convertBase64ToDownloadableLink(b64, filename, targetNode, fallbackHTML) {
    //IE-11 safe version. More verbose than modern fetch()
    if (window.Blob && window.URL && window.URL.createObjectURL) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', b64, true);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        if (xhr.status === 200) {
          var blob = xhr.response;
          var link = document.createElement('a');
          link.innerText = "Download PDF";
          link.href = URL.createObjectURL(blob);
          link.setAttribute('download', filename);
          targetNode.innerHTML = fallbackHTML.replace(/\[pdflink\]/g, link.outerHTML);
        }
      };
      xhr.send();
    }
  };
  var generatePDFObjectMarkup = function generatePDFObjectMarkup(embedType, targetNode, url, pdfOpenFragment, width, height, id, title, omitInlineStyles, customAttribute, PDFJS_URL) {
    //Ensure target element is empty first
    emptyNodeContents(targetNode);
    var source = url;
    if (embedType === "pdfjs") {
      //If PDFJS_URL already contains a ?, assume querystring is in place, and use an ampersand to append PDFJS's file parameter
      var connector = PDFJS_URL.indexOf("?") !== -1 ? "&" : "?";
      source = PDFJS_URL + connector + "file=" + encodeURIComponent(url) + pdfOpenFragment;
    } else {
      source += pdfOpenFragment;
    }
    var el = document.createElement("iframe");
    el.className = "pdfobject";
    el.type = "application/pdf";
    el.title = title;
    el.src = source;
    el.allow = "fullscreen";
    el.frameborder = "0";
    if (id) {
      el.id = id;
    }
    if (!omitInlineStyles) {
      var style = "border: none;";
      if (targetNode !== document.body) {
        //assign width and height to target node
        style += "width: " + width + "; height: " + height + ";";
      } else {
        //this is a full-page embed, use CSS to fill the viewport
        style += "position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;";
      }
      el.style.cssText = style;
    }

    //Allow developer to insert custom attribute on iframe element, but ensure it does not conflict with attributes used by PDFObject
    var reservedTokens = ["className", "type", "title", "src", "style", "id", "allow", "frameborder"];
    if (customAttribute && customAttribute.key && reservedTokens.indexOf(customAttribute.key) === -1) {
      el.setAttribute(customAttribute.key, typeof customAttribute.value !== "undefined" ? customAttribute.value : "");
    }
    targetNode.classList.add("pdfobject-container");
    targetNode.appendChild(el);
    return targetNode.getElementsByTagName("iframe")[0];
  };
  var _embed = function embed(url, targetSelector, options) {
    //If targetSelector is not defined, convert to boolean
    var selector = targetSelector || false;

    //Ensure options object is not undefined -- enables easier error checking below
    var opt = options || {};

    //Get passed options, or set reasonable defaults
    suppressConsole = typeof opt.suppressConsole === "boolean" ? opt.suppressConsole : false;
    var id = typeof opt.id === "string" ? opt.id : "";
    var page = opt.page || false;
    var pdfOpenParams = opt.pdfOpenParams || {};
    var fallbackLink = typeof opt.fallbackLink === "string" || typeof opt.fallbackLink === "boolean" ? opt.fallbackLink : true;
    var width = opt.width || "100%";
    var height = opt.height || "100%";
    var title = opt.title || "Embedded PDF";
    var forcePDFJS = typeof opt.forcePDFJS === "boolean" ? opt.forcePDFJS : false;
    var omitInlineStyles = typeof opt.omitInlineStyles === "boolean" ? opt.omitInlineStyles : false;
    var PDFJS_URL = opt.PDFJS_URL || false;
    var targetNode = getTargetElement(selector);
    var pdfOpenFragment = "";
    var customAttribute = opt.customAttribute || {};
    var fallbackHTML_default = "<p>This browser does not support inline PDFs. Please download the PDF to view it: [pdflink]</p>";

    //Ensure URL is available. If not, exit now.
    if (typeof url !== "string") {
      return embedError("URL is not valid");
    }

    //If target element is specified but is not valid, exit without doing anything
    if (!targetNode) {
      return embedError("Target element cannot be determined");
    }

    //page option overrides pdfOpenParams, if found
    if (page) {
      pdfOpenParams.page = page;
    }

    //Stringify optional Adobe params for opening document (as fragment identifier)
    pdfOpenFragment = buildURLFragmentString(pdfOpenParams);

    // --== Do the dance: Embed attempt #1 ==--

    //If the forcePDFJS option is invoked, skip everything else and embed as directed
    if (forcePDFJS && PDFJS_URL) {
      return generatePDFObjectMarkup("pdfjs", targetNode, url, pdfOpenFragment, width, height, id, title, omitInlineStyles, customAttribute, PDFJS_URL);
    }

    // --== Embed attempt #2 ==--

    //Embed PDF if support is detected, or if this is a relatively modern browser 
    if (supportsPDFs) {
      return generatePDFObjectMarkup("iframe", targetNode, url, pdfOpenFragment, width, height, id, title, omitInlineStyles, customAttribute);
    }

    // --== Embed attempt #3 ==--

    //If everything else has failed and a PDFJS fallback is provided, try to use it
    if (PDFJS_URL) {
      return generatePDFObjectMarkup("pdfjs", targetNode, url, pdfOpenFragment, width, height, id, title, omitInlineStyles, customAttribute, PDFJS_URL);
    }

    // --== PDF embed not supported! Use fallback ==-- 

    //Display the fallback link if available
    if (fallbackLink) {
      //If a custom fallback has been provided, handle it now
      if (typeof fallbackLink === "string") {
        //Ensure [url] is set in custom fallback
        targetNode.innerHTML = fallbackLink.replace(/\[url\]/g, url);
      } else {
        //If the PDF is a base64 string, convert it to a downloadable link
        if (url.indexOf("data:application/pdf;base64") !== -1) {
          //Asynchronously append the link to the targetNode
          convertBase64ToDownloadableLink(url, "file.pdf", targetNode, fallbackHTML_default);
        } else {
          //Use default fallback link
          var link = "<a href='" + url + "'>Download PDF</a>";
          targetNode.innerHTML = fallbackHTML_default.replace(/\[pdflink\]/g, link);
        }
      }
    }
    return embedError("This browser does not support embedded PDFs");
  };
  return {
    embed: function embed(a, b, c) {
      return _embed(a, b, c);
    },
    pdfobjectversion: function () {
      return pdfobjectversion;
    }(),
    supportsPDFs: function () {
      return supportsPDFs;
    }()
  };
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
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","pdfobject.js"], null)