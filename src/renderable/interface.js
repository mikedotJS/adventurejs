// @flow

import type { IAdventure } from "../adventure/interface";
import type { IRenderer } from "../renderer/interface";
import type { IPoint } from "../point/interface";

export interface IRenderableOptions {
  x: number;
  y: number;

  width: number;
  height: number;

  imagePath: string;
}

export interface IRenderable extends IPoint {
  adventure: IAdventure;
  renderer: IRenderer;

  width: number;
  height: number;

  image: HTMLImageElement;
  imagePath: string;
  imageReady: boolean;

  init(): void;
  render(): void;
}
