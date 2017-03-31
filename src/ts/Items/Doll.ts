import {Point} from '../basic/index'
import {Item} from '../Item';
import {Rect} from "../basic/Rect";
import {sum} from 'lodash';
import {toyType} from '../service/index';

let requestedImages = {};

export class Doll extends Item {
    private speed: Point = {x: 1, y: 0};
    private size: Rect;
    private imgSrc: string = "/";
    private img: HTMLImageElement = null;
    public type: toyType = null;
    protected static images: { [propName: string]: HTMLImageElement } = {};

    get position(): Point{
        return this.frames[0];
    }
    constructor(ctx: CanvasRenderingContext2D, id, size: Rect, initialPosition, imgSrc: string = "/", type: toyType) {
        super(ctx, id, initialPosition);
        this.size = size;
        this.imgSrc = imgSrc;
        this.type = type;
        this.loadImg(imgSrc);
        this.time = 5000;
    }

    get progress(): number {
        return 1 - (this.frames.length / this.totalFrames);
    }

    loadImg(src: string) {
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

    draw(frame: Point) {
        if (frame) {
            this.ctx.save();
            this.img && this.ctx.drawImage(this.img, frame.x, frame.y, this.size.width, this.size.height);
            this.ctx.restore();
        }
    }

    public move() {
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