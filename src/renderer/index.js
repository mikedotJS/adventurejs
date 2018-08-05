// @flow

import { Adventure } from "../adventure";

export class Renderer {
  static canvas: HTMLCanvasElement;
  static context: CanvasRenderingContext2D;

  static fps: number;
  static mainLoopId: IntervalID;
  static lastRenderAt: number;
  static currentFps: number;

  static init(): void {
    Renderer.clear();

    Renderer.canvas = document.createElement("canvas");
    Renderer.context = Renderer.canvas.getContext("2d");

    Renderer.canvas.width = Adventure.width || 640;
    Renderer.canvas.height = Adventure.height || 480;

    if (document.body) {
      document.body.insertBefore(Renderer.canvas, document.body.firstChild);
    }

    Renderer.canvas.style.backgroundColor = "black";

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
      if (Adventure.currentRoom) {
        Adventure.currentRoom.draw();
      }

      if (Adventure.debug) {
        Renderer.computeCurrentFps();
        Renderer.drawDebug();
      }
    }, 1000 / Renderer.fps);
  }

  static listenKeyboard(): void {
    window.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 114: // F3
          Adventure.debug = !Adventure.debug;
          break;
        default:
          break;
      }
    });
  }

  static computeCurrentFps() {
    const currentRenderAt = Date.now();
    Renderer.currentFps = 1000 / (currentRenderAt - Renderer.lastRenderAt);
    Renderer.lastRenderAt = currentRenderAt;
  }

  static drawDebug(): void {
    Renderer.context.fillStyle = "white";
    Renderer.context.font = "16px Arial";

    let y = 0;
    const lines = [
      "Debug info:",
      `Current room: ${
        Adventure.currentRoom ? Adventure.currentRoom.id : "not defined"
      }`,
      `FPS: ${Math.round(Renderer.currentFps)}`
    ];

    lines.forEach(line => {
      y += 20;
      Renderer.context.fillText(`${line}\n`, 5, y, Adventure.width);
    });
  }
}
