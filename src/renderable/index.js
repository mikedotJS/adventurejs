// @flow

import type { IRenderable, IRenderableOptions } from "./interface";

import { Point } from "../point";

export class Renderable extends Point implements IRenderable {
  width: number;
  height: number;

  image: HTMLImageElement;
  imagePath: string;
  imageReady: boolean;

  constructor(options: IRenderableOptions) {
    super(options.x, options.y);

    this.width = options.width;
    this.height = options.height;

    this.imagePath = options.imagePath;
    this.imageReady = false;
  }

  init(): void {
    this.image = new Image();

    this.image.addEventListener("load", () => {
      this.imageReady = true;
    });

    this.image.setAttribute("src", this.imagePath);
  }
}
