/**
 * Created by wcq on 2017/3/30.
 */
import {Point} from './basic/index';
import {sum} from 'lodash';
let ids: number = 1;

interface ItemMap {
    [propName: string]: number;
}

export class Item {
    public static pause(id: string | number) {

    };

    public static pauseAll() {

    };

    public static addItem = (Item) => (item: Item) => {
        // console.log(Item);
        Item.items.push(item);
        let len: number = Item.items.length;
        Item.itemsIds[item.id] = len - 1;
    };

    public static removeItem = (Item) => (id: string | number): void => {
        const pos = Item.itemsIds[id];
        Item.items.splice(pos, 1);
        Item.items.forEach(({id}, i) => {
            Item.itemsIds[id] = i;
        });
        delete Item.itemsIds[id];
        console.info('remove', id, pos);
    };

    public static lastItem = (Item) => () => {
        if (Item.items && Item.items.length > 0) {
            return Item.items[Item.items.length - 1];
        } else {
            return null;
        }
    };

    public static items: Array<any> = [];
    private static itemsIds: ItemMap = {};


    public id: number;
    protected frames: Point[];
    protected time: number;
    protected state: { [propName: string]: boolean; };
    protected ctx: CanvasRenderingContext2D;
    protected totalFrames: number = 0;
    protected initialPosition:Point;

    constructor(ctx: CanvasRenderingContext2D, id: number = ++ids, initialPosition: Point) {
        this.ctx = ctx;
        this.id = id;
        this.frames = [];
        this.initialPosition = initialPosition;
        this.state = {
            moving: false,
        };
    }

    private init(): void {

    }

    public setPath(path: Point[] = []): void {
        this.generatePath(path);
        this.state.moving = true;
    }

    generatePath(path: Point[]) {
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
        this.logFrames();
    }

    logFrames(){

    }

    public move() {
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

    draw(frame: object) {

    }

    pause() {
    }

}