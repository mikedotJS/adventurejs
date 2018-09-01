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

  onMouseMoveListener: (event: MouseEvent) => void;
  onClickListener: (event: MouseEvent) => void;

  mouseX: number;
  mouseY: number;

  displayWalkableArea: boolean;
  displayActorsDetails: boolean;

  manuallyAddedPoints: IPoint[];

  toggle(): void;
  init(): void;
  clear(canvas: HTMLCanvasElement): void;
  update(): void;
  toggleWalkableArea(): void;
  toggleActorDetails(): void;
  render(): void;
  debugArea(points: IPoint[]): void;
  debugActors(actors: IActor[]): void;
  drawMessages(): void;
  onMouseMove(event: MouseEvent): void;
  onClick(event: MouseEvent): void;
  drawPoint(point: IPoint, color: string): void;
  dumpManuallyAddedPoints(): void;
  clearManuallyAddedPoints(): void;
}
