/**
 * Created by wcq on 2017/3/30.
 */
import {Point} from './basic/Point';
import {Item} from "./Item";
import {throttle} from 'lodash';
import {Modal} from './components/modal';
import {Rect} from './basic/Rect';
import {getDollType, toyType,checkShallPay} from './service/index';
const canvasId = 'canvas';
const body: HTMLElement = document.body;
const {requestAnimationFrame: animate} = window;
import {Doll} from './items/Doll'
import {Paw} from './items/Paw'
import {type} from "os";

export class Controller {
    private dom: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private btn: HTMLElement = document.getElementById('pause_btn');
    private size: Rect;
    private paused: boolean;
    private dolls: Doll[] = [];
    private paw: Paw;



    constructor() {
        this.dom = document.getElementsByTagName('canvas')[0];
        this.ctx = this.dom.getContext('2d');
        this.paused = false;
        this.init();
    }

    init(): void {
        this.setSize();
        this.addPaw();
        this.loop();
        this.bind();

    }

    addDolls() {
        const last = Doll.lastItem(Doll)();
        if (!last || (last && last.progress >= 0.2)) {
            getDollType().then((type: toyType) => {
                const doll = new Doll(this.ctx, void 0, {
                    width: 50,
                    height: 50
                }, this.size, type.src, type);
                const {width: x, height: y} = this.size;
                doll.setPath([{x, y: y - 50}, {x: -50, y: y - 50}]);
                Doll.addItem(Doll)(doll);
                this.dolls = Doll.items;
            });

        }
    }

    addPaw() {
        const x = this.size.width / 2;

        this.paw = new Paw(this.ctx,
            'paw',
            {width: 50, height: 50},
            {x, y: 0},
            [{x, y: 0}, {x: x, y: this.size.height - 50}, {x, y: 0}]
        );


    }

    setSize(): void {
        const {clientHeight: height, clientWidth: width} = body;
        this.dom.setAttribute('width', width + '');
        this.dom.setAttribute('height', height + '');
        this.size = {width, height};
    }

    bind(): void {
        this.dom.addEventListener('click', (e) => {
            // this.paused ? this.continueAnimation() : this.pause();
            this.paw.catchToy();
        });
        this.btn.onclick = () => {
            this.paused ? this.continueAnimation() : this.pause();
        };
        this.paw.onTouchBottom((position) => {
            console.log(position);
            this.checkIfCached(position);
        });
        window.addEventListener('resize', throttle(this.setSize.bind(this), 100));
        Modal.onHide(this.continueAnimation.bind(this));
    }

    checkIfCached({x:_x,y:_y}) {
        let index = 0, i = 0;
        const len = this.dolls.length;
        for (; i < len; i++) {
            let {x,y} = this.dolls[i].position;
            x+=25;y-=25;
            const dir = Math.sqrt( Math.pow(x-_x,2) + Math.pow(y-_y,2));
            console.log(dir);
            if(dir < 20){
                this.pause();
                const {type,id} = this.dolls[i];
                checkShallPay(type).then((allow)=>{
                    if(allow){
                        alert(`恭喜成功夹走${JSON.stringify(type)}`);
                        Doll.removeItem(Doll)(id);
                    }
                });

                break;
            }
        }
    }

    loop(): void {
        animate(this.doAnimation.bind(this));
    }

    doAnimation(): void {
        if (!this.paused) {
            this.ctx.clearRect(0, 0, this.size.width * 5, this.size.height * 5);
            this.paw.move();
            this.dolls.forEach((d: Doll) => {
                d.move();
            });
            this.addDolls();
            this.loop();
        }
    }

    pause(): void {
        this.paused = true;
        Modal.show();
    }

    continueAnimation(): void {
        this.paused = false;
        Modal.hide();
        this.loop();
    }

}