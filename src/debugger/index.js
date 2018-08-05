// @flow

import type { IPoint } from "../point/interface";

import { Adventure } from "../adventure";
import { Renderer } from "../renderer";
import { Point } from "../point";

export class Debugger {
  static lastRenderAt: number;
  static currentFps: number;

  static mouseX: number;
  static mouseY: number;

  static displayWalkableArea: boolean;
  static manuallyAddedPoints: IPoint[];

  static toggle(): void {
    Adventure.debug = !Adventure.debug;

    if (Adventure.debug) {
      Debugger.init();
    } else {
      Debugger.clear();
    }
  }

  static init(): void {
    Renderer.canvas.addEventListener("mousemove", Debugger.onMouseMove);
    Renderer.canvas.addEventListener("click", Debugger.onClick);
  }

  static clear(): void {
    Renderer.canvas.removeEventListener("mousemove", Debugger.onMouseMove);
    Renderer.canvas.removeEventListener("click", Debugger.onClick);
  }

  static update(): void {
    const currentRenderAt = Date.now();
    Debugger.currentFps = 1000 / (currentRenderAt - Debugger.lastRenderAt);
    Debugger.lastRenderAt = currentRenderAt;
  }

  static toggleWalkableArea() {
    if (Adventure.debug) {
      Debugger.displayWalkableArea = !Debugger.displayWalkableArea;
    }
  }

  static draw(): void {
    if (Debugger.manuallyAddedPoints) {
      Debugger.debugArea(Debugger.manuallyAddedPoints);
    }

    if (
      Debugger.displayWalkableArea &&
      Adventure.currentRoom &&
      Adventure.currentRoom.walkableArea
    ) {
      Debugger.debugArea(Adventure.currentRoom.walkableArea);
    }

    Debugger.drawMessages();
  }

  static debugArea(points: IPoint[]) {
    Renderer.context.beginPath();

    points.forEach((point, index) => {
      Debugger.drawPoint(point);

      if (index === 0) {
        Renderer.context.moveTo(point.x, point.y);
      } else {
        Renderer.context.lineTo(point.x, point.y);
      }
    });

    Renderer.context.closePath();

    Renderer.context.fillStyle = "rgba(255, 0, 0, 0.25)";
    Renderer.context.fill();
    Renderer.context.lineWidth = 1;
    Renderer.context.strokeStyle = "red";
    Renderer.context.stroke();
  }

  static drawMessages(): void {
    Renderer.context.fillStyle = "white";
    Renderer.context.font = "16px Arial";

    let y = 0;
    const lines = [
      "Debug info:",
      `Current room: ${
        Adventure.currentRoom ? Adventure.currentRoom.id : "not defined"
      }`,
      `FPS: ${Math.round(Debugger.currentFps)}`,
      `Mouse position: ${Debugger.mouseX || "?"};${Debugger.mouseY || "?"}`,
      `Walkable area: ${Debugger.displayWalkableArea ? "ON" : "OFF"} (F4)`,
      `Manually added points: ${
        Debugger.manuallyAddedPoints ? Debugger.manuallyAddedPoints.length : 0
      } (click to add, F5 to dump, F6 to clear)`
    ];

    lines.forEach(line => {
      y += 20;
      Renderer.context.fillText(`${line}\n`, 5, y, Adventure.width);
    });
  }

  static onMouseMove(event: MouseEvent): void {
    const rect = Renderer.canvas.getBoundingClientRect();
    Debugger.mouseX = event.clientX - rect.left;
    Debugger.mouseY = event.clientY - rect.top;
  }

  static onClick(event: MouseEvent): void {
    const rect = Renderer.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (!Debugger.manuallyAddedPoints) {
      Debugger.manuallyAddedPoints = [];
    }

    Debugger.manuallyAddedPoints.push(new Point(x, y));
  }

  static drawPoint(point: IPoint): void {
    Renderer.context.arc(point.x, point.y, 2, 0, 2 * Math.PI, false);
    Renderer.context.lineWidth = 2;
    Renderer.context.strokeStyle = "red";
    Renderer.context.stroke();
  }

  static dumpManuallyAddedPoints(): void {
    if (Adventure.debug) {
      console.log(JSON.stringify(Debugger.manuallyAddedPoints));
    }
  }

  static clearManuallyAddedPoints(): void {
    if (Adventure.debug) {
      Debugger.manuallyAddedPoints = [];
    }
  }
}
