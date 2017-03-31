/**
 * Created by wangchunqi on 2017/3/31.
 */

export interface toyType{
    id: string,
    src: string,
    name: string,
    price: number,
}
export const toyTypes = Array.from([1, 2, 3, 4], (n) => ({
    id: n+'',
    src: `./images/${n}.jpeg`,
    name: `娃娃-${n}`,
    price: n,
}));

export const getDollType = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rand = Math.random();
            const index = rand < 0.1 ? 0 : (rand < 0.3 ? 1 : (rand < 0.8 ? 2 : 3));
            resolve(toyTypes[index]);
        }, 10);
    });
};

let maxNum = 5;
let items = [];
export const checkShallPay = (type)=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(items.length < maxNum) {
                items.push(type);
                resolve(true);
            }else {
                alert(`您一共获得了${items.map(i=>JSON.stringify(i)).join('、')}个奖品，已经达到${maxNum}上限了，继续充钱再玩吧~`);
                resolve(false);
            }
        }, 10);
    });
};