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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_index__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__items_Doll__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__items_Paw__ = __webpack_require__(12);



const canvasId = 'canvas';
const body = document.body;
const { requestAnimationFrame: animate } = window;


class Controller {
    constructor() {
        this.btn = document.getElementById('pause_btn');
        this.dolls = [];
        this.dom = document.getElementsByTagName('canvas')[0];
        this.ctx = this.dom.getContext('2d');
        this.paused = false;
        this.init();
    }
    init() {
        this.setSize();
        this.addPaw();
        this.loop();
        this.bind();
    }
    addDolls() {
        const last = __WEBPACK_IMPORTED_MODULE_3__items_Doll__["a" /* Doll */].lastItem(__WEBPACK_IMPORTED_MODULE_3__items_Doll__["a" /* Doll */])();
        if (!last || last && last.progress >= 0.2) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__service_index__["a" /* getDollType */])().then(type => {
                const doll = new __WEBPACK_IMPORTED_MODULE_3__items_Doll__["a" /* Doll */](this.ctx, void 0, {
                    width: 50,
                    height: 50
                }, this.size, type.src, type);
                const { width: x, height: y } = this.size;
                doll.setPath([{ x, y: y - 50 }, { x: -50, y: y - 50 }]);
                __WEBPACK_IMPORTED_MODULE_3__items_Doll__["a" /* Doll */].addItem(__WEBPACK_IMPORTED_MODULE_3__items_Doll__["a" /* Doll */])(doll);
                this.dolls = __WEBPACK_IMPORTED_MODULE_3__items_Doll__["a" /* Doll */].items;
            });
        }
    }
    addPaw() {
        const x = this.size.width / 2;
        this.paw = new __WEBPACK_IMPORTED_MODULE_4__items_Paw__["a" /* Paw */](this.ctx, 'paw', { width: 50, height: 50 }, { x, y: 0 }, [{ x, y: 0 }, { x: x, y: this.size.height - 50 }, { x, y: 0 }]);
    }
    setSize() {
        const { clientHeight: height, clientWidth: width } = body;
        this.dom.setAttribute('width', width + '');
        this.dom.setAttribute('height', height + '');
        this.size = { width, height };
    }
    bind() {
        this.dom.addEventListener('click', e => {
            // this.paused ? this.continueAnimation() : this.pause();
            this.paw.catchToy();
        });
        this.btn.onclick = () => {
            this.paused ? this.continueAnimation() : this.pause();
        };
        this.paw.onTouchBottom(position => {
            console.log(position);
            this.checkIfCached(position);
        });
        window.addEventListener('resize', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash__["throttle"])(this.setSize.bind(this), 100));
        __WEBPACK_IMPORTED_MODULE_1__components_modal__["a" /* Modal */].onHide(this.continueAnimation.bind(this));
    }
    checkIfCached({ x: _x, y: _y }) {
        let index = 0,
            i = 0;
        const len = this.dolls.length;
        for (; i < len; i++) {
            let { x, y } = this.dolls[i].position;
            x += 25;
            y -= 25;
            const dir = Math.sqrt(Math.pow(x - _x, 2) + Math.pow(y - _y, 2));
            console.log(dir);
            if (dir < 20) {
                this.pause();
                const { type, id } = this.dolls[i];
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__service_index__["b" /* checkShallPay */])(type).then(allow => {
                    if (allow) {
                        alert(`恭喜成功夹走${JSON.stringify(type)}`);
                        __WEBPACK_IMPORTED_MODULE_3__items_Doll__["a" /* Doll */].removeItem(__WEBPACK_IMPORTED_MODULE_3__items_Doll__["a" /* Doll */])(id);
                    }
                });
                break;
            }
        }
    }
    loop() {
        animate(this.doAnimation.bind(this));
    }
    doAnimation() {
        if (!this.paused) {
            this.ctx.clearRect(0, 0, this.size.width * 5, this.size.height * 5);
            this.paw.move();
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

let ids = 1;
class Item {
    constructor(ctx, id = ++ids, initialPosition) {
        this.totalFrames = 0;
        this.ctx = ctx;
        this.id = id;
        this.frames = [];
        this.initialPosition = initialPosition;
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
    generatePath(path) {
        const paths = path.map((p, i) => [p, path[i + 1]]).slice(0, -1);
        const frameMovedDistanceArr = paths.map(([a, b]) => {
            return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
        }, []);
        const frameMovedDistance = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash__["sum"])(frameMovedDistanceArr);
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
        this.logFrames();
    }
    logFrames() {}
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

let requestedImages = {};
class Doll extends __WEBPACK_IMPORTED_MODULE_0__Item__["a" /* Item */] {
    constructor(ctx, id, size, initialPosition, imgSrc = "/", type) {
        super(ctx, id, initialPosition);
        this.speed = { x: 1, y: 0 };
        this.imgSrc = "/";
        this.img = null;
        this.type = null;
        this.size = size;
        this.imgSrc = imgSrc;
        this.type = type;
        this.loadImg(imgSrc);
        this.time = 5000;
    }
    get position() {
        return this.frames[0];
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
    draw(frame) {
        if (frame) {
            this.ctx.save();
            this.img && this.ctx.drawImage(this.img, frame.x, frame.y, this.size.width, this.size.height);
            this.ctx.restore();
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

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by wangchunqi on 2017/3/31.
 */
const toyTypes = Array.from([1, 2, 3, 4], n => ({
    id: n + '',
    src: `./images/${n}.jpeg`,
    name: `娃娃-${n}`,
    price: n
}));
/* unused harmony export toyTypes */

const getDollType = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rand = Math.random();
            const index = rand < 0.1 ? 0 : rand < 0.3 ? 1 : rand < 0.8 ? 2 : 3;
            resolve(toyTypes[index]);
        }, 10);
    });
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getDollType;

let maxNum = 5;
let items = [];
const checkShallPay = type => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (items.length < maxNum) {
                items.push(type);
                resolve(true);
            } else {
                alert(`您一共获得了${items.map(i => JSON.stringify(i)).join('、')}个奖品，已经达到${maxNum}上限了，继续充钱再玩吧~`);
                resolve(false);
            }
        }, 10);
    });
};
/* harmony export (immutable) */ __webpack_exports__["b"] = checkShallPay;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item__ = __webpack_require__(2);

