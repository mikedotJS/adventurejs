// @flow

import type { IRenderable, IRenderableOptions } from "./interface";
import { Point } from "../point";
import type { IAdventure } from "../adventure/interface";
import type { IRenderer } from "../renderer/interface";

export class Renderable extends Point implements IRenderable {
  adventure: IAdventure;
  renderer: IRenderer;

  width: number;
  height: number;

  image: HTMLImageElement;
  imagePath: string;
  imageReady: boolean;

  constructor(adventure: IAdventure, options: IRenderableOptions) {
    super(options.x, options.y);

    this.adventure = adventure;
    this.renderer = adventure.renderer;

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

  render(): void {
    if (this.imageReady) {
      this.renderer.context.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
}
