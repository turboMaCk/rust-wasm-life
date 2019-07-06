(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/wasm_life.js":
/*!***************************!*\
  !*** ../pkg/wasm_life.js ***!
  \***************************/
/*! exports provided: Universe, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Universe\", function() { return Universe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _wasm_life_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_life_bg */ \"../pkg/wasm_life_bg.wasm\");\n\n\nlet cachedTextDecoder = new TextDecoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _wasm_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_wasm_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n/**\n*/\nclass Universe {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Universe.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        _wasm_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_universe_free\"](ptr);\n    }\n    /**\n    * @param {number} width\n    * @param {number} height\n    * @returns {Universe}\n    */\n    static new(width, height) {\n        return Universe.__wrap(_wasm_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_new\"](width, height));\n    }\n    /**\n    * @returns {void}\n    */\n    tick() {\n        return _wasm_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_tick\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    cells() {\n        return _wasm_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_cells\"](this.ptr);\n    }\n}\n\nconst __wbindgen_throw = function(arg0, arg1) {\n    let varg0 = getStringFromWasm(arg0, arg1);\n    throw new Error(varg0);\n};\n\n\n\n//# sourceURL=webpack:///../pkg/wasm_life.js?");

/***/ }),

/***/ "../pkg/wasm_life_bg.wasm":
/*!********************************!*\
  !*** ../pkg/wasm_life_bg.wasm ***!
  \********************************/
/*! exports provided: memory, __wbg_universe_free, universe_new, universe_tick, universe_cells */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./wasm_life.js */ \"../pkg/wasm_life.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/wasm_life_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_life_wasm_life_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-life/wasm_life_bg */ \"../pkg/wasm_life_bg.wasm\");\n/* harmony import */ var wasm_life__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wasm-life */ \"../pkg/wasm_life.js\");\n\n\n\nconst CELL_SIZE = 5;\nconst GRID_COLOR = \"#cccccc\";\nconst DEAD_COLOR = \"#FFFFFF\";\nconst ALIVE_COLOR = \"#000000\";\n\nconst width = Math.floor(window.innerWidth / (CELL_SIZE + 1)) - 1;\nconst height = Math.floor(window.innerHeight / (CELL_SIZE + 1)) - 1;\nconst universe = wasm_life__WEBPACK_IMPORTED_MODULE_1__[\"Universe\"].new(width, height);\n\nconst canvas = document.getElementById(\"game-of-life-canvas\");\ncanvas.height = (CELL_SIZE + 1) * height + 1;\ncanvas.width = (CELL_SIZE + 1) * width + 1;\n\nconst ctx = canvas.getContext('2d');\n\nconst drawGrid = () => {\n    ctx.beginPath();\n    ctx.strokeStyle = GRID_COLOR;\n\n    // Vertical lines\n    for (let i = 0; i <= width; i++) {\n        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);\n        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);\n    }\n\n    // Horizontal lines\n    for (let j = 0; j <= height; j++) {\n        ctx.moveTo(0, j* (CELL_SIZE + 1) + 1);\n        ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);\n    }\n\n    ctx.stroke();\n}\n\nconst getIndex = (row, column) => {\n    return row * width + column;\n}\n\nconst bitIsSet = (n, arr) => {\n    const byte = Math.floor(n / 8);\n    const mask = 1 << (n % 8);\n    return (arr[byte] &mask) == mask;\n}\n\nconst drawCells = () => {\n    const cellsPrt = universe.cells();\n    const cells = new Uint8Array(wasm_life_wasm_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer, cellsPrt, width * height / 8);\n\n    ctx.beginPath();\n\n    for (let row = 0; row < height; row++) {\n        for (let col = 0; col < width; col++) {\n            const idx = getIndex(row, col);\n\n            ctx.fillStyle = bitIsSet(idx, cells)\n                ? ALIVE_COLOR\n                : DEAD_COLOR\n\n            ctx.fillRect(\n                col * (CELL_SIZE + 1) + 1,\n                row * (CELL_SIZE + 1) + 1,\n                CELL_SIZE,\n                CELL_SIZE\n            );\n        }\n    }\n\n    ctx.stroke();\n}\n\nconst renderLoop = () => {\n    drawGrid();\n    drawCells();\n    universe.tick();\n    requestAnimationFrame(renderLoop);\n}\n\nrequestAnimationFrame(renderLoop);\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);