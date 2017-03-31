import { Item } from '../Item';
import { sum } from 'lodash';
let requestedImages = {};
export class Doll extends Item {
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
        return 1 - (this.frames.length / this.totalFrames);
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
        }
        else {
            this.img = Doll.images[src];
        }
    }
    generatePath(path) {
        // console.log(path);
        const paths = path.map((p, i) => [p, path[i + 1]]).slice(0, -1);
        const frameMovedDistanceArr = paths.map(([a, b]) => {
            return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
        }, []);
        const frameMovedDistance = sum(frameMovedDistanceArr);
        const frameNumber = Math.ceil(this.time / 16);
        this.totalFrames = frameNumber;
        this.frames = paths.reduce((ret, p, i) => {
            const [pre, next] = p;
            const frameCurNumber = Math.ceil(frameNumber * (frameMovedDistanceArr[i] / frameMovedDistance));
            let j = 0;
            const dX = (next.x - pre.x) / frameCurNumber, dY = (next.y - pre.y) / frameCurNumber;
            let len = ret.length;
            do {
                ret[len + j] = { x: pre.x + dX * j, y: pre.y + dY * j };
            } while (++j < frameCurNumber);
            return ret;
        }, []);
        // console.log(this.frames.map(({x}: { x, y }): number => x).join(','));
    }
    timeTo() {
    }
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
        }
        else {
            // Item.removeItem(this.id);
        }
    }
}
Doll.images = {};
Doll.items = [];
