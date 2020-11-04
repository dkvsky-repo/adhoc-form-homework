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
/**
 * - Validate data entry (age is required and > 0, relationship is required)
 * - Add people to a growing household list
 * - Reset the entry form after each addition
 * - Remove a previously added person from the list
 * - Display the household list in the HTML as it is modified
 * - Serialize the household as JSON upon form submission as a fake trip to the server
 */
// your code goes here ...
var ageInput = document.querySelector('input[name="age"]');
var relationshipDropdown = document.querySelector('select[name="rel"]');
var smokerCheckbox = document.querySelector('input[name="smoker"]');
var form = document.querySelector("form");
var addButton = document.querySelector("button.add");
var submitButton = document.querySelector('button[type="submit"]');
var householdList = document.querySelector("ol.household");
addButton.disabled = true;
submitButton.disabled = true; // Validate form entries on form change.

ageInput.addEventListener("change", function () {
  validate("ageInput");
});
relationshipDropdown.addEventListener("change", function () {
  validate("relationshipDropdown");
});
/**
 * Validate HTML element.
 *
 * @param {String} item The name of the HTMLElement to validate.
 */

function validate(item) {
  switch (item) {
    case "ageInput":
      // Check for previous validation errors and reset.
      var ageError = document.querySelector("input + span.error");
      resetError(ageError); // Validate.

      if (isNaN(parseInt(ageInput.value))) {
        createErrorMessage(ageInput, "Must be a valid number (\"".concat(ageInput.value, "\" entered)."));
      } else if (parseInt(ageInput.value) <= 0) {
        createErrorMessage(ageInput, "Must be greater than 0 (\"".concat(ageInput.value, "\" entered)."));
      }

      break;

    case "relationshipDropdown":
      // Check for previous validation errors and reset.
      var relationshipError = document.querySelector("select + span.error");
      resetError(relationshipError); // Validate.

      if (relationshipDropdown.value.length === 0) {
        createErrorMessage(relationshipDropdown, "Required");
      }

      break;
  }
}
/**
 * Create Validation Error Message.
 *
 * @param {String} formItem The item to validate.
 * @param {String} message The error message to display.
 */


function createErrorMessage(formItem, message) {
  var element = document.createElement("span");
  element.classList.add("error");
  var textContent = document.createTextNode("".concat(message));
  return formItem.insertAdjacentElement("afterend", element).appendChild(textContent);
}
/**
 * Check if there is error.
 *
 * @param {HTMLElement} element The HTML element.
 * @returns {Bool} true|false True if error, false otherwise.
 */


function error(element) {
  return element && element.length !== 0 ? true : false;
}
/**
 * Remove error message.
 * Removes previous error message, if any, prior to new validation.
 *
 * @param {HTMLElement} element The target HTML element.
 */


function resetError(element) {
  if (error(element)) {
    element.remove();
  }
} // Enable/disable button


form.addEventListener("change", function () {
  if (document.querySelectorAll("span.error").length > 0 || ageInput.value === "" || relationshipDropdown.value === "") {
    addButton.disabled = true;
    submitButton.disabled = true;
  } else {
    addButton.disabled = false;
    submitButton.disabled = false;
  }
}); // Add household items.

var household = [];
var id = 0;
addButton.addEventListener("click", function (e) {
  e.preventDefault();
  household.push({
    id: id,
    age: ageInput.value,
    relationship: relationshipDropdown.value,
    smoker: smokerCheckbox.checked ? "yes" : "no"
  });
  console.log(household);
  householdList.innerHTML += "<li data-id=".concat(household[id].id, ">Age: ").concat(household[id].age, ", relationship: ").concat(household[id].relationship, ", smoker: ").concat(household[id].smoker, " <span data-id=").concat(household[id].id, " class=\"delete\">\u274C</span></li>");
  id++;
  form.reset();
  addButton.disabled = true;
});
householdList.addEventListener("click", function () {
  document.querySelector("span.delete").addEventListener("click", function () {
    var id = document.querySelector("span.delete").getAttribute("data-id");
    document.querySelector("li[data-id=\"".concat(id, "\"]")).remove();
  });
}, true); // Remove household items.
// document.querySelector("span.delete").addEventListener("click", () => {
//   const id = document.querySelector("span.delete").getAttribute("data-id");
//   document.querySelector(`li[data-id="${id}"]`).remove();
// });
// Submit household items and display list.

submitButton.addEventListener("click", function (e) {
  e.preventDefault(); // household.map((item) => {
  //   householdList.innerHTML += `<li data-id=${item.id}>Age: ${item.age}, relationship: ${item.relationship}, smoker: ${item.smoker} <span data-id=${item.id} class="delete">❌</span></li>`;
  // });

  form.reset();
  ageInput.disabled = true;
  relationshipDropdown.disabled = true;
  smokerCheckbox.disabled = true;
  submitButton.disabled = true;
});
var style = document.createElement("style");
style.innerHTML = "\n:root {\n    --desktop-font-size: 1.3rem/1.5;\n    --text-small: 11px;\n    --text-color: #2d2d2d;\n    --link-color: blue;\n    --primary-color: black;\n    --secondary-color: orangered;\n    --tertiary-color: yellowgreen;\n}\nbody {\n  color: var(--text-color);\n}\nbody, input {\n  font: var(--desktop-font-size) -apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto, Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  margin: 120px;\n}\nh1,h2,h3,h4,h5,h6,p,blockquote,dl,img,figure {\n  margin: 2rem 0;\n  display: block;\n}\nh1,h2,h3,h4,h5,h6 { \n  font-weight: bold; \n  line-height: 1.2; \n  color: var(--secondary-color); \n}\nh1 { font-size: 200%; }\nh2 { font-size: 150%; }\nh3 { font-size: 120%; }\nh4,h5,h6 { font-size: 100%; }\nh5, h6 { text-transform: uppercase; }\np { margin: 2rem 0; }\na,a:visited { color: var(--link-color); }\nkbd,code,samp,pre,var { font-family: monospace; font-weight: bold; }\ncode, pre {\n    background: var(--tertiary-color);\n    padding: 0.5rem 1rem;\n}\ncode pre , pre code { padding: 0; }\nul, ol { margin: 2rem 0; padding: 0 0 0 4rem; }\ninput { \n    border: 1px solid var(--text-color);\n    margin: 0.5rem 0;\n}\ninput:focus, input:active { border-color: var(--link-color); }\nform {\n  border: solid 6px var(--primary-color);\n  border-radius: 4px;\n  padding: 20px 60px;\n}\nbutton {\n  padding: 20px 60px;\n  margin: 8px;\n  text-transform: uppercase;\n  border: solid 4px black;\n  border-radius: 4px;\n  background-color: transparent;\n  cursor: pointer;\n}\nbutton[type=\"submit\"] {\n  background-color: var(--secondary-color);\n}\nbutton.add {\n  background-color: var(--tertiary-color);\n}\n.error {\n  color: var(--secondary-color);\n  font-size: var(--text-small);\n  font-weight: bold;\n  margin: 0 4px;\n}\n";
document.head.appendChild(style);
},{}],"../../../.nvm/versions/node/v14.5.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49390" + '/');

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
      }); // Enable HMR for CSS by default.

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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["../../../.nvm/versions/node/v14.5.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/hhbuilder.e31bb0bc.js.map