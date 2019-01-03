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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node/decryption.js":
/*!****************************!*\
  !*** ./node/decryption.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Node Lambda to call Ruby Lambda
var aws = __webpack_require__(/*! aws-sdk */ "aws-sdk");
var _ = __webpack_require__(/*! lodash */ "lodash");

module.exports.decryption = function (event, context, callback) {

  var emLicenseDecrypt = 'ae/ci2iRkRubT0+k/GwzU2kr5+6b/2htcA0Ww5RMmlO9LqSqYTV+2mW+3C4ylwNb9Bv1oBdYCz3f8qRc9NWFsY2Fn8wNGQncW7Pq53MrihRufZT7LDAYsni5rfHQp1gV+a/23aa+My8SzmXXut3I28auewbAD8mbxYfTAd+hnFLFeRVnIkkGUIUoGUlJypBf6LJPwceBRsPBSM0ATaIJ8YvW2SXkP1SjkwQL2fHn6S8=';

  var decryptPayload = { to_decrypt: '' + emLicenseDecrypt };

  var lambda = new aws.Lambda({
    region: 'us-west-2'
  });

  var params = {
    FunctionName: "nodeRubyLambdas-dev-rubyEncryption",
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: (0, _stringify2.default)(decryptPayload)
  };

  // Invoke the Ruby Lambda to decrypt some data
  console.log("Decrypting data");

  var decrypted = function decrypted() {
    return lambda.invoke(params, function (err, data) {
      if (err) {
        console.log("decrypt failure");
        console.log(err, err.stack);
      } else {
        console.log("decrypt success");
        console.log(data);
        var unencrypted = JSON.parse(data.Payload);
        console.log("unencrypted: ", unencrypted);
        return unencrypted;
      }
    });
  };

  var testdependency = _.join(['Hello', 'webpack'], ' ');
  console.log(testdependency);
};

/***/ }),

/***/ "./node/encryption.js":
/*!****************************!*\
  !*** ./node/encryption.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Node Lambda to call Ruby Lambda
var aws = __webpack_require__(/*! aws-sdk */ "aws-sdk");

module.exports.encryption = function (event, context, callback) {

  var emLicenseEncrypt = {
    id: 45,
    sn: 12345,
    host_id: '3a:00:a8:40:42:00',
    type: 'eM',
    start_date: new Date(),
    end_date: new Date(2022, 2, 5, 8),
    connections: 1
  };

  var encryptPayload = { to_encrypt: emLicenseEncrypt };

  var lambda = new aws.Lambda({
    region: 'us-west-2'
  });

  var params = {
    FunctionName: "nodeRubyLambdas-dev-rubyEncryption",
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: (0, _stringify2.default)(encryptPayload)
  };

  // Invoke the Ruby Lambda to encrypt some data
  console.log("Encrypting data");

  var encrypted = lambda.invoke(params, function (err, data) {
    if (err) {
      console.log("Encrypt Failure");
      console.log(err, err.stack);
    } else {
      console.log("Encrypt Success");
      var encrypted = JSON.parse(data.Payload);
      console.log(encrypted);
      return encrypted;
    }
  });
};

/***/ }),

/***/ "./node/handler.js":
/*!*************************!*\
  !*** ./node/handler.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

__webpack_require__(/*! source-map-support/register */ "source-map-support/register");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Node Lambda to call Ruby Lambda
var aws = __webpack_require__(/*! aws-sdk */ "aws-sdk");

module.exports.main = function (event, context, callback) {
  // to access event variables:
  // event.variable_name

  var emLicenseEncrypt = {
    id: 45,
    sn: 12345,
    host_id: '3a:00:a8:40:42:00',
    type: 'eM',
    start_date: new Date(),
    end_date: new Date(2022, 2, 5, 8),
    connections: 1
  };

  var emLicenseDecrypt = 'ae/ci2iRkRubT0+k/GwzU2kr5+6b/2htcA0Ww5RMmlO9LqSqYTV+2mW+3C4ylwNb9Bv1oBdYCz3f8qRc9NWFsY2Fn8wNGQncW7Pq53MrihRufZT7LDAYsni5rfHQp1gV+a/23aa+My8SzmXXut3I28auewbAD8mbxYfTAd+hnFLFeRVnIkkGUIUoGUlJypBf6LJPwceBRsPBSM0ATaIJ8YvW2SXkP1SjkwQL2fHn6S8=';

  var encryptPayload = { to_encrypt: emLicenseEncrypt };
  var decryptPayload = { to_decrypt: '' + emLicenseDecrypt };

  var lambda = new aws.Lambda({
    region: 'us-west-2'
  });

  var params = {
    FunctionName: "nodeRubyLambdas-dev-rubyEncryption",
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: (0, _stringify2.default)(encryptPayload)
  };

  // Invoke the Ruby Lambda to encrypt some data
  console.log("Encrypting data");

  var encrypted = lambda.invoke(params, function (err, data) {
    if (err) {
      console.log("Encrypt Failure");
      console.log(err, err.stack);
    } else {
      console.log("Encrypt Success");
      var encrypted = JSON.parse(data.Payload);
      console.log(encrypted);
      return encrypted;
    }
  });

  // // To see decryption: uncomment this section and comment out Lines 36 - 48
  //
  // // Invoke the Ruby Lambda to decrypt some data
  // console.log("Decrypting data");
  //
  // params.Payload = JSON.stringify(decryptPayload);
  //
  // var decrypted = lambda.invoke(params, function(err, data){
  //   if(err){
  //     console.log("decrypt failure");
  //     console.log(err,err.stack);
  //   } else {
  //     console.log("decrypt success");
  //     console.log(data);
  //     var unencrypted = JSON.parse(data.Payload);
  //     console.log("unencrypted: ", unencrypted);
  //     return unencrypted;
  //   }
  // });
};

/***/ }),

/***/ 0:
/*!****************************************************************!*\
  !*** multi ./node/decryption ./node/encryption ./node/handler ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node/decryption */"./node/decryption.js");
__webpack_require__(/*! ./node/encryption */"./node/encryption.js");
module.exports = __webpack_require__(/*! ./node/handler */"./node/handler.js");


/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map