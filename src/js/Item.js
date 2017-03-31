let ids = 1;
export class Item {
    constructor(ctx, id = ++ids, initialPosition) {
        this.ctx = ctx;
        this.id = id;
        this.frames = [];
        this.state = {
            moving: false,
        };
    }
    static pause(id) {
    }
    ;
    static pauseAll() {
    }
    ;
    init() {
    }
    setPath(path = []) {
        this.generatePath(path);
        this.state.moving = true;
    }
    generatePath(path) {
    }
    move() {
        if (this.state.moving) {
            const next = this.frames.shift();
            this.draw(next);
            if (this.frames.length == 0) {
                Item.removeItem(Item)(this.id);
                // Item.removeItem(this.id);
                this.state.moving = false;
            }
        }
        else {
            // Item.removeItem(this.id);
        }
    }
    draw(frame) {
    }
    pause() {
    }
}
Item.addItem = (Item) => (item) => {
    // console.log(Item);
    Item.items.push(item);
    let len = Item.items.length;
    Item.itemsIds[item.id] = len - 1;
};
Item.removeItem = (Item) => (id) => {
    const pos = Item.itemsIds[id];
    Item.items.splice(pos, 1);
    Item.items.forEach(({ id }, i) => {
        Item.itemsIds[id] = i;
    });
    delete Item.itemsIds[id];
    console.info('remove', id, pos);
};
Item.lastItem = (Item) => () => {
    if (Item.items && Item.items.length > 0) {
        return Item.items[Item.items.length - 1];
    }
    else {
        return null;
    }
};
Item.items = [];
Item.itemsIds = {};
