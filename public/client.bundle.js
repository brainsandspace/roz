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

eval("/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require(\"B:\\\\Development-B\\\\Roz\\\\node_modules\\\\react-hot-api\\\\modules\\\\index.js\"), RootInstanceProvider = require(\"B:\\\\Development-B\\\\Roz\\\\node_modules\\\\react-hot-loader\\\\RootInstanceProvider.js\"), ReactMount = require(\"react-dom/lib/ReactMount\"), React = require(\"react\"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n'use strict';\n\n// using native websockets in the browser\nvar ws = new WebSocket('ws://' + window.location.hostname + ':5678');\n\nws.addEventListener('open', function (evt) {\n    console.log('open evt', evt);\n    ws.send('Hello Server');\n});\n\nws.addEventListener('message', function (evt) {\n    console.log('message from server:', evt.data);\n    ws.send('send it back! ' + evt.data);\n\n    var el = document.createElement('div');\n    el.className = 'node';\n    el.innerHTML = '<p>' + evt.data + '</p>';\n    document.body.appendChild(el);\n});\n\nconsole.log('websocket', ws);\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require(\"B:\\\\Development-B\\\\Roz\\\\node_modules\\\\react-hot-loader\\\\makeExportsHot.js\"); if (makeExportsHot(module, require(\"react\"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot apply hot update to \" + \"index.js\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NsaWVudC9pbmRleC5qcz9lYWI0Il0sInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyB1c2luZyBuYXRpdmUgd2Vic29ja2V0cyBpbiB0aGUgYnJvd3NlclxyXG52YXIgd3MgPSBuZXcgV2ViU29ja2V0KGB3czovLyR7d2luZG93LmxvY2F0aW9uLmhvc3RuYW1lfTo1Njc4YCk7XHJcblxyXG53cy5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgZXZ0ID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdvcGVuIGV2dCcsIGV2dCk7XHJcbiAgICB3cy5zZW5kKCdIZWxsbyBTZXJ2ZXInKTtcclxufSk7XHJcblxyXG53cy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZXZ0ID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdtZXNzYWdlIGZyb20gc2VydmVyOicsIGV2dC5kYXRhKTtcclxuICAgIHdzLnNlbmQoYHNlbmQgaXQgYmFjayEgJHtldnQuZGF0YX1gKVxyXG5cclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBlbC5jbGFzc05hbWUgPSAnbm9kZSc7XHJcbiAgICBlbC5pbm5lckhUTUwgPSBgPHA+JHtldnQuZGF0YX08L3A+YDtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpXHJcbn0pXHJcblxyXG5cclxuY29uc29sZS5sb2coJ3dlYnNvY2tldCcsIHdzKVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvaW5kZXguanMiXSwibWFwcGluZ3MiOiI7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);