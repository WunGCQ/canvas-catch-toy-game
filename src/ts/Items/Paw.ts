/**
 * Created by wangchunqi on 2017/3/31.
 */
import {Point} from '../basic/index'
import {Item} from '../Item';
import {Rect} from "../basic/Rect";

import {toyType} from '../service/index';

let requestedImages = {};

const size = 50;

export class Paw extends Item {
    private speed: Point = {x: 1, y: 0};
    private size: Rect;
    private img: HTMLImageElement = null;
    public type: toyType = null;
    frames: Point[] = [];
    protected totalFrames: number = 0;
    protected state: { [propName: string]: boolean };
    private path: Point[];
    private onTouchBottomFunc:Function = ()=>{};
    public static items: Paw[] = [];

    constructor(ctx: CanvasRenderingContext2D, id, size: Rect, initialPosition, _path: Point[]) {
        super(ctx, id, initialPosition);
        this.size = size;
        this.state = {moving: false};
        this.time = 2000;
        this.path = _path;
    }

    get progress(): number {
        return 1 - (this.frames.length / this.totalFrames);
    }


    draw(bottom: Point) {

        if (bottom) {
            // const x =
            const TOP_CENTER = this.initialPosition;
            const {width, height} = this.size;

            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.moveTo(TOP_CENTER.x, 0);
            this.ctx.lineWidth = width/2;
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


    public move() {
        const {moving} = this.state;
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
                if(this.frames.length == this.totalFrames/2 || this.frames.length == (this.totalFrames+1)/2){
                    this.onTouchBottomFunc(next);
                }
            }
        } else {
            // Item.removeItem(this.id);
        }
    }

    public catchToy() {
        if (this.frames.length == 0) {
            this.setPath(this.path);
        }
    }
    public onTouchBottom(func){
        this.onTouchBottomFunc = func;
    }
}