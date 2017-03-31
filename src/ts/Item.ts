/**
 * Created by wcq on 2017/3/30.
 */
import {Point} from './basic/index';
let ids: number = 1;

interface ItemState {
    moving: boolean;
}
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

    public static items: Item[] = [];
    private static itemsIds: ItemMap = {};


    public id: number;
    protected frames: object[];
    protected state: ItemState;
    protected ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, id: number = ++ids, initialPosition: Point) {
        this.ctx = ctx;
        this.id = id;
        this.frames = [];
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

    generatePath(path: Point[]): void {

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