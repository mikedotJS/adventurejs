// @flow

import type { IAdventure } from "../adventure/interface";
import type { IRenderer } from "../renderer/interface";
import type { IPoint } from "../point/interface";
import type { IActor } from "../actor/interface";

export interface IDebugger {
  adventure: IAdventure;
  renderer: IRenderer;

  lastRenderAt: number;
  currentFps: number;

  displayWalkableArea: boolean;
  displayActorsDetails: boolean;
  displayMoveGraph: boolean;

  manuallyAddedPoints: IPoint[];

  toggle(): void;
  init(): void;
  clear(canvas: HTMLCanvasElement): void;
  update(): void;
  toggleWalkableArea(): void;
  toggleActorDetails(): void;
  toggleMoveGraph(): void;
  render(): void;
  debugArea(points: IPoint[]): void;
  debugActors(actors: IActor[]): void;
  drawMessages(): void;
  onClick(point: IPoint): void;
  drawPoint(point: IPoint, color: string): void;
  dumpManuallyAddedPoints(): void;
  clearManuallyAddedPoints(): void;
}
