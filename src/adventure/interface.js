// @flow

import type { IRoom } from "../room/interface";

export interface IAdventure {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  rooms: Map<string, IRoom>;

  registerRoom(room: IRoom): void;
  init(): void;
}
