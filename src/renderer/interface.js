// @flow

import type { IAdventure } from "../adventure/interface";
import type { IDebugger } from "../debugger/interface";
import type { IRenderable } from "../renderable/interface";
import type { IActor } from "../actor/interface";
import type { IPoint } from "../point/interface";

export interface IRenderer {
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

  clear(): void;
  start(): IntervalID;
  render(renderable: IRenderable): void;
  renderActor(actor: IActor): void;
  onKeyDown(event: KeyboardEvent): void;
  onMouseMove(event: MouseEvent): void;
  onClick(event: MouseEvent): void;
}
