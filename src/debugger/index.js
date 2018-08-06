// @flow

import type { IDebugger } from "./interface";
import type { IPoint } from "../point/interface";
import type { IAdventure } from "../adventure/interface";
import type { IRenderer } from "../renderer/interface";

import { Point } from "../point";

export class Debugger implements IDebugger {
  adventure: IAdventure;
  renderer: IRenderer;

  lastRenderAt: number;
  currentFps: number;

  onMouseMoveListener: (event: MouseEvent) => void;
  onClickListener: (event: MouseEvent) => void;

  mouseX: number;
  mouseY: number;

  displayWalkableArea: boolean;
  manuallyAddedPoints: IPoint[];

  constructor(adventure: IAdventure) {
    this.adventure = adventure;
  }

  toggle(): void {
    this.adventure.debug = !this.adventure.debug;

    if (this.adventure.debug) {
      this.init();
    } else {
      this.clear();
    }
  }

  init(): void {
    this.renderer = this.adventure.renderer;
    const { canvas } = this.renderer;

    this.onMouseMoveListener = this.onMouseMove.bind(this);
    this.onClickListener = this.onClick.bind(this);

    canvas.addEventListener("mousemove", this.onMouseMoveListener);
    canvas.addEventListener("click", this.onClickListener);
  }

  clear(): void {
    const { canvas } = this.renderer;

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

  draw(): void {
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

    this.drawMessages();
  }

  debugArea(points: IPoint[]): void {
    this.renderer.context.beginPath();

    points.forEach((point, index) => {
      this.drawPoint(point);

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
    this.renderer.context.strokeStyle = "red";
    this.renderer.context.stroke();
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
        this.manuallyAddedPoints ? this.manuallyAddedPoints.length : 0
      } (click to add, F5 to dump, F6 to clear)`
    ];

    lines.forEach(line => {
      y += 20;
      this.renderer.context.fillText(`${line}\n`, 5, y, this.adventure.width);
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

    if (!this.manuallyAddedPoints) {
      this.manuallyAddedPoints = [];
    }

    this.manuallyAddedPoints.push(new Point(x, y));
  }

  drawPoint(point: IPoint): void {
    this.renderer.context.arc(point.x, point.y, 2, 0, 2 * Math.PI, false);
    this.renderer.context.lineWidth = 2;
    this.renderer.context.strokeStyle = "red";
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
