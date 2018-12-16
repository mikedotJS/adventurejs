// @flow

import type { IRenderer } from "./interface";
import type { IAdventure } from "../adventure/interface";
import type { IDebugger } from "../debugger/interface";
import type { IRenderable } from "../renderable/interface";
import type { IActor } from "../actor/interface";
import type { IPoint } from "../point/interface";

import { Debugger } from "../debugger";
import { Point } from "../point";

export class Renderer implements IRenderer {
  static instance: IRenderer;

  adventure: IAdventure;
  debugger: IDebugger;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  fps: number;
  mainLoopId: IntervalID;
  mousePosition: IPoint;

  onKeyDownListener: (event: KeyboardEvent) => void;
  onMouseMoveListener: (event: MouseEvent) => void;
  onClickListener: (event: MouseEvent) => void;

  constructor(adventure: IAdventure, fps: number) {
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

    this.fps = fps;
    this.mousePosition = new Point(-1, -1);
    this.mainLoopId = this.start();

    this.onKeyDownListener = this.onKeyDown.bind(this);
    this.onMouseMoveListener = this.onMouseMove.bind(this);
    this.onClickListener = this.onClick.bind(this);

    window.addEventListener("keydown", this.onKeyDownListener);
    this.canvas.addEventListener("mousemove", this.onMouseMoveListener);
    this.canvas.addEventListener("click", this.onClickListener);
  }

  clear(): void {
    window.removeEventListener("keydown", this.onKeyDownListener);
    this.canvas.removeEventListener("mousemove", this.onMouseMoveListener);
    this.canvas.removeEventListener("click", this.onClickListener);
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
      const { width, height, currentRoom, debug } = this.adventure;
      this.context.clearRect(0, 0, width, height);

      if (currentRoom) {
        this.render(currentRoom);

        currentRoom.actors.forEach((actor: IActor) => {
          this.renderActor(actor);
        });
      }

      if (debug) {
        this.debugger.update();
        this.debugger.render();
      }
    }, 1000 / this.fps);
  }

  render(renderable: IRenderable): void {
    if (renderable.imageReady) {
      this.context.drawImage(
        renderable.image,
        renderable.x,
        renderable.y,
        renderable.width,
        renderable.height
      );
    }
  }

  renderActor(actor: IActor): void {
    if (actor.imageReady) {
      this.context.drawImage(
        actor.image,
        actor.x - actor.scaledWidth / 2,
        actor.y - actor.scaledHeight,
        actor.scaledWidth,
        actor.scaledHeight
      );
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "F3":
        this.debugger.toggle();
        break;
      case "F4":
        this.debugger.toggleWalkableArea();
        break;
      case "F6":
        this.debugger.toggleActorDetails();
        break;
      case "d":
        this.debugger.dumpManuallyAddedPoints();
        break;
      case "c":
        this.debugger.clearManuallyAddedPoints();
        break;
      case "F7":
        this.debugger.toggleMoveGraph();
        break;
      default:
        break;
    }
  }

  onMouseMove(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.mousePosition = new Point(x, y);

    if (this.adventure.currentRoom && this.adventure.currentRoom.currentActor) {
      this.adventure.currentRoom.moveGraph.updateMousePath(this.mousePosition);
    }
  }

  onClick(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const point = new Point(x, y);

    if (this.adventure.debug) {
      this.debugger.onClick(point);
    }
  }
}
