/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

eval("/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require(\"B:\\\\Development-B\\\\Roz\\\\node_modules\\\\react-hot-api\\\\modules\\\\index.js\"), RootInstanceProvider = require(\"B:\\\\Development-B\\\\Roz\\\\node_modules\\\\react-hot-loader\\\\RootInstanceProvider.js\"), ReactMount = require(\"react-dom/lib/ReactMount\"), React = require(\"react\"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n'use strict';\n\n// using native websockets in the browser\nconsole.log('window.location.href', window.location.href);\nvar ws = new WebSocket('ws://' + window.location.hostname + ':5678');\n\nws.addEventListener('open', function (evt) {\n    console.log('open evt', evt);\n    ws.send('Hello Server');\n});\n\nws.addEventListener('message', function (evt) {\n    console.log('message from server:', evt.data);\n    ws.send('send it back! ' + evt.data);\n\n    var el = document.createElement('div');\n    el.className = 'node';\n    el.innerHTML = '<p>' + evt.data + '</p>';\n    document.body.appendChild(el);\n});\n\nconsole.log('websocket', ws);\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require(\"B:\\\\Development-B\\\\Roz\\\\node_modules\\\\react-hot-loader\\\\makeExportsHot.js\"); if (makeExportsHot(module, require(\"react\"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot apply hot update to \" + \"index.js\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9pbmRleC5qcz9lYWI0Il0sInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyB1c2luZyBuYXRpdmUgd2Vic29ja2V0cyBpbiB0aGUgYnJvd3NlclxyXG5jb25zb2xlLmxvZygnd2luZG93LmxvY2F0aW9uLmhyZWYnLCB3aW5kb3cubG9jYXRpb24uaHJlZilcclxudmFyIHdzID0gbmV3IFdlYlNvY2tldChgd3M6Ly8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZX06NTY3OGApO1xyXG5cclxud3MuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIGV2dCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnb3BlbiBldnQnLCBldnQpO1xyXG4gICAgd3Muc2VuZCgnSGVsbG8gU2VydmVyJyk7XHJcbn0pO1xyXG5cclxud3MuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGV2dCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnbWVzc2FnZSBmcm9tIHNlcnZlcjonLCBldnQuZGF0YSk7XHJcbiAgICB3cy5zZW5kKGBzZW5kIGl0IGJhY2shICR7ZXZ0LmRhdGF9YClcclxuXHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZWwuY2xhc3NOYW1lID0gJ25vZGUnO1xyXG4gICAgZWwuaW5uZXJIVE1MID0gYDxwPiR7ZXZ0LmRhdGF9PC9wPmA7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKVxyXG59KVxyXG5cclxuXHJcbmNvbnNvbGUubG9nKCd3ZWJzb2NrZXQnLCB3cylcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2luZGV4LmpzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);