// @flow

import type { IRenderer } from "./interface";
import type { IAdventure } from "../adventure/interface";
import type { IDebugger } from "../debugger/interface";

import { Debugger } from "../debugger";

export class Renderer implements IRenderer {
  static instance: IRenderer;

  adventure: IAdventure;
  debugger: IDebugger;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  fps: number;
  mainLoopId: IntervalID;

  constructor(adventure: IAdventure) {
    if (Renderer.instance) {
      Renderer.instance.clear();
    }

    Renderer.instance = this;
    this.adventure = adventure;
    this.debugger = new Debugger(adventure);

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.width = adventure.width;
    this.canvas.height = adventure.height;

    if (document.body) {
      document.body.insertBefore(this.canvas, document.body.firstChild);
    }

    this.fps = adventure.fps;
    this.mainLoopId = this.start();

    this.listenKeyboard();
  }

  clear(): void {
    if (this.mainLoopId) {
      clearInterval(this.mainLoopId);
    }

    if (document.body) {
      Array.from(document.body.getElementsByTagName("canvas")).forEach(
        element => element.remove()
      );
    }
  }

  start(): IntervalID {
    return setInterval(() => {
      this.context.clearRect(0, 0, this.adventure.width, this.adventure.height);

      if (this.adventure.currentRoom) {
        this.adventure.currentRoom.draw();
      }

      if (this.adventure.debug) {
        this.debugger.update();
        this.debugger.draw();
      }
    }, 1000 / this.fps);
  }

  listenKeyboard(): void {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 114: // F3
          this.debugger.toggle();
          break;
        case 115: // F4
          this.debugger.toggleWalkableArea();
          break;
        case 116: // F5
          this.debugger.dumpManuallyAddedPoints();
          break;
        case 117: // F6
          this.debugger.clearManuallyAddedPoints();
          break;
        default:
          break;
      }
    });
  }
}
