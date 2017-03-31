import { throttle } from 'lodash';
import { Modal } from './components/modal';
const canvasId = 'canvas';
const body = document.body;
const { requestAnimationFrame: animate } = window;
import { Doll } from './items/Doll';
export class Controller {
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
        const last = Doll.lastItem(Doll)();
        if (!last || (last && last.progress >= 0.2)) {
            const doll = new Doll(this.ctx, void 0, {
                width: 50,
                height: 50
            }, this.size, "./images/7078609.jpeg");
            const { width: x, height: y } = this.size;
            doll.setPath([{ x, y: y - 50 }, { x: -50, y: y - 50 }]);
            Doll.addItem(Doll)(doll);
            this.dolls = Doll.items;
        }
    }
    setSize() {
        const { clientHeight: height, clientWidth: width } = body;
        this.dom.setAttribute('width', width + '');
        this.dom.setAttribute('height', height + '');
        this.size = { width, height };
    }
    bind() {
        this.dom.addEventListener('click', (e) => {
            this.paused ? this.continueAnimation() : this.pause();
        });
        window.addEventListener('resize', throttle(this.setSize.bind(this), 100));
        Modal.onHide(this.continueAnimation.bind(this));
    }
    loop() {
        animate(this.doAnimation.bind(this));
    }
    doAnimation() {
        if (!this.paused) {
            this.ctx.clearRect(0, 0, this.size.width, this.size.height);
            // console.log('move');
            this.dolls.forEach((d) => {
                d.move();
            });
            this.addDolls();
            this.loop();
        }
    }
    pause() {
        this.paused = true;
        Modal.show();
    }
    continueAnimation() {
        this.paused = false;
        Modal.hide();
        this.loop();
    }
}
