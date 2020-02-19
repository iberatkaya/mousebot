# MouseBot

<p align="center"><img src="https://raw.githubusercontent.com/iberatkaya/mousebot/master/logo/logo.png"></p>

Computer automating package that can control the mouse and keyboard.

[![NPM](https://nodei.co/npm/mousebot.png)](https://nodei.co/npm/mousebot/)

MouseBot is an automating package that lets you programatically control the mouse and keyboard of your device. MouseBot was built with native Rust bindings using [neon](https://neon-bindings.com/). Check out the [API documentation](https://iberatkaya.github.io/mousebot/)!

## Building

Please make sure you have installed the global dependencies:

* Python v2.7 is recommended, although Python v3.5, v3.6, or v3.7 may work.
* npm i -g node-pre-gyp

## Install

```sh
npm i mousebot
```
## Examples
```javascript
import { Bot } from 'mousebot';
//or
const { Bot } = require('mousebot');

/**
 * Create an instance of the class. 
 * Each member function of the class is an async funcction that returns a promise.
 */

let bot = new Bot();

//Move the mouse to the coordinates x=400, y=500. 
bot.mouseMove(400, 500);

//Move the mouse from x=300, y=400 to x=600, y=500 smoothly.
bot.mouseMoveSmooth(300, 300, 600, 500);

//Type "Hello World!"
bot.keyWrite("Hello world!")

//Chain the alt and f5 keys to perform an ALT+F5 to refresh a page.
bot.keyChain("alt", "f5");

//Directly use some implemented shortcuts.
bot.shortcuts.altTab();

//Chain functions using an async function.
let chain = async () => {
    await bot.mouseMoveSmooth(300, 300, 600, 500);
    await bot.keyWrite("Hello world!")
}
chain();

```

## Known Issues

Currently all of the features work on Windows and Linux. On MacOS some mouse features work while most keyboard features do not work.

## Author

👤 **Ibrahim Berat Kaya**

* Github: [@iberatkaya](https://github.com/iberatkaya)
* LinkedIn: [@linkedin.com/in/ibrahim-berat-kaya/](https://linkedin.com/in/ibrahim-berat-kaya/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check the [issues page](https://github.com/iberatkaya/mousebot/issues). 

## Show your support

Give a ⭐️ if this project helped you!