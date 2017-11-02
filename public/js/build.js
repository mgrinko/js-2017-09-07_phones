/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const HIDDEN_CLASS = 'js-hidden';

class Component {
  constructor(element) {
    this._element = element;
  }

  hide() {
    this._element.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._element.classList.remove(HIDDEN_CLASS);
  }

  on(eventName, callback, selector) {
    this._element.addEventListener(eventName, (event) => {
      if (selector && !event.target.closest(selector)) {
        return;
      }

      callback(event);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_shop_page_shop_page_js__ = __webpack_require__(2);




new __WEBPACK_IMPORTED_MODULE_0__pages_shop_page_shop_page_js__["a" /* default */]({
  element: document.querySelector('[data-component="pageContent"]'),
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_phone_viewer_phone_viewer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_phone_catalogue_phone_catalogue_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_phone_service_js__ = __webpack_require__(5);







class ShopPage {
  constructor(options) {

    this._element = options.element;
    this._template = document.getElementById('template-shop-page').innerHTML;

    this._render();

    this._viewer = new __WEBPACK_IMPORTED_MODULE_0__components_phone_viewer_phone_viewer_js__["a" /* default */]({
      element: this._element.querySelector('[data-component="phoneViewer"]'),
    });

    this._catalogue = new __WEBPACK_IMPORTED_MODULE_1__components_phone_catalogue_phone_catalogue_js__["a" /* default */]({
      element: this._element.querySelector('[data-component="phoneCatalogue"]'),
    });

    __WEBPACK_IMPORTED_MODULE_2__services_phone_service_js__["a" /* default */].getAll()
      .then((phones) => {
        this._catalogue.showPhones(phones)
      });


    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;

      __WEBPACK_IMPORTED_MODULE_2__services_phone_service_js__["a" /* default */].get(phoneId)
        .then((phone) => {
          this._showPhoneDetails(phone)
        });
    });

    this._viewer.on('back', () => {
      this._viewer.hide();
      this._catalogue.show();
    });
  }

  _render() {
    this._element.innerHTML = this._template;
  }

  _showPhoneDetails(phone) {
    this._viewer.showPhone(phone);
    this._catalogue.hide();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ShopPage;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_js__ = __webpack_require__(0);





class PhoneViewer extends __WEBPACK_IMPORTED_MODULE_0__component_js__["a" /* default */] {
  constructor(options) {
    super(options.element);

    this.on('click', this._onBackClick.bind(this), '[data-element="backButton"]')
  }

  showPhone(phone) {
    this._render(phone);
    this.show();
  }

  _onBackClick() {
    this._element.dispatchEvent(new CustomEvent('back'));
  }

  _render(phoneDetails) {
    let rawTemplate = document.getElementById('template-phone-viewer').innerHTML;
    let compiledTemplate = _.template(rawTemplate);

    this._element.innerHTML = compiledTemplate({
      phone: phoneDetails,
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhoneViewer;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_js__ = __webpack_require__(0);





class PhoneCatalogue extends __WEBPACK_IMPORTED_MODULE_0__component_js__["a" /* default */] {
  constructor(options) {
    super(options.element);

    this.on('click', this._onPhoneLinkClick.bind(this), '[data-element="phoneLink"]');
  }

  showPhones(phones) {
    this._render(phones);
    this.show();
  }

  _onPhoneLinkClick(event) {
    let phoneElement = event.target.closest('[data-element="phone"]');

    let customEvent = new CustomEvent('phoneSelected', {
      detail: phoneElement.dataset.phoneId,
      bubbles: false,
    });

    this._element.dispatchEvent(customEvent);
  }

  _render(phones) {
    let rawTemplate = document.getElementById('template-phone-catalogue').innerHTML;
    let compiledTemplate = _.template(rawTemplate);

    this._element.innerHTML = compiledTemplate({
      phones: phones
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhoneCatalogue;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__http_service_js__ = __webpack_require__(6);





class PhoneService {
  static getAll() {
    return __WEBPACK_IMPORTED_MODULE_0__http_service_js__["a" /* default */].sendRequest('phones/phones.json');
  }

  static get(phoneId) {
    return __WEBPACK_IMPORTED_MODULE_0__http_service_js__["a" /* default */].sendRequest(`phones/${ phoneId }.json`);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhoneService;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const API_BASE_URL = 'http://localhost:8080/server/data/';
// const API_BASE_URL = 'https://mgrinko.github.io/js-2017-09-07_phones/server/data/';

class HttpService {
  static sendRequest(url, { method = 'GET' } = {}) {

    return fetch(API_BASE_URL + url, { method })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);

        return Promise.reject(error);
      });

  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HttpService;



/***/ })
/******/ ]);