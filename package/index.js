(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tsmodels", [], factory);
	else if(typeof exports === 'object')
		exports["tsmodels"] = factory();
	else
		root["tsmodels"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1));
__export(__webpack_require__(2));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function Alias(alias, type) {
    return function (target, propertyKey) {
        target.constructor['_alias'] = target['constructor']['_alias'] || [];
        target.constructor['_alias'].push({
            key: propertyKey,
            value: alias || propertyKey,
            type: type
        });
    };
}
exports.Alias = Alias;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for model implementation
 */
var Model = /** @class */ (function () {
    function Model() {
    }
    /**
     * Converter of backend data to model format by aliases
     *
     * @param value data from backend
     * @public
     */
    Model.prototype._fromJSON = function (value) {
        var _this = this;
        this.constructor['_alias']
            .forEach(function (item) {
            var newValue = value[item['value']];
            if (item['type']) {
                if (Array.isArray(newValue)) {
                    _this[item['key']] = newValue.map(function (x) { return _this._createObject(item, x); });
                }
                else if (_this._isObject(newValue)) {
                    _this[item['key']] = _this._createObject(item, newValue);
                }
            }
            else {
                _this[item['key']] = value[item['value']];
            }
        });
    };
    /**
     * Converter of model format to backend data by aliases
     *
     * @return new object
     * @public
     */
    Model.prototype._toJSON = function () {
        var _this = this;
        var obj = {};
        this.constructor['_alias']
            .forEach(function (item) {
            var value = _this[item['key']];
            if (item['type']) {
                if (Array.isArray(value)) {
                    obj[item['value']] = value.map(function (x) { return x._toJSON(); });
                }
                else if (_this._isObject(value)) {
                    obj[item['value']] = value._toJSON();
                }
            }
            else {
                obj[item['value']] = _this[item['key']];
            }
        });
        return obj;
    };
    Model.prototype._createObject = function (item, obj) {
        var newObj = new item['type']();
        newObj._fromJSON(obj);
        return newObj;
    };
    Model.prototype._isObject = function (item) {
        return Object.prototype.toString.call(item) === '[object Object]';
    };
    return Model;
}());
exports.Model = Model;
/**
 * @deprecated Use the `AppModel` instead. Will be remove in version 1.0.0
 */
exports.ApplicationModel = Model;
/**
 * @deprecated Use the `AppModel` instead. Will be remove in version 1.0.0
 */
exports.AppModel = Model;


/***/ })
/******/ ]);
});