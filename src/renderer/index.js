// @flow

import { Adventure } from "../adventure";
import { Debugger } from "../debugger";

export class Renderer {
  static canvas: HTMLCanvasElement;
  static context: CanvasRenderingContext2D;

  static fps: number;
  static mainLoopId: IntervalID;

  static init(): void {
    Renderer.clear();

    Renderer.canvas = document.createElement("canvas");
    Renderer.context = Renderer.canvas.getContext("2d");

    Renderer.canvas.width = Adventure.width || 640;
    Renderer.canvas.height = Adventure.height || 480;

    if (document.body) {
      document.body.insertBefore(Renderer.canvas, document.body.firstChild);
    }

    Renderer.fps = Adventure.fps || 60;
    Renderer.mainLoopId = Renderer.start();

    Renderer.listenKeyboard();
  }

  static clear(): void {
    if (Renderer.mainLoopId) {
      clearInterval(Renderer.mainLoopId);
    }

    if (document.body) {
      Array.from(document.body.getElementsByTagName("canvas")).forEach(
        element => element.remove()
      );
    }
  }

  static start(): IntervalID {
    return setInterval(() => {
      Renderer.context.clearRect(0, 0, Adventure.width, Adventure.height);

      if (Adventure.currentRoom) {
        Adventure.currentRoom.draw();
      }

      if (Adventure.debug) {
        Debugger.update();
        Debugger.draw();
      }
    }, 1000 / Renderer.fps);
  }

  static listenKeyboard(): void {
    window.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 114: // F3
          Debugger.toggle();
          break;
        case 115: // F4
          Debugger.toggleWalkableArea();
          break;
        case 116: // F5
          Debugger.dumpManuallyAddedPoints();
          break;
        case 117: // F6
          Debugger.clearManuallyAddedPoints();
          break;
        default:
          break;
      }
    });
  }
}
