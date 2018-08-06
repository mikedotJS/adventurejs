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
  onKeyDownListener: (event: KeyboardEvent) => void;

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

    this.onKeyDownListener = this.onKeyDown.bind(this);
    window.addEventListener("keydown", this.onKeyDownListener);
  }

  clear(): void {
    window.removeEventListener("keydown", this.onKeyDownListener);
    this.debugger.clear(this.canvas);

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
        this.adventure.currentRoom.render();
      }

      if (this.adventure.debug) {
        this.debugger.update();
        this.debugger.render();
      }
    }, 1000 / this.fps);
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "F3":
        this.debugger.toggle();
        break;
      case "F4":
        this.debugger.toggleWalkableArea();
        break;
      case "d":
        this.debugger.dumpManuallyAddedPoints();
        break;
      case "c":
        this.debugger.clearManuallyAddedPoints();
        break;
      default:
        break;
    }
  }
}
