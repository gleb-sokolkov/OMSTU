/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/js/lib/closures.js":
/*!***********************************!*\
  !*** ./client/js/lib/closures.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CLOSURES)
/* harmony export */ });
class CLOSURES {

    /**
     * A Timer function represents callback execution at each iteration with some delay and exit function
     * @param {Function} func callback function 
     * @param {Number} delay interval delay
     * @param {Function} exit_func checks condition of exit at each iteration. If it returns false, the timer moves to a new iteration, otherwise the timer stops execution  
     * @returns {Function} closure, that can be executed later  
     */
    static wrapTimeout = (func, delay, exit_func, f = () => {
        if(exit_func?.()) {
            return;
        }
        func();
        setTimeout(f, delay);
    }) => () => setTimeout(f, delay);


    /**
     * A Sleep function creates a promise-wrapper of the setTimeout function. It must be called with await operator. 
     */
    static sleep(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    
    static delayedFunc = (callback, delay, iterationEnds = true) => async (...params) => {
        if(iterationEnds) {
            iterationEnds = false;
            await this.sleep(delay);
            iterationEnds = true;
            callback(...params);
        }
    };

    static awaitFunc = (callback, delay, iterationEnds = true) => async (...params) => {
        if(iterationEnds) {
            iterationEnds = false;
            callback(...params);
            await this.sleep(delay);
            iterationEnds = true;
        }
    };
}


/***/ }),

/***/ "./client/js/lib/dom.js":
/*!******************************!*\
  !*** ./client/js/lib/dom.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DOMFunctions)
/* harmony export */ });
class DOMFunctions {

    static SM_BREAKPOINT = 600;

    static nextNeighbor(node) {
        let neighbor = node.nextSibling;
        while(neighbor && neighbor.nodeType !== 1) {
            neighbor = neighbor.nextSibling;
        }
        return neighbor;
    }
    
    /**
     * Finds elements in DOM, which matches some query string, and converts a result to Array  
     * @param {String} queryStr query string using to search elements, which matches this string 
     * @returns {Array.<Element>} Array of founded Elements
     */
    static findElements = (queryStr) => Array.prototype.slice.call(document.querySelectorAll(queryStr));
    
    static SM(a, b) {
        document.documentElement.clientWidth <= DOMFunctions.SM_BREAKPOINT ? a() : b();
    }
}

/***/ }),

/***/ "./client/js/menu/index.js":
/*!*********************************!*\
  !*** ./client/js/menu/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Menu": () => (/* binding */ Menu),
/* harmony export */   "Expander": () => (/* binding */ Expander)
/* harmony export */ });
/* harmony import */ var _lib_closures__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/closures */ "./client/js/lib/closures.js");


class Menu {
    
    static className = "anchor";

    constructor(root) {
        this.root = root;
        this.startOffset = this.root.getBoundingClientRect().top + document.documentElement.scrollTop;
        if(document.documentElement.clientWidth > 600) {
            window.addEventListener('scroll', _lib_closures__WEBPACK_IMPORTED_MODULE_0__.default.delayedFunc(this.collapse.bind(this), 500));
        }
    }

    collapse() {
        const offset = this.startOffset + this.root.offsetHeight;
        if(window.scrollY - offset >= 0) {
            this.root.classList.add(Menu.className);
        }    
        else {
            this.root.classList.remove(Menu.className);
        }
    }
}

class Expander {
    static expand = "expand";
    static overflowHidden = "overflow-hidden";

    constructor(toggler, expandable) {
        this.expandable = expandable;
        this.toggler = toggler;

        this.toggler.onclick = this.switchState.bind(this);
    }

    switchState() {
        this.expandable.classList.toggle(Expander.expand);
        this.toggler.classList.toggle(Expander.expand);
        document.documentElement.classList.toggle(Expander.overflowHidden);
    }
}

/***/ }),

/***/ "./client/js/slider/index.js":
/*!***********************************!*\
  !*** ./client/js/slider/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/dom.js */ "./client/js/lib/dom.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debounce */ "./node_modules/debounce/index.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_closures_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/closures.js */ "./client/js/lib/closures.js");




class Slider {

    static SLIDE_DELAY = 10000;
    static RESIZE_DELAY = 500;

    constructor(root, delay) {

        this.root = root;
        this.delay = delay ?? Slider.SLIDE_DELAY;
        this.items = Array.prototype.slice.call(root.querySelectorAll(".slider-item"));
        this.currentItem = 0;

        this.bindScrollButtons();
            
        window.addEventListener("resize", (0,debounce__WEBPACK_IMPORTED_MODULE_1__.debounce)(_lib_dom_js__WEBPACK_IMPORTED_MODULE_0__.default.SM.bind(this, 
            () => (this.currentPosition = this.halfRoundPosition).call(this), 
            () => (this.currentPosition = this.roundPosition).call(this)), Slider.RESIZE_DELAY));
        window.dispatchEvent(new Event("resize"));

        this.activeItemDelayed = _lib_closures_js__WEBPACK_IMPORTED_MODULE_2__.default.awaitFunc(this.changeActiveItem.bind(this), 500);
    }

