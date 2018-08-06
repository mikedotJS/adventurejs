// @flow

import type { IAdventure } from "../adventure/interface";
import type { IDebugger } from "../debugger/interface";

export interface IRenderer {
  adventure: IAdventure;
  debugger: IDebugger;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  fps: number;
  mainLoopId: IntervalID;

  clear(): void;
  start(): IntervalID;
  listenKeyboard(): void;
}
