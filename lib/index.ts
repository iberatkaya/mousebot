//@ts-ignore
import * as addon from '../native';



export class Bot {

    /**
     * @param {number} x The x coordinate of the mouse 
     * @param {number} y The y coordinate of the mouse
     * @returns {boolean}
     * Move the mouse to the given coordinates immediatly.
     */

    moveMouse = (x: number, y: number) => {
        return new Promise((resolve, reject) => {
            addon.moveMouse(x, y, (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {number} startx The beginning x coordinate of the mouse 
     * @param {number} starty The beginning y coordinate of the mouse
     * @param {number} endx The ending x coordinate of the mouse
     * @param {number} endy The ending y coordinate of the mouse
     * @param {number} [delay=1] The delay of each movement
     * Move the mouse to the given coordinates immediatly.
     */

    moveMouseSmooth = (startx: number, starty: number, endx: number, endy: number, delay = 1) => {
        return new Promise((resolve, reject) => {
            let a = addon.moveMouseSmooth(startx, starty, endx, endy, delay, (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {"left" | "right"} button Perform a left or right button click
     * Move the mouse to the given coordinates immediatly.
     */

    mouseClick = (button: "left" | "right") => {
        return new Promise((resolve, reject) => {
            addon.mouseClick(button, (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    };

    keyWrite = (str: string) => {
        return new Promise((resolve, reject) => {
            addon.keyWrite(str, (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    };

    keyWriteSmooth = (str: string, delay = 100) => {
        return new Promise((resolve, reject) => {
            addon.keyWriteSmooth(str, delay, (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    };
}


let run = async () => {
    let b = new Bot();
}

run();