    changeActiveItem(index) {
        this.restartInterval();
        if (this.currentItem === index) return;
        this.currentItem = index;
        this.currentPosition();
    }

    nextActiveItem() {
        this.activeItemDelayed((this.currentItem + 1) % this.items.length);
    }

    previousActiveItem() {
        this.activeItemDelayed((this.currentItem - 1 + this.items.length) % this.items.length);
    }

    startInterval() {
        this.interval = setTimeout(this.nextActiveItem.bind(this), this.delay);
    }

    restartInterval() {
        this.stopInterval();
        this.startInterval();
    }

    stopInterval() {
        clearTimeout(this.interval);
    }

    createSwitchButtons() {
        this.buttonContainer = this.root.querySelector('.slider-buttons-container');

        this.buttons = this.items.map((item, index) => {
            const button = document.createElement('button');
            button.className = "btn slider-button";
            button.onclick = this.changeActiveItem.bind(this, index);
            this.buttonContainer.appendChild(button);
            return button;
        });
    }

    bindScrollButtons() {
        this.nextButton = this.root.querySelector("[data-scroll='next']");
        this.nextButton.onclick = this.nextActiveItem.bind(this);

        this.previousButton = this.root.querySelector("[data-scroll='previous']");
        this.previousButton.onclick = this.previousActiveItem.bind(this);
    }

    roundPosition() {

        this.root.classList.toggle("half-round", false);

        const step = Math.PI * 2.0 / this.items.length;
        const halfWidth = this.root.clientWidth * 0.5;
        const halfHeight = this.root.clientHeight * 0.5;
        this.items.forEach((item, index) => {
            const offsetX = halfWidth - item.offsetWidth * 0.5;
            const offsetY = halfHeight - item.offsetHeight * 0.5;
            const indexWithOffset = (index + this.currentItem) % this.items.length;
            let x = -Math.sin(indexWithOffset * step) * offsetX + offsetX;
            let y = offsetY;
            let z = -Math.cos(indexWithOffset * step) * offsetX + offsetX;

            item.style.transform = `translate3d(${x}px, ${y}px, ${-z}px)`;
        });
    }

    halfRoundPosition() {

        this.root.classList.toggle("half-round", true);

        const width = this.root.clientWidth;
        const halfWidth = width * 0.5;
        const height = this.root.clientHeight;
        const halfHeight = height * 0.5;
        const fullWidth = this.items.reduce((s, t) => s + t.offsetWidth, 0);
        const halfFullWidth = fullWidth * 0.5;
        this.items
            .map((t, i) => (i + this.currentItem) % this.items.length)
            .reduce((sum, i) => {
                const offsetX = halfWidth - this.items[this.currentItem].offsetWidth * 0.5;
                const itemWidth = this.items[i].offsetWidth;
                const offsetY = halfHeight - this.items[i].offsetHeight * 0.5;
                let x = (sum + halfFullWidth) % fullWidth - halfFullWidth + offsetX;
                let y = offsetY;
                let z = 0;

                this.items[i].classList.toggle("without-transition", false);
                if(x <= -itemWidth || x >= width) {
                    this.items[i].classList.toggle("without-transition", true); 
                }

                this.items[i].style.transform = `translate3d(${x}px, ${y}px, ${-z}px)`;
                
                return sum + this.items[i].offsetWidth;
            }, 0);
    }
}

/***/ }),

/***/ "./node_modules/debounce/index.js":
/*!****************************************!*\
  !*** ./node_modules/debounce/index.js ***!
  \****************************************/
/***/ ((module) => {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_menu_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/menu/index.js */ "./client/js/menu/index.js");
/* harmony import */ var _js_lib_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/lib/dom.js */ "./client/js/lib/dom.js");
/* harmony import */ var _js_lib_closures_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/lib/closures.js */ "./client/js/lib/closures.js");
/* harmony import */ var _js_slider_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/slider/index.js */ "./client/js/slider/index.js");





let menuList = _js_lib_dom_js__WEBPACK_IMPORTED_MODULE_1__.default.findElements(".header-menu").map(item => new _js_menu_index_js__WEBPACK_IMPORTED_MODULE_0__.Menu(item));
let expanderList = _js_lib_dom_js__WEBPACK_IMPORTED_MODULE_1__.default.findElements(".expander-wrapper").map(item => new _js_menu_index_js__WEBPACK_IMPORTED_MODULE_0__.Expander(item, _js_lib_dom_js__WEBPACK_IMPORTED_MODULE_1__.default.nextNeighbor(item)));
let sliderList = _js_lib_dom_js__WEBPACK_IMPORTED_MODULE_1__.default.findElements(".slider-container").map(item => new _js_slider_index_js__WEBPACK_IMPORTED_MODULE_3__.default(item));
})();

/******/ })()
;
//# sourceMappingURL=shared.bundle.js.map