let requestedImages = {};
const size = 50;
class Paw extends __WEBPACK_IMPORTED_MODULE_0__Item__["a" /* Item */] {
    constructor(ctx, id, size, initialPosition, _path) {
        super(ctx, id, initialPosition);
        this.speed = { x: 1, y: 0 };
        this.img = null;
        this.type = null;
        this.frames = [];
        this.totalFrames = 0;
        this.onTouchBottomFunc = () => {};
        this.size = size;
        this.state = { moving: false };
        this.time = 2000;
        this.path = _path;
    }
    get progress() {
        return 1 - this.frames.length / this.totalFrames;
    }
    draw(bottom) {
        if (bottom) {
            // const x =
            const TOP_CENTER = this.initialPosition;
            const { width, height } = this.size;
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.moveTo(TOP_CENTER.x, 0);
            this.ctx.lineWidth = width / 2;
            this.ctx.strokeStyle = '#f00';
            this.ctx.lineTo(bottom.x, bottom.y);
            // this.ctx.rect(TOP_CENTER.x - width/2, 0, bottom.x + width/2, bottom.y);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
            // console.log('y', JSON.stringify(bottom), JSON.stringify(TOP_CENTER));
            // this.ctx.fill();
        }
    }
    logFrames() {
        console.log(JSON.stringify(this.frames.map(x => x.y)));
    }
    move() {
        const { moving } = this.state;
        if (moving) {
            const next = this.frames.shift();
            this.draw(next);
            if (this.frames.length == 0) {
                // Paw.removeItem(Paw)(this.id);
                // Item.removeItem(this.id);
                this.state.moving = false;
                this.frames = [];
                this.totalFrames = 0;
            } else {
                if (this.frames.length == this.totalFrames / 2 || this.frames.length == (this.totalFrames + 1) / 2) {
                    this.onTouchBottomFunc(next);
                }
            }
        } else {
            // Item.removeItem(this.id);
        }
    }
    catchToy() {
        if (this.frames.length == 0) {
            this.setPath(this.path);
        }
    }
    onTouchBottom(func) {
        this.onTouchBottomFunc = func;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Paw;

Paw.items = [];

/***/ })
/******/ ]);