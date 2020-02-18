//@ts-ignore
import * as addon from '../native';

export class Bot {
    /**
     * @param {number} x The x coordinate of the mouse
     * @param {number} y The y coordinate of the mouse
     * @returns {boolean}
     * Move the mouse to the given coordinates immediatly.
     */

    mouseMove = (x: number, y: number) => {
        return new Promise((resolve, reject) => {
            addon.mouseMove(x, y, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {number} startx The beginning x coordinate of the mouse
     * @param {number} starty The beginning y coordinate of the mouse
     * @param {number} endx The ending x coordinate of the mouse
     * @param {number} endy The ending y coordinate of the mouse
     * @param {number} [delay=1] The delay of each pixel movement of the mouse in ms
     * Move the mouse to the given coordinates smoothly.
     */

    mouseMoveSmooth = (
        startx: number,
        starty: number,
        endx: number,
        endy: number,
        delay = 1
    ) => {
        return new Promise((resolve, reject) => {
            let a = addon.mouseMoveSmooth(
                startx,
                starty,
                endx,
                endy,
                delay,
                (err, res) => {
                    if (err) return reject(err);
                    resolve(res);
                }
            );
        });
    };

    /**
     * @param {"left" | "right"} button Perform a left or right button click
     * Click the mouse in the given direction.
     */

    mouseClick = (button: 'left' | 'right') => {
        return new Promise((resolve, reject) => {
            addon.mouseClick(button, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {string} str The string to write
     * Write the given string to the keyboard without delay.
     */

    keyWrite = (str: string) => {
        return new Promise((resolve, reject) => {
            addon.keyWrite(str, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {string} str The string to write
     * @param {number} [delay=100] The delay of each key press in ms
     * Write the given string to the keyboard without delay.
     */

    keyWriteSmooth = (str: string, delay = 100) => {
        return new Promise((resolve, reject) => {
            addon.keyWriteSmooth(str, delay, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };
}
