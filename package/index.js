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
        target.constructor['_alias'] = target['constructor']['_alias'] || {};
        var value = alias || propertyKey;
        if (!target.constructor['_alias'][value]) {
            target.constructor['_alias'][value] = {
                key: propertyKey,
                value: value,
                type: type
            };
        }
    };
}
exports.Alias = Alias;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var static_model_1 = __webpack_require__(3);
/**
 * Base class for model implementation
 */
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Converter of backend data to model format by aliases
     *
     * @param value - data from backend
     * @public
     */
    Model.prototype._fromJSON = function (value) {
        var _this = this;
        Object.keys(this.constructor['_alias'])
            .forEach(function (key) {
            _this._createItem(value, _this.constructor['_alias'][key]);
        });
    };
    /**
     *
     * @param value - data from backend
     * @public
     */
    Model.prototype._updateFromJSON = function (value) {
        var _this = this;
        Object.keys(value).forEach(function (key) {
            var item = _this.constructor['_alias'][key];
            if (item) {
                _this._createItem(value, item);
            }
        });
    };
    /**
     * Converter of model format to backend data by aliases
     *
     * @param {string[]} only - export only set fields (needs to set export names)
     * @return new object
     * @public
     */
    Model.prototype._toJSON = function (only) {
        var _this = this;
        var obj = {};
        var keys = Object.keys(this.constructor['_alias']);
        if (only) {
            keys = keys.filter(function (x) { return only.indexOf(x) > -1; });
        }
        keys
            .forEach(function (key) {
            var item = _this.constructor['_alias'][key];
            var fieldValue = _this[item['key']];
            if (item['type']) {
                if (Array.isArray(fieldValue)) {
                    obj[item['value']] = fieldValue.map(function (x) { return x._toJSON(); });
                }
                else if (_this._isObject(fieldValue)) {
                    obj[item['value']] = fieldValue._toJSON();
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
    Model.prototype._createItem = function (value, item) {
        var _this = this;
        var newValue = value[item['value']];
        if (item['type']) {
            if (Array.isArray(newValue)) {
                this[item['key']] = newValue.map(function (x) { return _this._createObject(item, x); });
            }
            else if (this._isObject(newValue)) {
                this[item['key']] = this._createObject(item, newValue);
            }
        }
        else {
            this[item['key']] = value[item['value']];
        }
    };
    return Model;
}(static_model_1.StaticModel));
exports.Model = Model;
/**
 * @deprecated Use the `AppModel` instead. Will be remove in version 1.0.0
 */
exports.ApplicationModel = Model;
/**
 * @deprecated Use the `AppModel` instead. Will be remove in version 1.0.0
 */
exports.AppModel = Model;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StaticModel = /** @class */ (function () {
    function StaticModel() {
    }
    /**
     * Creates an instance of pass model class with data
     *
     * @param data - json data of model
     * @param {Type<T extends Model>} model - model class to instance
     * @returns {T} - an instance of new model
     */
    StaticModel.new = function (model, data) {
        var instance = new model();
        instance._fromJSON(data);
        return instance;
    };
    /**
     * Creates an instances collection of pass model class with data array
     *
     * @param data[] - array of json data of model
     * @param {Type<T extends Model>} model - model class to instance
     * @returns {T} - an instance of new model
     */
    StaticModel.newCollection = function (model, data) {
        return data.map(function (x) {
            var instance = new model();
            instance._fromJSON(x);
            return instance;
        });
    };
    return StaticModel;
}());
exports.StaticModel = StaticModel;


/***/ })
/******/ ]);
});