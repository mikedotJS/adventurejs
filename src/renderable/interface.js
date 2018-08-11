// @flow

import type { IPoint } from "../point/interface";

export interface IRenderableOptions {
  x: number;
  y: number;

  width: number;
  height: number;

  imagePath: string;
}

export interface IRenderable extends IPoint {
  width: number;
  height: number;

  image: HTMLImageElement;
  imagePath: string;
  imageReady: boolean;

  init(): void;
}
