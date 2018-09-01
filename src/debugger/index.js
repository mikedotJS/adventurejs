// @flow

import type { IDebugger } from "./interface";
import type { IPoint } from "../point/interface";
import type { IAdventure } from "../adventure/interface";
import type { IRenderer } from "../renderer/interface";
import type { IActor } from "../actor/interface";

import { Point } from "../point";

export class Debugger implements IDebugger {
  static WALKABLE_AREA_COLOR = "red";
  static ACTOR_COLOR = "yellow";

  adventure: IAdventure;
  renderer: IRenderer;

  lastRenderAt: number;
  currentFps: number;

  onMouseMoveListener: (event: MouseEvent) => void;
  onClickListener: (event: MouseEvent) => void;

  mouseX: number;
  mouseY: number;

  displayWalkableArea: boolean;
  displayActorsDetails: boolean;

  manuallyAddedPoints: IPoint[];

  constructor(adventure: IAdventure) {
    this.adventure = adventure;
  }

  toggle(): void {
    this.adventure.debug = !this.adventure.debug;

    if (this.adventure.debug) {
      this.init();
    } else {
      this.clear(this.renderer.canvas);
    }
  }

  init(): void {
    this.renderer = this.adventure.renderer;
    const { canvas } = this.renderer;

    this.onMouseMoveListener = this.onMouseMove.bind(this);
    this.onClickListener = this.onClick.bind(this);

    this.manuallyAddedPoints = [];

    canvas.addEventListener("mousemove", this.onMouseMoveListener);
    canvas.addEventListener("click", this.onClickListener);
  }

  clear(canvas: HTMLCanvasElement): void {
    canvas.removeEventListener("mousemove", this.onMouseMoveListener);
    canvas.removeEventListener("click", this.onClickListener);
  }

  update(): void {
    const currentRenderAt = Date.now();
    this.currentFps = 1000 / (currentRenderAt - this.lastRenderAt);
    this.lastRenderAt = currentRenderAt;
  }

  toggleWalkableArea(): void {
    if (this.adventure.debug) {
      this.displayWalkableArea = !this.displayWalkableArea;
    }
  }

  toggleActorDetails(): void {
    if (this.adventure.debug) {
      this.displayActorsDetails = !this.displayActorsDetails;
    }
  }

  render(): void {
    if (this.manuallyAddedPoints) {
      this.debugArea(this.manuallyAddedPoints);
    }

    if (
      this.displayWalkableArea &&
      this.adventure.currentRoom &&
      this.adventure.currentRoom.walkableArea
    ) {
      this.debugArea(this.adventure.currentRoom.walkableArea);
    }

    if (
      this.displayActorsDetails &&
      this.adventure.currentRoom &&
      this.adventure.currentRoom.actors
    ) {
      this.debugActors(Array.from(this.adventure.currentRoom.actors.values()));
    }

    this.drawMessages();
  }

  debugArea(points: IPoint[]): void {
    this.renderer.context.beginPath();

    points.forEach((point, index) => {
      this.drawPoint(point, Debugger.WALKABLE_AREA_COLOR);

      if (index === 0) {
        this.renderer.context.moveTo(point.x, point.y);
      } else {
        this.renderer.context.lineTo(point.x, point.y);
      }
    });

    this.renderer.context.closePath();

    this.renderer.context.fillStyle = "rgba(255, 0, 0, 0.25)";
    this.renderer.context.fill();
    this.renderer.context.lineWidth = 1;
    this.renderer.context.strokeStyle = Debugger.WALKABLE_AREA_COLOR;
    this.renderer.context.stroke();
  }

  debugActors(actors: IActor[]) {
    actors.forEach(actor => {
      this.renderer.context.beginPath();
      this.drawPoint(actor, Debugger.ACTOR_COLOR);
      this.renderer.context.moveTo(actor.x, actor.y);

      const x = actor.x - actor.scaledWidth / 2;
      const y = actor.y - actor.scaledHeight;
      const scale = Math.round(actor.scale * 10000) / 100;

      this.renderer.context.lineWidth = 1;
      this.renderer.context.strokeStyle = Debugger.ACTOR_COLOR;
      this.renderer.context.rect(x, y, actor.scaledWidth, actor.scaledHeight);

      this.renderer.context.stroke();
      this.renderer.context.closePath();

      this.renderer.context.fillStyle = Debugger.ACTOR_COLOR;
      this.renderer.context.font = "16px Arial";

      this.renderer.context.fillText(
        `${actor.name} (#${actor.id}, ${scale} %)`,
        x,
        y - 10,
        this.adventure.width - x
      );
    });
  }

  drawMessages(): void {
    this.renderer.context.fillStyle = "white";
    this.renderer.context.font = "16px Arial";

    let y = 0;
    const lines = [
      "Debug info:",
      `Current room: ${
        this.adventure.currentRoom
          ? this.adventure.currentRoom.id
          : "not defined"
      }`,
      `FPS: ${Math.round(this.currentFps)}`,
      `Mouse position: ${this.mouseX || "?"};${this.mouseY || "?"}`,
      `Walkable area: ${this.displayWalkableArea ? "ON" : "OFF"} (F4)`,
      `Manually added points: ${
        this.manuallyAddedPoints.length
      } (click to add, "d" to dump, "c" to clear)`,
      `Actors: ${this.displayActorsDetails ? "ON" : "OFF"} (F5)`
    ];

    lines.forEach(line => {
      y += 20;
      this.renderer.context.fillText(line, 5, y, this.adventure.width);
    });
  }

  onMouseMove(event: MouseEvent): void {
    const rect = this.renderer.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }

  onClick(event: MouseEvent): void {
    const rect = this.renderer.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.manuallyAddedPoints.push(new Point(x, y));
  }

  drawPoint(point: IPoint, color: string): void {
    this.renderer.context.arc(point.x, point.y, 2, 0, 2 * Math.PI, false);
    this.renderer.context.lineWidth = 2;
    this.renderer.context.strokeStyle = color;
    this.renderer.context.stroke();
  }

  dumpManuallyAddedPoints(): void {
    if (this.adventure.debug) {
      console.log(JSON.stringify(this.manuallyAddedPoints));
    }
  }

  clearManuallyAddedPoints(): void {
    if (this.adventure.debug) {
      this.manuallyAddedPoints = [];
    }
  }
}
