//@ts-ignore
import * as addon from "../native";

type Key = "alt" | "shift" | "backspace" | "capslock" | "space" | "escape" | "tab" | "f4" | "f5" | "rightarrow" | "leftarrow" | "uparrow" | "downarrow" | "esc" | "return";

export class Bot {
    /**
     * @param {number} x The x coordinate of the mouse.
     * @param {number} y The y coordinate of the mouse.
     * @returns {boolean}
     * Move the mouse to the given coordinates immediatly.
     */

    mouseMove = (x: number, y: number): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            addon.mouseMove(x, y, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {number} startx The beginning x coordinate of the mouse.
     * @param {number} starty The beginning y coordinate of the mouse.
     * @param {number} endx The ending x coordinate of the mouse.
     * @param {number} endy The ending y coordinate of the mouse.
     * @param {number} [delay=1] The delay of each pixel movement of the mouse in ms.
     * Move the mouse to the given coordinates smoothly.
     */

    mouseMoveSmooth = (startx: number, starty: number, endx: number, endy: number, delay = 1): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            addon.mouseMoveSmooth(startx, starty, endx, endy, delay, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {"left" | "right"} button Perform a left or right button click.
     * Click the mouse in the given direction.
     */

    mouseClick = (button: "left" | "right"): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            addon.mouseClick(button, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {"left" | "right"} direction Perform a scroll horizontal (x) or vertical (y).
     * @param {number} amount The amount of the scroll.
     */

    mouseScroll = (direction: "x" | "y", amount: number): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            addon.mouseScroll(direction, amount, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {string} str The string to write.
     * Write the given string to the keyboard without delay.
     */

    keyWrite = (str: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            addon.keyWrite(str, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {string} str The string to write smoothly.
     * @param {number} [delay=100] The delay of each key press in ms.
     * Write the given string to the keyboard smoothly.
     */

    keyWriteSmooth = (str: string, delay = 100): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            addon.keyWriteSmooth(str, delay, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {"alt" | "shift" | "backspace" | "capslock" | "space" | "escape" | "tab" | "f4" | "f5" | "rightarrow" | "leftarrow" | "uparrow" | "downarrow" | "esc" | "return"} key The lowercase string of the key desired to be hold pressed.
     * Hold a key pressed. Stop the key from being press using the keyUp function.
     */

    keyDown = (key: Key): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            addon.keyDown(key, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {"alt" | "shift" | "backspace" | "capslock" | "space" | "escape" | "tab" | "f4" | "f5" | "rightarrow" | "leftarrow" | "uparrow" | "downarrow" | "esc" | "return"} key The lowercase string of the key desired to be hold released.
     * Release a pressed key.
     */

    keyUp = (key: Key): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            addon.keyUp(key, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {"alt" | "shift" | "backspace" | "capslock" | "space" | "escape" | "tab" | "f4" | "f5" | "rightarrow" | "leftarrow" | "uparrow" | "downarrow" | "esc" | "return"} key The lowercase string of the key desired to be hold pressed once.
     * Press a key once.
     */

    keyClick = (key: Key): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            addon.keyClick(key, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    };

    /**
     * @param {"alt" | "shift" | "backspace" | "capslock" | "space" | "escape" | "tab" | "f4" | "f5" | "rightarrow" | "leftarrow" | "uparrow" | "downarrow" | "esc" | "return"} key1 The lowercase string of the first key desired to be hold.
     * @param {"alt" | "shift" | "backspace" | "capslock" | "space" | "escape" | "tab" | "f4" | "f5" | "rightarrow" | "leftarrow" | "uparrow" | "downarrow" | "esc" | "return"} key2 The lowercase string of the second key desired to be pressed once.
     * @param {number} [delay=100] The delay of the second key press in ms. The delay might be required to higher for different machines.
     * Press key1, then press key2. Used for pressing keys simultaneously. The function holds down key1, then presses key2 once and releases key1.
     */

    keyChain = async (key1: Key, key2: Key, delay = 100): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                let bot = new Bot();
                await bot.keyDown(key1);
                setTimeout(async () => {
                    await bot.keyClick(key2);
                    await bot.keyUp(key1);
                    resolve(true);
                }, delay);
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * Contains a useful set of key shortcuts.
     */

    shortcuts = {
        /**
         * @param {number} [delay = 100] The delay of the tab key being pressed
         * Perform ALT+TAB by pressing the tab button after the delay has occurred. The delay is required since the buttons are not pressed instantaneously. The delay might be required to higher for different machines.
         */

        altTab: async (delay = 100) => await this.keyChain("alt", "tab", delay),

        /**
         * @param {number} [delay = 100] The delay of the f4 key being pressed
         * Perform ALT+F4 by pressing the f4 button after the delay has occurred. The delay is required since the buttons are not pressed instantaneously. The delay might be required to higher for different machines.
         */

        altF4: async (delay = 100) => await this.keyChain("alt", "f4", delay),

        /**
         * @param {number} [delay = 100] The delay of the f5 key being pressed
         * Perform ALT+F5 by pressing the f5 button after the delay has occurred. The delay is required since the buttons are not pressed instantaneously. The delay might be required to higher for different machines.
         */

        altF5: async (delay = 100) => await this.keyChain("alt", "f5", delay),
    };
}
