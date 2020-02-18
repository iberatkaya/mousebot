extern crate neon;
extern crate enigo;

use enigo::{Enigo, Key, KeyboardControllable, MouseButton, MouseControllable};

use neon::prelude::*;
use neon::context::FunctionContext;

struct BackgroundTask {
    status: bool
}

impl Task for BackgroundTask {
    type Output = bool;
    type Error = String;
    type JsEvent = JsBoolean;
    fn perform(&self) -> Result<Self::Output, Self::Error> {
        Ok(self.status)
    }
    fn complete(self, mut cx: TaskContext, result: Result<Self::Output, Self::Error>) -> JsResult<Self::JsEvent> {
        Ok(cx.boolean(result.unwrap()))
    }
}


fn move_mouse(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let x = cx.argument::<JsNumber>(0)?.value() as i32;
    let y = cx.argument::<JsNumber>(1)?.value() as i32;
    let mut con = Enigo::new();
    con.mouse_move_to(x, y);
    let f = cx.argument::<JsFunction>(2)?;
    let task = BackgroundTask { status: true };
    task.schedule(f);
    Ok(cx.undefined())
}

fn move_mouse_smooth(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let startx = cx.argument::<JsNumber>(0)?.value() as i32;
    let starty = cx.argument::<JsNumber>(1)?.value() as i32;
    let endx = cx.argument::<JsNumber>(2)?.value() as i32;
    let endy = cx.argument::<JsNumber>(3)?.value() as i32;
    let delay = match cx.argument_opt(4) {
        Some(arg) => arg.downcast::<JsNumber>().or_throw(&mut cx)?.value() as u64,
        None => 1
    };
    if startx < 0 || starty < 0 || endx < 0 || endy < 0 {
        panic!("Coordinate is less than 0!");
    }
    let mut con = Enigo::new();
    let mut i = startx;
    let mut j = starty;
    while i != endx || j != endy {
        con.mouse_move_to(i, j);
        if startx < endx && i != endx {
            i += 1;
        } else if startx > endx && i != endx {
            i -= 1;
        }
        if starty < endy && j != endy {
            j += 1;
        } else if starty > endy && j != endy {
            j -= 1;
        }
        std::thread::sleep(std::time::Duration::from_millis(delay as u64));
    }
    let f = cx.argument::<JsFunction>(5)?;
    let task = BackgroundTask { status: true };
    task.schedule(f);
    Ok(cx.undefined())
}

fn mouse_click(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let button = cx.argument::<JsString>(0)?.value();
    let mut con = Enigo::new();
    if button != "left".to_string() && button != "right".to_string() {
        panic!("Incorrect mouse button")
    }
    if button == "left".to_string() {
        con.mouse_click(MouseButton::Left);
    }
    if button == "right".to_string() {
        con.mouse_click(MouseButton::Right);
    }
    let f = cx.argument::<JsFunction>(1)?;
    let task = BackgroundTask { status: true };
    task.schedule(f);
    Ok(cx.undefined())
}

fn key_write(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let str = cx.argument::<JsString>(0)?.value();
    let mut con = Enigo::new();
    con.key_sequence(&str);
    let f = cx.argument::<JsFunction>(1)?;
    let task = BackgroundTask { status: true };
    task.schedule(f);
    Ok(cx.undefined())
}

fn key_write_smooth(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let str = cx.argument::<JsString>(0)?.value();
    let delay = match cx.argument_opt(1) {
        Some(arg) => arg.downcast::<JsNumber>().or_throw(&mut cx)?.value() as u64,
        None => 100
    };
    let mut con = Enigo::new();
    for i in str.chars() {
        con.key_sequence(&i.to_string());
        std::thread::sleep(std::time::Duration::from_millis(delay as u64));
    }
    let f = cx.argument::<JsFunction>(2)?;
    let task = BackgroundTask { status: true };
    task.schedule(f);
    Ok(cx.undefined())
}

register_module!(mut cx, {
    cx.export_function("moveMouse", move_mouse).unwrap();
    cx.export_function("moveMouseSmooth", move_mouse_smooth).unwrap();
    cx.export_function("mouseClick", mouse_click).unwrap();
    cx.export_function("keyWrite", key_write).unwrap();
    cx.export_function("keyWriteSmooth", key_write_smooth).unwrap();
    Ok(())
});
