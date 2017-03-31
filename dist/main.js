/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_modal__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__items_Doll__ = __webpack_require__(5);


const canvasId = 'canvas';
const body = document.body;
const { requestAnimationFrame: animate } = window;

class Controller {
    constructor() {
        this.dolls = [];
        this.dom = document.getElementsByTagName('canvas')[0];
        this.ctx = this.dom.getContext('2d');
        this.paused = false;
        this.init();
    }
    init() {
        this.setSize();
        this.bind();
        this.loop();
    }
    addDolls() {
        const last = __WEBPACK_IMPORTED_MODULE_2__items_Doll__["a" /* Doll */].lastItem(__WEBPACK_IMPORTED_MODULE_2__items_Doll__["a" /* Doll */])();
        if (!last || last && last.progress >= 0.2) {
            const doll = new __WEBPACK_IMPORTED_MODULE_2__items_Doll__["a" /* Doll */](this.ctx, void 0, {
                width: 50,
                height: 50
            }, this.size, "./images/7078609.jpeg");
            const { width: x, height: y } = this.size;
            doll.setPath([{ x, y: y - 50 }, { x: -50, y: y - 50 }]);
            __WEBPACK_IMPORTED_MODULE_2__items_Doll__["a" /* Doll */].addItem(__WEBPACK_IMPORTED_MODULE_2__items_Doll__["a" /* Doll */])(doll);
            this.dolls = __WEBPACK_IMPORTED_MODULE_2__items_Doll__["a" /* Doll */].items;
        }
    }
    setSize() {
        const { clientHeight: height, clientWidth: width } = body;
        this.dom.setAttribute('width', width + '');
        this.dom.setAttribute('height', height + '');
        this.size = { width, height };
    }
    bind() {
        this.dom.addEventListener('click', e => {
            this.paused ? this.continueAnimation() : this.pause();
        });
        window.addEventListener('resize', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash__["throttle"])(this.setSize.bind(this), 100));
        __WEBPACK_IMPORTED_MODULE_1__components_modal__["a" /* Modal */].onHide(this.continueAnimation.bind(this));
    }
    loop() {
        animate(this.doAnimation.bind(this));
    }
    doAnimation() {
        if (!this.paused) {
            this.ctx.clearRect(0, 0, this.size.width, this.size.height);
            // console.log('move');
            this.dolls.forEach(d => {
                d.move();
            });
            this.addDolls();
            this.loop();
        }
    }
    pause() {
        this.paused = true;
        __WEBPACK_IMPORTED_MODULE_1__components_modal__["a" /* Modal */].show();
    }
    continueAnimation() {
        this.paused = false;
        __WEBPACK_IMPORTED_MODULE_1__components_modal__["a" /* Modal */].hide();
        this.loop();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controller;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let ids = 1;
class Item {
    constructor(ctx, id = ++ids, initialPosition) {
        this.ctx = ctx;
        this.id = id;
        this.frames = [];
        this.state = {
            moving: false
        };
    }
    static pause(id) {}

    static pauseAll() {}

    init() {}
    setPath(path = []) {
        this.generatePath(path);
        this.state.moving = true;
    }
    generatePath(path) {}
    move() {
        if (this.state.moving) {
            const next = this.frames.shift();
            this.draw(next);
            if (this.frames.length == 0) {
                Item.removeItem(Item)(this.id);
                // Item.removeItem(this.id);
                this.state.moving = false;
            }
        } else {
            // Item.removeItem(this.id);
        }
    }
    draw(frame) {}
    pause() {}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Item;

Item.addItem = Item => item => {
    // console.log(Item);
    Item.items.push(item);
    let len = Item.items.length;
    Item.itemsIds[item.id] = len - 1;
};
Item.removeItem = Item => id => {
    const pos = Item.itemsIds[id];
    Item.items.splice(pos, 1);
    Item.items.forEach(({ id }, i) => {
        Item.itemsIds[id] = i;
    });
    delete Item.itemsIds[id];
    console.info('remove', id, pos);
};
Item.lastItem = Item => () => {
    if (Item.items && Item.items.length > 0) {
        return Item.items[Item.items.length - 1];
    } else {
        return null;
    }
};
Item.items = [];
Item.itemsIds = {};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_pauseModal__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_modal_styl__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_modal_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_modal_styl__);


class Modal {
    constructor() {
        this.dom = this.init();
        Modal.instance = this;
        this.bind();
    }
    init() {
        const div = document.createElement('div');
        div.innerHTML = __WEBPACK_IMPORTED_MODULE_0__templates_pauseModal__["a" /* modalTemplate */];
        document.body.appendChild(div);
        return div;
    }
    bind() {
        const [yesButton, NoButton] = Array.prototype.slice.call(this.dom.getElementsByTagName('button'));
        yesButton.addEventListener('click', Modal.hide);
        NoButton.addEventListener('click', Modal.hide);
    }
    show() {
        this.dom.style.display = "block";
        Modal.showing = true;
    }
    hide() {
        this.dom.style.display = "none";
        Modal.showing = false;
    }
    static show(next) {
        if (!Modal.showing) {
            const ins = Modal.instance;
            if (ins) {
                ins.show();
            } else {
                Modal.instance = new Modal();
            }
            Modal.showing = true;
            // Modal.onHideFunction();
        }
    }
    static hide() {
        if (Modal.showing) {
            const ins = Modal.instance;
            if (ins) {
                ins.hide();
            } else {
                Modal.instance = new Modal();
                Modal.instance.hide();
            }
            Modal.showing = false;
            Modal.onHideFunction();
        }
    }
    static onHide(func) {
        Modal.onHideFunction = func;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Modal;

Modal.showing = false;
Modal.instance = null;
Modal.onShowFunction = () => {};
Modal.onHideFunction = () => {};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Controller__ = __webpack_require__(1);
/**
 * Created by wcq on 2017/3/30.
 */

const mmmm = new __WEBPACK_IMPORTED_MODULE_0__Controller__["a" /* Controller */]();
/* harmony export (immutable) */ __webpack_exports__["mmmm"] = mmmm;

// debugger;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);


let requestedImages = {};
class Doll extends __WEBPACK_IMPORTED_MODULE_0__Item__["a" /* Item */] {
    constructor(ctx, id, size, initialPosition, imgSrc = "/") {
        super(ctx, id, initialPosition);
        this.speed = { x: 1, y: 0 };
        this.time = 6000;
        this.imgSrc = "/";
        this.img = null;
        this.frames = [];
        this.totalFrames = 0;
        this.size = size;
        this.imgSrc = imgSrc;
        this.loadImg(imgSrc);
    }
    get progress() {
        return 1 - this.frames.length / this.totalFrames;
    }
    loadImg(src) {
        if (!(src in requestedImages)) {
            requestedImages[src] = null;
            let img = new Image();
            img.onload = () => {
                Doll.images[src] = img;
                this.img = img;
            };
            img.src = src;
        } else {
            this.img = Doll.images[src];
        }
    }
    generatePath(path) {
        // console.log(path);
        const paths = path.map((p, i) => [p, path[i + 1]]).slice(0, -1);
        const frameMovedDistanceArr = paths.map(([a, b]) => {
            return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
        }, []);
        const frameMovedDistance = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lodash__["sum"])(frameMovedDistanceArr);
        const frameNumber = Math.ceil(this.time / 16);
        this.totalFrames = frameNumber;
        this.frames = paths.reduce((ret, p, i) => {
            const [pre, next] = p;
            const frameCurNumber = Math.ceil(frameNumber * (frameMovedDistanceArr[i] / frameMovedDistance));
            let j = 0;
            const dX = (next.x - pre.x) / frameCurNumber,
                  dY = (next.y - pre.y) / frameCurNumber;
            let len = ret.length;
            do {
                ret[len + j] = { x: pre.x + dX * j, y: pre.y + dY * j };
            } while (++j < frameCurNumber);
            return ret;
        }, []);
        // console.log(this.frames.map(({x}: { x, y }): number => x).join(','));
    }
    timeTo() {}
    draw(frame) {
        if (frame) {
            this.img && this.ctx.drawImage(this.img, frame.x, frame.y, this.size.width, this.size.height);
        }
    }
    move() {
        if (this.state.moving) {
            const next = this.frames.shift();
            this.draw(next);
            if (this.frames.length == 0) {
                Doll.removeItem(Doll)(this.id);
                // Item.removeItem(this.id);
                this.state.moving = false;
                this.frames = [];
                this.totalFrames = 0;
            }
        } else {
            // Item.removeItem(this.id);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Doll;

Doll.images = {};
Doll.items = [];

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const modalTemplate = `
<div  class="g-pause-modal" id ="pause_modal">
    <div>
        继续游戏？
    </div>
    <span>
        <button class="yes-button">确认</button>
    </span>
    <span>
        <button class="no-button">取消</button>
    </span>
</div>
`;
/* harmony export (immutable) */ __webpack_exports__["a"] = modalTemplate;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);