import {Point} from '../basic/index'
import {Item} from '../Item';
import {Rect} from "../basic/Rect";
import {sum} from 'lodash';

let requestedImages = {};

export class Doll extends Item {
    private speed: Point = {x: 1, y: 0};
    private size: Rect;
    private time: number = 6000;
    private imgSrc: string = "/";
    private img: HTMLImageElement = null;
    frames: Point[] = [];
    protected totalFrames: number = 0;
    protected static images: { [propName: string]: HTMLImageElement } = {};


    public static items: Doll[] = [];

    constructor(ctx: CanvasRenderingContext2D, id, size: Rect, initialPosition, imgSrc: string = "/") {
        super(ctx, id, initialPosition);
        this.size = size;
        this.imgSrc = imgSrc;
        this.loadImg(imgSrc);
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

    generatePath(path: Point[]) {
        // console.log(path);

        const paths = path.map((p: Point, i: number) => [p, path[i + 1]]).slice(0, -1);

        const frameMovedDistanceArr: number[] = paths.map(([a, b]: [Point, Point]): number => {
            return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
        }, []);
        const frameMovedDistance: number = sum(frameMovedDistanceArr);
        const frameNumber: number = Math.ceil(this.time / 16);
        this.totalFrames = frameNumber;
        this.frames = paths.reduce((ret: Point[], p: Point[], i: number): Point[] => {
            const [pre, next] = p;
            const frameCurNumber = Math.ceil(frameNumber * (frameMovedDistanceArr[i] / frameMovedDistance));
            let j = 0;
            const dX = (next.x - pre.x) / frameCurNumber, dY = (next.y - pre.y) / frameCurNumber;
            let len = ret.length;
            do {
                ret[len + j] = {x: pre.x + dX * j, y: pre.y + dY * j};
            } while (++j < frameCurNumber);
            return ret;
        }, []);
        // console.log(this.frames.map(({x}: { x, y }): number => x).join(','));

    }

    timeTo() {

    }

    draw(frame: Point) {
        if (frame) {
            this.img && this.ctx.drawImage(this.img, frame.x, frame.y, this.size.width, this.size.height);
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