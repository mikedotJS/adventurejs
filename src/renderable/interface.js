// @flow

import type { IPoint } from "../point/interface";

export interface IRenderableOptions {
  x: number;
  y: number;

  imagePath: string;
}

export interface IRenderable extends IPoint {
  width: number;
  height: number;

  image: HTMLImageElement;
  imagePath: string;
  imageReady: boolean;

  init(): Promise<void>;
}
