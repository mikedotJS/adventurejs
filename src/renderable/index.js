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

    this.imagePath = options.imagePath;
    this.imageReady = false;
  }

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.image = new Image();

      this.image.addEventListener("load", () => {
        this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight;

        this.imageReady = true;
        resolve();
      });

      this.image.addEventListener("error", reject);

      this.image.setAttribute("src", this.imagePath);
    });
  }
}
