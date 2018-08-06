// @flow

import type { IAdventure } from "../adventure/interface";
import type { IRenderer } from "../renderer/interface";
import type { IPoint } from "../point/interface";

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
  manuallyAddedPoints: IPoint[];

  toggle(): void;
  init(): void;
  clear(): void;
  update(): void;
  toggleWalkableArea(): void;
  draw(): void;
  debugArea(points: IPoint[]): void;
  drawMessages(): void;
  onMouseMove(event: MouseEvent): void;
  onClick(event: MouseEvent): void;
  drawPoint(point: IPoint): void;
  dumpManuallyAddedPoints(): void;
  clearManuallyAddedPoints(): void;
}
