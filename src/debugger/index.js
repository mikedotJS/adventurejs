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
  static PATH_COLOR = "blue";

  adventure: IAdventure;
  renderer: IRenderer;

  lastRenderAt: number;
  currentFps: number;

  displayWalkableArea: boolean;
  displayActorsDetails: boolean;
  displayMoveGraph: boolean;

  manuallyAddedPoints: IPoint[];

  constructor(adventure: IAdventure) {
    this.adventure = adventure;
  }

  toggle(): void {
    this.adventure.debug = !this.adventure.debug;

    if (this.adventure.debug) {
      this.init();
    }
  }

  init(): void {
    this.renderer = this.adventure.renderer;
    this.manuallyAddedPoints = [];
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

  toggleMoveGraph(): void {
    if (this.adventure.debug) {
      this.displayMoveGraph = !this.displayMoveGraph;
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

    if (
      this.displayMoveGraph &&
      this.adventure.currentRoom &&
      this.adventure.currentRoom.moveGraph
    ) {
      this.debugMoveGraph();
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

  debugMoveGraph(): void {
    const { moveGraph } = this.adventure.currentRoom;

    moveGraph.paths.forEach((path: [IPoint, IPoint]) => {
      this.drawSegment(path);
    });

    this.drawSegment(moveGraph.mousePath);
    this.drawPoint(moveGraph.mousePath[1], Debugger.PATH_COLOR);
  }

  drawMessages(): void {
    this.renderer.context.fillStyle = "white";
    this.renderer.context.font = "16px Arial";
    const { mousePosition } = this.renderer;

    let y = 0;
    const lines = [
      "Debug info:",
      `Current room: ${
        this.adventure.currentRoom
          ? this.adventure.currentRoom.id
          : "not defined"
      }`,
      `FPS: ${Math.round(this.currentFps)}`,
      `Mouse position: ${mousePosition.x};${mousePosition.y}`,
      `Walkable area: ${this.displayWalkableArea ? "ON" : "OFF"} (F4)`,
      `Manually added points: ${
        this.manuallyAddedPoints.length
      } (click to add, "d" to dump, "c" to clear)`,
      `Actors: ${this.displayActorsDetails ? "ON" : "OFF"} (F6)`,
      `Move graph: ${this.displayMoveGraph ? "ON" : "OFF"} (F7)`
    ];

    lines.forEach(line => {
      y += 20;
      this.renderer.context.fillText(line, 5, y, this.adventure.width);
    });
  }

  onClick(point: IPoint): void {
    this.manuallyAddedPoints.push(point);
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

  drawSegment([a, b]: [IPoint, IPoint]): void {
    this.renderer.context.beginPath();
    this.renderer.context.moveTo(a.x, a.y);
    this.renderer.context.lineTo(b.x, b.y);
    this.renderer.context.closePath();

    this.renderer.context.lineWidth = 1;
    this.renderer.context.strokeStyle = Debugger.PATH_COLOR;
    this.renderer.context.stroke();
  }
}
